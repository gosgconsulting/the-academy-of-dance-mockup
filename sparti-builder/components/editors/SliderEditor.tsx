import React, { useState, useEffect } from 'react';
import { SpartiElement } from '../../types';
import { 
  Images, 
  Plus, 
  Trash2, 
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SliderImage {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

interface SliderEditorProps {
  selectedElement: SpartiElement;
}

export const SliderEditor: React.FC<SliderEditorProps> = ({ selectedElement }) => {
  const [images, setImages] = useState<SliderImage[]>([]);
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
          alt: img.alt || ''
        }));
        setImages(extractedImages);
      }
    }
  }, [selectedElement]);

  // Update element when images change
  useEffect(() => {
    if (selectedElement.element) {
      selectedElement.data = { ...selectedElement.data, images };
      updateSliderHTML();
    }
  }, [images]);

  const updateSliderHTML = () => {
    if (!selectedElement.element || images.length === 0) return;

    // Keep the existing slider structure but update only the images
    const imgElements = selectedElement.element.querySelectorAll('img');
    
    if (imgElements.length > 0) {
      // Update existing images
      images.forEach((image, index) => {
        if (imgElements[index]) {
          imgElements[index].src = image.src;
          imgElements[index].alt = image.alt || '';
        }
      });
    }
  };

  const addImage = () => {
    setImages([...images, { src: '', alt: '' }]);
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
        <Images size={16} />
        Image Editor
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

        <div className="space-y-4 max-h-96 overflow-y-auto">
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
                <div>
                  <Label className="text-xs text-gray-600">Alt Text</Label>
                  <Input
                    value={image.alt}
                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                    placeholder="Alt text"
                    className="text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
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