import React, { useState, useEffect } from 'react';
import { SpartiElement } from '../../types';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  Upload, 
  Play, 
  Pause, 
  Eye, 
  EyeOff,
  ArrowLeft,
  ArrowRight,
  MoreCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SliderImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

interface SliderEditorProps {
  selectedElement: SpartiElement;
}

export const SliderEditor: React.FC<SliderEditorProps> = ({ selectedElement }) => {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [autoplay, setAutoplay] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(3000);
  const [showDots, setShowDots] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [transition, setTransition] = useState<'fade' | 'slide' | 'zoom'>('fade');
  const [height, setHeight] = useState('400px');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Initialize from element data
  useEffect(() => {
    const { data } = selectedElement;
    
    if (data.images) {
      setImages(Array.isArray(data.images) ? data.images : []);
    } else {
      // Extract images from existing HTML structure if available
      const imgElements = selectedElement.element?.querySelectorAll('img');
      if (imgElements && imgElements.length > 0) {
        const extractedImages: SliderImage[] = Array.from(imgElements).map(img => ({
          src: img.src || '',
          alt: img.alt || '',
          title: img.title || '',
          caption: img.getAttribute('data-caption') || ''
        }));
        setImages(extractedImages);
      }
    }
    
    setAutoplay(data.autoplay || false);
    setAutoplaySpeed(data.autoplaySpeed || 3000);
    setShowDots(data.showDots !== false); // default true
    setShowArrows(data.showArrows !== false); // default true
    setSlidesToShow(data.slidesToShow || 1);
    setTransition(data.transition || 'fade');
    setHeight(data.height || '400px');
  }, [selectedElement]);

  // Update element when settings change
  useEffect(() => {
    if (selectedElement.element) {
      const updatedData = {
        images,
        autoplay,
        autoplaySpeed,
        showDots,
        showArrows,
        slidesToShow,
        transition,
        height
      };

      // Update the element's data
      selectedElement.data = { ...selectedElement.data, ...updatedData };
      
      // Regenerate the slider HTML
      updateSliderHTML();
    }
  }, [images, autoplay, autoplaySpeed, showDots, showArrows, slidesToShow, transition, height]);

  const updateSliderHTML = () => {
    if (!selectedElement.element) return;

    const sliderHTML = `
      <div class="sparti-slider" 
           data-autoplay="${autoplay}" 
           data-autoplay-speed="${autoplaySpeed}"
           data-transition="${transition}"
           data-slides-to-show="${slidesToShow}"
           style="height: ${height}; position: relative; overflow: hidden;">
        
        <!-- Slider Container -->
        <div class="sparti-slider-container" style="display: flex; transition: transform 0.3s ease;">
          ${images.map((image, index) => `
            <div class="sparti-slide" style="min-width: ${100 / slidesToShow}%; position: relative;">
              <img src="${image.src}" 
                   alt="${image.alt}" 
                   title="${image.title}"
                   data-caption="${image.caption}"
                   style="width: 100%; height: 100%; object-fit: cover;" />
              ${image.caption ? `
                <div class="sparti-slide-caption" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7); color: white; padding: 1rem;">
                  ${image.caption}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <!-- Navigation Arrows -->
        ${showArrows ? `
          <button class="sparti-slider-prev" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer;">
            ‹
          </button>
          <button class="sparti-slider-next" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer;">
            ›
          </button>
        ` : ''}
        
        <!-- Navigation Dots -->
        ${showDots ? `
          <div class="sparti-slider-dots" style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem;">
            ${images.map((_, index) => `
              <button class="sparti-slider-dot" data-slide="${index}" style="width: 12px; height: 12px; border-radius: 50%; border: none; background: rgba(255,255,255,0.5); cursor: pointer;"></button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    selectedElement.element.innerHTML = sliderHTML;
  };

  const addImage = () => {
    setImages([...images, { src: '', alt: '', title: '', caption: '' }]);
  };

  const updateImage = (index: number, field: keyof SliderImage, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (activeImageIndex >= images.length - 1) {
      setActiveImageIndex(Math.max(0, images.length - 2));
    }
  };

  const handleImageUpload = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          updateImage(index, 'src', src);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="sparti-edit-section">
      <div className="sparti-edit-label">
        <Sliders size={16} />
        Image Slider Editor
      </div>

      {/* Images Management */}
      <div className="sparti-edit-group">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-sm font-semibold">Images ({images.length})</Label>
          <Button onClick={addImage} size="sm" variant="outline">
            <Plus size={14} className="mr-1" />
            Add Image
          </Button>
        </div>

        <div className="space-y-4 max-h-60 overflow-y-auto">
          {images.map((image, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Image {index + 1}</span>
                <div className="flex gap-1">
                  <Button 
                    onClick={() => handleImageUpload(index)} 
                    size="sm" 
                    variant="ghost"
                    title="Upload Image"
                  >
                    <Upload size={12} />
                  </Button>
                  <Button 
                    onClick={() => removeImage(index)} 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700"
                    title="Remove Image"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-gray-600">Image URL</Label>
                  <Input
                    value={image.src}
                    onChange={(e) => updateImage(index, 'src', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-gray-600">Alt Text</Label>
                    <Input
                      value={image.alt}
                      onChange={(e) => updateImage(index, 'alt', e.target.value)}
                      placeholder="Alt text"
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Title</Label>
                    <Input
                      value={image.title}
                      onChange={(e) => updateImage(index, 'title', e.target.value)}
                      placeholder="Title"
                      className="text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Caption</Label>
                  <Input
                    value={image.caption}
                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                    placeholder="Image caption"
                    className="text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Settings */}
      <div className="sparti-edit-group">
        <Label className="text-sm font-semibold mb-3 block">Slider Settings</Label>
        
        <div className="space-y-4">
          {/* Autoplay */}
          <div className="flex items-center justify-between">
            <Label className="text-xs">Autoplay</Label>
            <Switch checked={autoplay} onCheckedChange={setAutoplay} />
          </div>

          {autoplay && (
            <div>
              <Label className="text-xs text-gray-600">Autoplay Speed (ms)</Label>
              <Input
                type="number"
                value={autoplaySpeed}
                onChange={(e) => setAutoplaySpeed(Number(e.target.value))}
                min={1000}
                max={10000}
                step={500}
                className="text-xs"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Label className="text-xs">Show Navigation Dots</Label>
            <Switch checked={showDots} onCheckedChange={setShowDots} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs">Show Navigation Arrows</Label>
            <Switch checked={showArrows} onCheckedChange={setShowArrows} />
          </div>

          {/* Layout */}
          <div>
            <Label className="text-xs text-gray-600">Slides to Show</Label>
            <Input
              type="number"
              value={slidesToShow}
              onChange={(e) => setSlidesToShow(Number(e.target.value))}
              min={1}
              max={5}
              className="text-xs"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-600">Transition Effect</Label>
            <Select value={transition} onValueChange={(value: 'fade' | 'slide' | 'zoom') => setTransition(value)}>
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-gray-600">Height</Label>
            <Input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="400px or 50vh"
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="sparti-edit-group">
          <Label className="text-sm font-semibold mb-2 block">Preview</Label>
          <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '200px' }}>
            <img 
              src={images[activeImageIndex]?.src} 
              alt={images[activeImageIndex]?.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center mt-2 gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};