import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../src/components/ui/button';
import { Card } from '../../../src/components/ui/card';
import { Input } from '../../../src/components/ui/input';
import { Textarea } from '../../../src/components/ui/textarea';
import { ArrowLeft, Save, ChevronLeft, ChevronRight, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../../src/hooks/use-toast';
import { PagesService, type Page } from '../../services/PagesService';
import { MediaService } from '../../services/MediaService';
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
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImageSection, setSelectedImageSection] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPageData();
      loadMediaFiles();
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

  const loadMediaFiles = async () => {
    try {
      const { data, error } = await MediaService.getAllMedia();
      if (error) {
        console.error('Error loading media files:', error);
      } else if (data) {
        setMediaFiles(data);
      }
    } catch (error) {
      console.error('Error loading media files:', error);
    }
  };

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
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
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

  const renderImagePicker = (currentImage: string, onImageSelect: (imageUrl: string) => void) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {mediaFiles.map((file) => (
            <div
              key={file.id}
              className={`relative cursor-pointer border-2 rounded-lg overflow-hidden ${
                currentImage === file.file_path ? 'border-primary' : 'border-muted'
              }`}
              onClick={() => onImageSelect(file.file_path)}
            >
              <img
                src={file.file_path}
                alt={file.alt_text || file.filename}
                className="w-full h-16 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                {file.filename}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Or enter image URL"
            value={currentImage}
            onChange={(e) => onImageSelect(e.target.value)}
          />
          <Button size="sm" variant="outline">
            <Upload className="w-4 h-4 mr-1" />
            Upload New
          </Button>
        </div>
      </div>
    );
  };

  const renderCardsEditor = (section: PageSection, cards: any[]) => {
    const addCard = () => {
      const newCards = [...cards, { 
        title: '', 
        description: '', 
        image: '',
        link: ''
      }];
      const newContent = { ...section.content, cards: newCards };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const updateCard = (index: number, field: string, value: string) => {
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], [field]: value };
      const newContent = { ...section.content, cards: newCards };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const removeCard = (index: number) => {
      const newCards = cards.filter((_, i) => i !== index);
      const newContent = { ...section.content, cards: newCards };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Cards ({cards.length})</h4>
          <Button size="sm" onClick={addCard}>
            <Plus className="w-4 h-4 mr-1" />
            Add Card
          </Button>
        </div>
        
        {cards.map((card, index) => (
          <Card key={index} className="p-4 border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start mb-3">
              <h5 className="font-medium text-sm">Card {index + 1}</h5>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeCard(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={card.title || ''}
                    onChange={(e) => updateCard(index, 'title', e.target.value)}
                    placeholder="Card title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={card.description || ''}
                    onChange={(e) => updateCard(index, 'description', e.target.value)}
                    placeholder="Card description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Link (optional)</label>
                  <Input
                    value={card.link || ''}
                    onChange={(e) => updateCard(index, 'link', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                {card.image && (
                  <div className="mb-2">
                    <img
                      src={card.image}
                      alt="Card preview"
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedImageSection(`${section.id}-card-${index}`)}
                  className="w-full"
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  {card.image ? 'Change Image' : 'Select Image'}
                </Button>
                
                {selectedImageSection === `${section.id}-card-${index}` && (
                  <div className="mt-2 p-3 border rounded">
                    {renderImagePicker(card.image || '', (imageUrl) => {
                      updateCard(index, 'image', imageUrl);
                      setSelectedImageSection(null);
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
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
        backgroundImage: mediaFiles.length > 0 ? mediaFiles[0].file_path : '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png'
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

    const duplicateSlide = () => {
      const newSlides = [...slides];
      newSlides.splice(currentSlide + 1, 0, { ...slide });
      const newContent = { ...section.content, slides: newSlides };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
      setCurrentSlide(currentSlide + 1);
    };

    return (
      <div className="space-y-6">
        {/* Enhanced Slide Navigation */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <div className="font-semibold">Slide {currentSlide + 1} of {slides.length}</div>
                <div className="text-sm text-muted-foreground">
                  {slide.title || 'Untitled Slide'}
                </div>
              </div>
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
              <Button size="sm" variant="secondary" onClick={duplicateSlide}>
                Duplicate
              </Button>
              <Button size="sm" variant="outline" onClick={addSlide}>
                <Plus className="w-4 h-4 mr-1" />
                Add Slide
              </Button>
              {slides.length > 1 && (
                <Button size="sm" variant="destructive" onClick={() => removeSlide(currentSlide)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Slide Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slides.map((s, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-16 h-12 rounded border-2 cursor-pointer overflow-hidden ${
                  index === currentSlide ? 'border-primary' : 'border-muted'
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                {s.backgroundImage ? (
                  <img 
                    src={s.backgroundImage} 
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Background Image Section */}
        <Card className="p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Background Image
          </h4>
          
          {slide.backgroundImage && (
            <div className="mb-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <img 
                  src={slide.backgroundImage} 
                  alt="Slide background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setSelectedImageSection(`${section.id}-slide-${currentSlide}`)}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {!slide.backgroundImage && (
            <div className="mb-4">
              <div className="w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedImageSection(`${section.id}-slide-${currentSlide}`)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Background Image
                </Button>
              </div>
            </div>
          )}
          
          {selectedImageSection === `${section.id}-slide-${currentSlide}` && (
            <div className="mt-4 p-4 border rounded">
              <h5 className="font-medium mb-3">Choose Background Image</h5>
              {renderImagePicker(slide.backgroundImage || '', (imageUrl) => {
                updateSlide('backgroundImage', imageUrl);
                setSelectedImageSection(null);
              })}
            </div>
          )}
        </Card>

        {/* Content Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Content</h4>
            <div className="space-y-4">
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
                  rows={4}
                />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-3">Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <Input
                  value={slide.buttonText || ''}
                  onChange={(e) => updateSlide('buttonText', e.target.value)}
                  placeholder="e.g., Get Started"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Button Link</label>
                <Input
                  value={slide.buttonLink || ''}
                  onChange={(e) => updateSlide('buttonLink', e.target.value)}
                  placeholder="e.g., #contact"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Display Duration (seconds)</label>
                <Input
                  type="number"
                  value={slide.duration || '5'}
                  onChange={(e) => updateSlide('duration', e.target.value)}
                  placeholder="5"
                  min="1"
                  max="30"
                />
              </div>
            </div>
          </Card>
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
    
    // Check if this section has cards
    const hasCards = content.cards && Array.isArray(content.cards) && content.cards.length > 0;
    
    return (
      <Card key={section.id} className="p-6 mb-6 shadow-sm">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">{section.section_type || 'Section'}</h3>
              <p className="text-sm text-muted-foreground">
                {section.section_id} • ID: {section.id}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSaveSection(section.id, content)}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-1" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
          
          {/* Hero Section with Slides */}
          {isHeroSection && hasSlides ? (
            <div>
              <h4 className="text-md font-medium mb-4 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Hero Slideshow Editor
              </h4>
              {renderSlideEditor(section, content.slides, currentSlide)}
            </div>
          ) : hasCards ? (
            <div>
              <h4 className="text-md font-medium mb-4 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Cards Editor
              </h4>
              {renderCardsEditor(section, content.cards)}
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-md font-medium mb-4 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Content Editor
              </h4>
              
              {/* Generic content fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.title !== undefined && (
                  <Card className="p-4">
                    <label className="block text-sm font-medium mb-2">Title</label>
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
                  </Card>
                )}
                
                {content.subtitle !== undefined && (
                  <Card className="p-4">
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
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
                  </Card>
                )}
              </div>
              
              {content.description !== undefined && (
                <Card className="p-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
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
                    rows={4}
                  />
                </Card>
              )}
              
              {/* Image field */}
              {content.image !== undefined && (
                <Card className="p-4">
                  <label className="block text-sm font-medium mb-2">Image</label>
                  {content.image && (
                    <div className="mb-3">
                      <img
                        src={content.image}
                        alt="Section image"
                        className="w-full h-48 object-cover rounded border"
                      />
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedImageSection(section.id)}
                    className="w-full"
                  >
                    <ImageIcon className="w-4 h-4 mr-1" />
                    {content.image ? 'Change Image' : 'Select Image'}
                  </Button>
                  
                  {selectedImageSection === section.id && (
                    <div className="mt-3 p-3 border rounded">
                      {renderImagePicker(content.image || '', (imageUrl) => {
                        const newContent = { ...content, image: imageUrl };
                        setSections(prev => 
                          prev.map(s => 
                            s.id === section.id ? { ...s, content: newContent } : s
                          )
                        );
                        setSelectedImageSection(null);
                      })}
                    </div>
                  )}
                </Card>
              )}
              
              {/* Initialize cards if content suggests it should have them */}
              {!hasCards && (content.title || content.description) && (
                <Card className="p-4 border-dashed">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      This section could have cards. Would you like to add some?
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newContent = { 
                          ...content, 
                          cards: [{ title: '', description: '', image: '', link: '' }] 
                        };
                        setSections(prev => 
                          prev.map(s => 
                            s.id === section.id ? { ...s, content: newContent } : s
                          )
                        );
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Cards
                    </Button>
                  </div>
                </Card>
              )}
              
              {/* Raw JSON editor for advanced users */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                  Advanced: Raw JSON Editor
                </summary>
                <div className="mt-3">
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
                    placeholder="Raw JSON content..."
                  />
                </div>
              </details>
            </div>
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