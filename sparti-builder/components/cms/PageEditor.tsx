import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../src/components/ui/button';
import { Card } from '../../../src/components/ui/card';
import { Input } from '../../../src/components/ui/input';
import { Textarea } from '../../../src/components/ui/textarea';
import { ArrowLeft, Save, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { useToast } from '../../../src/hooks/use-toast';
import { PagesService, type Page } from '../../services/PagesService';
import { supabase } from '../../../src/integrations/supabase/client';

interface PageSection {
  id: string;
  section_id: string;
  section_type: string;
  content: any;
  order_index: number;
}

interface GroupedSections {
  [sectionType: string]: PageSection[];
}

export const PageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [groupedSections, setGroupedSections] = useState<GroupedSections>({});
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadPageData();
    }
  }, [id]);

  useEffect(() => {
    // Group sections by section_type
    const grouped = sections.reduce((acc, section) => {
      const sectionType = section.section_type || 'Other';
      if (!acc[sectionType]) {
        acc[sectionType] = [];
      }
      acc[sectionType].push(section);
      return acc;
    }, {} as GroupedSections);
    
    setGroupedSections(grouped);

    // Initialize slides for hero sections that don't have them yet
    sections.forEach(section => {
      const isHeroSection = section.section_id === 'hero' || section.section_type?.toLowerCase().includes('hero');
      const content = section.content || {};
      const hasSlides = content.slides && Array.isArray(content.slides) && content.slides.length > 0;
      
      if (isHeroSection && !hasSlides) {
        const defaultSlides = [
          {
            title: "Where Dreams",
            subtitle: "Take Flight",
            description: "Singapore's premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.",
            backgroundImage: "/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png"
          }
        ];
        const newContent = { ...content, slides: defaultSlides };
        setSections(prev => 
          prev.map(s => 
            s.id === section.id ? { ...s, content: newContent } : s
          )
        );
      }
    });
  }, [sections]);

  const loadPageData = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      // Load page data
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();

      if (pageError) {
        toast({
          title: "Error",
          description: `Failed to load page: ${pageError.message}`,
          variant: "destructive",
        });
        return;
      }

      setPage(pageData);

      // Load page sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', id)
        .order('order_index', { ascending: true });

      if (sectionsError) {
        toast({
          title: "Error",
          description: `Failed to load sections: ${sectionsError.message}`,
          variant: "destructive",
        });
        return;
      }

      setSections(sectionsData || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load page data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, content: any) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('page_sections')
        .update({ content })
        .eq('id', sectionId);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to save section: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Section saved successfully",
        });
        // Update local state
        setSections(prev => 
          prev.map(section => 
            section.id === sectionId ? { ...section, content } : section
          )
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save section",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderSlideEditor = (section: PageSection, slides: any[], currentSlide: number) => {
    const setCurrentSlide = (index: number) => {
      setCurrentSlides(prev => ({
        ...prev,
        [section.id]: index
      }));
    };
    const slide = slides[currentSlide] || {};
    
    const updateSlide = (field: string, value: string) => {
      const newSlides = [...slides];
      newSlides[currentSlide] = { ...slide, [field]: value };
      const newContent = { ...section.content, slides: newSlides };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const addSlide = () => {
      const newSlides = [...slides, { 
        title: '', 
        subtitle: '', 
        description: '', 
        backgroundImage: '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png' 
      }];
      const newContent = { ...section.content, slides: newSlides };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
      setCurrentSlide(newSlides.length - 1);
    };

    const removeSlide = (index: number) => {
      if (slides.length <= 1) return;
      const newSlides = slides.filter((_, i) => i !== index);
      const newContent = { ...section.content, slides: newSlides };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
      setCurrentSlide(Math.max(0, currentSlide - 1));
    };

    return (
      <div className="space-y-4">
        {/* Slide Navigation */}
        <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={addSlide}>
              Add Slide
            </Button>
            {slides.length > 1 && (
              <Button size="sm" variant="destructive" onClick={() => removeSlide(currentSlide)}>
                Remove
              </Button>
            )}
          </div>
        </div>

        {/* Background Image Preview */}
        {slide.backgroundImage && (
          <div className="relative">
            <label className="block text-sm font-medium mb-2">Background Image</label>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25">
              <img 
                src={slide.backgroundImage} 
                alt="Slide background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button variant="secondary" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Image
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Slide Content Fields */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={slide.title || ''}
            onChange={(e) => updateSlide('title', e.target.value)}
            placeholder="Enter slide title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subtitle</label>
          <Input
            value={slide.subtitle || ''}
            onChange={(e) => updateSlide('subtitle', e.target.value)}
            placeholder="Enter slide subtitle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={slide.description || ''}
            onChange={(e) => updateSlide('description', e.target.value)}
            placeholder="Enter slide description"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Background Image URL</label>
          <Input
            value={slide.backgroundImage || ''}
            onChange={(e) => updateSlide('backgroundImage', e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
      </div>
    );
  };

  const renderSectionEditor = (section: PageSection) => {
    const content = section.content || {};
    const currentSlide = currentSlides[section.id] || 0;
    
    // Check if this is a hero section with slides
    const isHeroSection = section.section_id === 'hero' || section.section_type?.toLowerCase().includes('hero');
    const hasSlides = content.slides && Array.isArray(content.slides) && content.slides.length > 0;
    
    return (
      <Card key={section.id} className="p-4 mb-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-muted-foreground">
              {section.section_id} (ID: {section.id})
            </h4>
            <Button
              size="sm"
              onClick={() => handleSaveSection(section.id, content)}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
          
          {/* Hero Section with Slides */}
          {isHeroSection && hasSlides ? (
            renderSlideEditor(section, content.slides, currentSlide)
          ) : (
            <>
              {/* Generic content editor for other sections */}
              {content.title !== undefined && (
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={content.title || ''}
                    onChange={(e) => {
                      const newContent = { ...content, title: e.target.value };
                      setSections(prev => 
                        prev.map(s => 
                          s.id === section.id ? { ...s, content: newContent } : s
                        )
                      );
                    }}
                    placeholder="Enter title"
                  />
                </div>
              )}
              
              {content.subtitle !== undefined && (
                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <Input
                    value={content.subtitle || ''}
                    onChange={(e) => {
                      const newContent = { ...content, subtitle: e.target.value };
                      setSections(prev => 
                        prev.map(s => 
                          s.id === section.id ? { ...s, content: newContent } : s
                        )
                      );
                    }}
                    placeholder="Enter subtitle"
                  />
                </div>
              )}
              
              {content.description !== undefined && (
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={content.description || ''}
                    onChange={(e) => {
                      const newContent = { ...content, description: e.target.value };
                      setSections(prev => 
                        prev.map(s => 
                          s.id === section.id ? { ...s, content: newContent } : s
                        )
                      );
                    }}
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>
              )}
              
              {/* Raw JSON editor for complex content */}
              <div>
                <label className="block text-sm font-medium mb-1">Raw Content (JSON)</label>
                <Textarea
                  value={JSON.stringify(content, null, 2)}
                  onChange={(e) => {
                    try {
                      const newContent = JSON.parse(e.target.value);
                      setSections(prev => 
                        prev.map(s => 
                          s.id === section.id ? { ...s, content: newContent } : s
                        )
                      );
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading page...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Page not found</p>
          <Button onClick={() => navigate('/admin/dashboard')} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Page: {page.title}</h1>
              <p className="text-muted-foreground">/{page.slug}</p>
            </div>
          </div>
        </div>

        {sections.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No sections found for this page</p>
            <p className="text-sm text-muted-foreground mt-2">
              Sections will appear here once content is added to the page
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSections).map(([sectionType, sectionList]) => (
              <div key={sectionType} className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">
                  {sectionType} ({sectionList.length} section{sectionList.length !== 1 ? 's' : ''})
                </h2>
                {sectionList.map(renderSectionEditor)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditor;