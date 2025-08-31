-- Create posts table for blog posts
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  featured_image TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create site_settings table for branding, colors, and typography
CREATE TABLE public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  category TEXT NOT NULL, -- 'branding', 'colors', 'typography', 'general'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for posts
CREATE POLICY "Anyone can read published posts"
ON public.posts
FOR SELECT
USING (is_published = true);

CREATE POLICY "Authenticated users can manage all posts"
ON public.posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Enable RLS on site_settings table
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for site_settings
CREATE POLICY "Anyone can read site settings"
ON public.site_settings
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings with current color scheme
INSERT INTO public.site_settings (key, value, category, description) VALUES
-- Branding settings
('site_name', '"Sparta Academy"', 'branding', 'Site name displayed in header and meta tags'),
('site_tagline', '"Elite Training Excellence"', 'branding', 'Site tagline or slogan'),
('site_description', '"Professional martial arts and fitness training academy"', 'branding', 'Site description for SEO'),

-- Color settings (extracted from index.css)
('primary_color', '"38 92% 50%"', 'colors', 'Primary brand color (HSL)'),
('secondary_color', '"45 93% 47%"', 'colors', 'Secondary brand color (HSL)'),
('accent_color', '"42 87% 55%"', 'colors', 'Accent color (HSL)'),
('background_color', '"0 0% 100%"', 'colors', 'Background color (HSL)'),
('foreground_color', '"0 0% 8%"', 'colors', 'Text color (HSL)'),

-- Typography settings
('heading_font', '"Inter"', 'typography', 'Font family for headings'),
('body_font', '"Inter"', 'typography', 'Font family for body text'),
('font_size_base', '"16"', 'typography', 'Base font size in pixels'),

-- General settings
('logo_url', '""', 'general', 'URL to site logo'),
('favicon_url', '"/favicon.ico"', 'general', 'URL to site favicon'),
('contact_email', '""', 'general', 'Contact email address'),
('social_links', '{"facebook": "", "instagram": "", "twitter": ""}', 'general', 'Social media links');

-- Create index on posts slug for better performance
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_published ON public.posts(is_published);
CREATE INDEX idx_site_settings_category ON public.site_settings(category);
CREATE INDEX idx_site_settings_key ON public.site_settings(key);