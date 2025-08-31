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
  const [currentTabs, setCurrentTabs] = useState<Record<string, number>>({});
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

    // Don't initialize slides if they already exist - preserve existing data
    console.log('Sections loaded:', sections.map(s => ({ 
      id: s.id, 
      section_id: s.section_id, 
      hasSlides: s.content?.slides?.length || 0,
      content: s.content 
    })));
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

  const fixSlideContent = async (sectionId: string) => {
    const correctSlides = [
      {
        title: "Where Dreams",
        subtitle: "Take Flight", 
        description: "Singapore's premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.",
        backgroundImage: "/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png",
        buttonText: "Start Your Journey",
        buttonLink: "#trials",
        duration: "5"
      },
      {
        title: "Artistic Excellence",
        subtitle: "Dance With Passion",
        description: "Experience world-class ballet and dance training with our professional instructors in our state-of-the-art studios.",
        backgroundImage: "/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png", 
        buttonText: "Learn More",
        buttonLink: "#programmes",
        duration: "5"
      },
      {
        title: "Grace & Strength",
        subtitle: "Build Confidence",
        description: "Develop poise, discipline and self-expression through the beautiful art of dance and ballet.",
        backgroundImage: "/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png",
        buttonText: "Join Us",
        buttonLink: "#contact", 
        duration: "5"
      },
      {
        title: "Performance Ready",
        subtitle: "Shine on Stage",
        description: "Prepare for recitals and competitions with our advanced performance training programs.",
        backgroundImage: "/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png",
        buttonText: "Get Started",
        buttonLink: "#events",
        duration: "5"
      },
      {
        title: "Dance Family", 
        subtitle: "Learn Together, Grow Together",
        description: "Join our supportive dance community where students inspire each other to reach new heights.",
        backgroundImage: "/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png",
        buttonText: "Join Community",
        buttonLink: "#about",
        duration: "5"
      }
    ];

    try {
      const { error } = await supabase
        .from('page_sections')
        .update({ 
          content: { slides: correctSlides },
          updated_at: new Date().toISOString()
        })
        .eq('id', sectionId);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to fix slides: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Slides Fixed!",
          description: "Replaced wrong boxing content with correct dance academy slides",
        });
        
        // Update local state
        setSections(prev => 
          prev.map(section => 
            section.id === sectionId ? { ...section, content: { slides: correctSlides } } : section
          )
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fix slides",
        variant: "destructive",
      });
    }
  };

  const handleSaveSection = async (sectionId: string, content: any) => {
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

  const renderTabsEditor = (section: PageSection, tabs: any[], currentTab: number) => {
    const setCurrentTab = (index: number) => {
      setCurrentTabs(prev => ({
        ...prev,
        [section.id]: index
      }));
    };
    
    const addTab = () => {
      const newTabs = [...tabs, { 
        id: `tab-${Date.now()}`,
        label: 'New Tab', 
        title: '', 
        description: '',
        items: []
      }];
      const newContent = { ...section.content, tabs: newTabs };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
      setCurrentTab(newTabs.length - 1);
    };

    const updateTab = (index: number, field: string, value: any) => {
      const newTabs = [...tabs];
      newTabs[index] = { ...newTabs[index], [field]: value };
      const newContent = { ...section.content, tabs: newTabs };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const removeTab = (index: number) => {
      if (tabs.length <= 1) return;
      const newTabs = tabs.filter((_, i) => i !== index);
      const newContent = { ...section.content, tabs: newTabs };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
      setCurrentTab(Math.max(0, currentTab - 1));
    };

    const addTabItem = (tabIndex: number) => {
      const newTabs = [...tabs];
      if (!newTabs[tabIndex].items) newTabs[tabIndex].items = [];
      newTabs[tabIndex].items.push({
        id: `item-${Date.now()}`,
        title: '',
        description: '',
        image: '',
        date: ''
      });
      const newContent = { ...section.content, tabs: newTabs };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const updateTabItem = (tabIndex: number, itemIndex: number, field: string, value: string) => {
      const newTabs = [...tabs];
      newTabs[tabIndex].items[itemIndex] = { ...newTabs[tabIndex].items[itemIndex], [field]: value };
      const newContent = { ...section.content, tabs: newTabs };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const removeTabItem = (tabIndex: number, itemIndex: number) => {
      const newTabs = [...tabs];
      newTabs[tabIndex].items = newTabs[tabIndex].items.filter((_, i) => i !== itemIndex);
      const newContent = { ...section.content, tabs: newTabs };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const tab = tabs[currentTab] || {};

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTab(Math.max(0, currentTab - 1))}
                disabled={currentTab === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <div className="font-semibold">Tab {currentTab + 1} of {tabs.length}</div>
                <div className="text-sm text-muted-foreground">
                  {tab.label || 'Untitled Tab'}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTab(Math.min(tabs.length - 1, currentTab + 1))}
                disabled={currentTab === tabs.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={addTab}>
                <Plus className="w-4 h-4 mr-1" />
                Add Tab
              </Button>
              {tabs.length > 1 && (
                <Button size="sm" variant="destructive" onClick={() => removeTab(currentTab)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Tab Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((t, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer whitespace-nowrap ${
                  index === currentTab 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => setCurrentTab(index)}
              >
                {t.label || `Tab ${index + 1}`}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Tab Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Tab Label</label>
                <Input
                  value={tab.label || ''}
                  onChange={(e) => updateTab(currentTab, 'label', e.target.value)}
                  placeholder="e.g., Past Events"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tab Title</label>
                <Input
                  value={tab.title || ''}
                  onChange={(e) => updateTab(currentTab, 'title', e.target.value)}
                  placeholder="Tab title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tab Description</label>
                <Textarea
                  value={tab.description || ''}
                  onChange={(e) => updateTab(currentTab, 'description', e.target.value)}
                  placeholder="Tab description"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Tab Items ({tab.items?.length || 0})</h4>
              <Button size="sm" onClick={() => addTabItem(currentTab)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {(tab.items || []).map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Item {itemIndex + 1}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeTabItem(currentTab, itemIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={item.title || ''}
                      onChange={(e) => updateTabItem(currentTab, itemIndex, 'title', e.target.value)}
                      placeholder="Item title"
                      className="text-sm"
                    />
                    <Input
                      value={item.description || ''}
                      onChange={(e) => updateTabItem(currentTab, itemIndex, 'description', e.target.value)}
                      placeholder="Item description"
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderGalleryEditor = (section: PageSection, images: any[]) => {
    const addGalleryImage = () => {
      const newImages = [...images, { 
        id: `img-${Date.now()}`,
        image: '', 
        title: '', 
        description: '',
        category: ''
      }];
      const newContent = { ...section.content, images: newImages };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const updateGalleryImage = (index: number, field: string, value: string) => {
      const newImages = [...images];
      newImages[index] = { ...newImages[index], [field]: value };
      const newContent = { ...section.content, images: newImages };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    const removeGalleryImage = (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      const newContent = { ...section.content, images: newImages };
      setSections(prev => 
        prev.map(s => 
          s.id === section.id ? { ...s, content: newContent } : s
        )
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Gallery Images ({images.length})</h4>
          <Button size="sm" onClick={addGalleryImage}>
            <Plus className="w-4 h-4 mr-1" />
            Add Image
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {images.map((img, index) => (
            <Card key={index} className="overflow-hidden">
              {img.image && (
                <div className="aspect-square bg-muted">
                  <img
                    src={img.image}
                    alt={img.title || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium">#{index + 1}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                
                <Input
                  value={img.title || ''}
                  onChange={(e) => updateGalleryImage(index, 'title', e.target.value)}
                  placeholder="Image title"
                  className="text-xs"
                />
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedImageSection(`${section.id}-gallery-${index}`)}
                  className="w-full text-xs"
                >
                  <ImageIcon className="w-3 h-3 mr-1" />
                  {img.image ? 'Change Image' : 'Select Image'}
                </Button>
                
                {selectedImageSection === `${section.id}-gallery-${index}` && (
                  <div className="mt-2 p-2 border rounded">
                    {renderImagePicker(img.image || '', (imageUrl) => {
                      updateGalleryImage(index, 'image', imageUrl);
                      setSelectedImageSection(null);
                    })}
                  </div>
                )}
              </div>
            </Card>
          ))}
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
    
    // Check if this section has different content types
    const hasCards = content.cards && Array.isArray(content.cards) && content.cards.length > 0;
    const hasTabs = content.tabs && Array.isArray(content.tabs) && content.tabs.length > 0;
    const hasImages = content.images && Array.isArray(content.images) && content.images.length > 0;
    const currentTab = currentTabs[section.id] || 0;
    
    // Determine section type for smart defaults
    const isTabSection = section.section_type?.toLowerCase().includes('competition') || 
                         section.section_type?.toLowerCase().includes('events') || 
                         section.section_type?.toLowerCase().includes('programmes');
    const isGallerySection = section.section_id === 'gallery' || section.section_type?.toLowerCase().includes('gallery');
    const isAchievementsSection = section.section_id === 'achievements' || section.section_type?.toLowerCase().includes('achievements');
    
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
          ) : isHeroSection && !hasSlides ? (
            <div className="space-y-4">
              <h4 className="text-md font-medium mb-4 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Hero Content (Convert to Slideshow)
              </h4>
              
              <Card className="p-4 border-2 border-dashed border-red-200 bg-red-50/50">
                <div className="text-center">
                  <p className="text-sm text-red-600 mb-3">
                    ⚠️ Wrong Content Detected: This hero section has "Spartan Boxing Academy" content, but this should be a dance academy site.
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <Button
                      size="sm"
                      onClick={() => fixSlideContent(section.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      🗑️ Fix Slides (Replace with Dance Content)
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        const slides = [
                          {
                            title: content.title || "Where Dreams",
                            subtitle: content.subtitle || "Take Flight",
                            description: content.description || "Singapore's premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.",
                            backgroundImage: "/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png",
                            buttonText: "Start Your Journey",
                            buttonLink: "#trials",
                            duration: "5"
                          }
                        ];
                        
                        const newContent = { ...content, slides };
                        setSections(prev => 
                          prev.map(s => 
                            s.id === section.id ? { ...s, content: newContent } : s
                          )
                        );
                        
                        toast({
                          title: "Converted to Single Slide",
                          description: "Created 1 slide from current content. Save to persist changes.",
                        });
                      }}
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Keep Current & Convert to Slide
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Show current basic content */}
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
            </div>
          ) : hasTabs ? (
            <div>
              <h4 className="text-md font-medium mb-4 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Tabs Editor
              </h4>
              {renderTabsEditor(section, content.tabs, currentTab)}
            </div>
          ) : hasImages && isGallerySection ? (
            <div>
              <h4 className="text-md font-medium mb-4 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1" />
                Gallery Editor
              </h4>
              {renderGalleryEditor(section, content.images)}
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
              
              {/* Initialize tabs for sections that should have them */}
              {!hasTabs && isTabSection && (
                <Card className="p-4 border-dashed border-blue-200 bg-blue-50/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      This section should have tabs. Initialize with default tabs?
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const defaultTabs = section.section_type?.toLowerCase().includes('competition') ? [
                          { id: 'solo', label: 'Solo Competitions', title: 'Solo Competitions', description: '', items: [] },
                          { id: 'groups', label: 'Group Competitions', title: 'Group Competitions', description: '', items: [] }
                        ] : section.section_type?.toLowerCase().includes('events') ? [
                          { id: 'past', label: 'Past Events', title: 'Past Events', description: '', items: [] },
                          { id: 'upcoming', label: 'Upcoming Events', title: 'Upcoming Events', description: '', items: [] }
                        ] : [
                          { id: 'programmes', label: 'Programmes', title: 'Programmes', description: '', items: [] },
                          { id: 'exams', label: 'Exams', title: 'Exams', description: '', items: [] }
                        ];
                        
                        const newContent = { ...content, tabs: defaultTabs };
                        setSections(prev => 
                          prev.map(s => 
                            s.id === section.id ? { ...s, content: newContent } : s
                          )
                        );
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Initialize Tabs
                    </Button>
                  </div>
                </Card>
              )}
              
              {/* Initialize gallery for gallery sections */}
              {!hasImages && isGallerySection && (
                <Card className="p-4 border-dashed border-green-200 bg-green-50/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      This is a gallery section. Initialize with image gallery?
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newContent = { 
                          ...content, 
                          images: [
                            { id: 'img-1', image: '', title: 'Gallery Image 1', description: '', category: 'performance' }
                          ] 
                        };
                        setSections(prev => 
                          prev.map(s => 
                            s.id === section.id ? { ...s, content: newContent } : s
                          )
                        );
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Initialize Gallery
                    </Button>
                  </div>
                </Card>
              )}
              
              {/* Initialize achievements carousel */}
              {!hasCards && isAchievementsSection && (
                <Card className="p-4 border-dashed border-yellow-200 bg-yellow-50/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      This is an achievements section. Initialize with achievement cards?
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newContent = { 
                          ...content, 
                          cards: [
                            { title: 'Competition Winner', description: 'First place in regional dance competition', image: '', link: '', date: '2024' }
                          ] 
                        };
                        setSections(prev => 
                          prev.map(s => 
                            s.id === section.id ? { ...s, content: newContent } : s
                          )
                        );
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Initialize Achievements
                    </Button>
                  </div>
                </Card>
              )}
              
              {/* Initialize cards if content suggests it should have them */}
              {!hasCards && !hasTabs && !hasImages && !isAchievementsSection && (content.title || content.description) && (
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