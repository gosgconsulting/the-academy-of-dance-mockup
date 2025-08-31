-- Create pages table for storing page metadata
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create page_sections table for storing section content as JSON
CREATE TABLE public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  section_id TEXT NOT NULL, -- e.g., 'hero', 'about', 'trials'
  section_type TEXT NOT NULL, -- e.g., 'HeroSection', 'AboutUsSection'
  content JSONB NOT NULL DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(page_id, section_id)
);

-- Create media_library table for uploaded files
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  alt_text TEXT,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create content_history table for version control
CREATE TABLE public.content_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.page_sections(id) ON DELETE CASCADE NOT NULL,
  content JSONB NOT NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('create', 'update', 'delete')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_history ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (can be restricted later)
CREATE POLICY "Allow all operations on pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on page_sections" ON public.page_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on media_library" ON public.media_library FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on content_history" ON public.content_history FOR ALL USING (true) WITH CHECK (true);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create storage policies for media bucket
CREATE POLICY "Allow public access to media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Allow media uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Allow media updates" ON storage.objects FOR UPDATE USING (bucket_id = 'media');
CREATE POLICY "Allow media deletion" ON storage.objects FOR DELETE USING (bucket_id = 'media');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON public.page_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default homepage
INSERT INTO public.pages (title, slug, description, status) 
VALUES ('Homepage', 'index', 'Main homepage content', 'published');

-- Insert default sections for homepage
WITH homepage AS (SELECT id FROM public.pages WHERE slug = 'index')
INSERT INTO public.page_sections (page_id, section_id, section_type, content, order_index) 
SELECT 
  homepage.id,
  section_data.section_id,
  section_data.section_type,
  section_data.content::jsonb,
  section_data.order_index
FROM homepage,
(VALUES 
  ('hero', 'HeroSection', '{"title": "Spartan Boxing Academy", "subtitle": "Train Hard, Fight Smart, Win Bold", "description": "Join the most prestigious boxing academy and unlock your potential with world-class training and expert guidance."}', 1),
  ('trials', 'TrialsSection', '{"title": "Free Trial Sessions", "description": "Experience our training methods with a complimentary session"}', 2),
  ('about', 'AboutUsSection', '{"title": "About Us", "description": "Discover our story and commitment to excellence in boxing training"}', 3),
  ('vision-mission', 'VisionMissionSection', '{"vision": "To be the leading boxing academy", "mission": "Empowering athletes through discipline and training"}', 4),
  ('programmes', 'ProgrammesAndExamsSection', '{"title": "Our Programmes", "description": "Comprehensive training programs for all skill levels"}', 5),
  ('competition', 'CompetitionExcellenceSection', '{"title": "Competition Excellence", "description": "Preparing champions for competitive boxing"}', 6),
  ('events', 'EventsSection', '{"title": "Upcoming Events", "description": "Join our exciting boxing events and competitions"}', 7),
  ('achievements', 'AchievementsSection', '{"title": "Our Achievements", "description": "Celebrating our champions and their victories"}', 8),
  ('teachers', 'TeachersSection', '{"title": "Our Coaches", "description": "Meet our experienced and dedicated coaching team"}', 9),
  ('reviews', 'ReviewsSection', '{"title": "What Our Students Say", "description": "Testimonials from our boxing community"}', 10),
  ('locations', 'LocationsSection', '{"title": "Our Locations", "description": "Find a Spartan Boxing Academy near you"}', 11),
  ('gallery', 'GallerySection', '{"title": "Gallery", "description": "See our facilities and training in action"}', 12)
) AS section_data(section_id, section_type, content, order_index);