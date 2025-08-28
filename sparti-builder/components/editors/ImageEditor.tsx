import React, { useState, useEffect, useRef } from 'react';
import { SpartiElement } from '../../types';
import { removeBackground, loadImage, loadImageFromUrl } from '../../utils/backgroundRemoval';
import { 
  Image as ImageIcon, 
  Upload, 
  Link as LinkIcon, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Check,
  ExternalLink,
  Grid,
  Scissors,
  Download,
  RefreshCw,
  Palette,
  Crop,
  RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ImageEditorProps {
  selectedElement: SpartiElement;
}

interface ImageData {
  src: string;
  alt?: string;
  title?: string;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ selectedElement }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [title, setTitle] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [isMediaLibrary, setIsMediaLibrary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingBg, setIsProcessingBg] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image management
  const [images, setImages] = useState<ImageData[]>([]);
  const [isMultiImage, setIsMultiImage] = useState(false);
  const [mediaLibraryImages, setMediaLibraryImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (selectedElement?.element) {
      analyzeImageElement();
      loadMediaLibrary();
    }
  }, [selectedElement]);

  const analyzeImageElement = () => {
    const element = selectedElement.element;
    
    // Check if it's a single image
    if (element.tagName === 'IMG') {
      const imgData: ImageData = {
        src: element.getAttribute('src') || '',
        alt: element.getAttribute('alt') || '',
        title: element.getAttribute('title') || ''
      };
      setImages([imgData]);
      setIsMultiImage(false);
      setImageUrl(imgData.src);
      setAltText(imgData.alt || '');
      setTitle(imgData.title || '');
    } else {
      // Enhanced search: Look for images in current element, parent, and siblings
      let imgElements: NodeListOf<HTMLImageElement> = element.querySelectorAll('img');
      
      // If no images found in current element, check parent element
      if (imgElements.length === 0 && element.parentElement) {
        imgElements = element.parentElement.querySelectorAll('img');
      }
      
      // If still no images, check grandparent (for deeply nested structures)
      if (imgElements.length === 0 && element.parentElement?.parentElement) {
        imgElements = element.parentElement.parentElement.querySelectorAll('img');
      }
      
      if (imgElements.length > 1) {
        const imgArray: ImageData[] = Array.from(imgElements).map(img => ({
          src: img.getAttribute('src') || '',
          alt: img.getAttribute('alt') || '',
          title: img.getAttribute('title') || ''
        }));
        setImages(imgArray);
        setIsMultiImage(true);
        setCurrentImageIndex(0);
        if (imgArray.length > 0) {
          setImageUrl(imgArray[0].src);
          setAltText(imgArray[0].alt || '');
          setTitle(imgArray[0].title || '');
        }
      } else if (imgElements.length === 1) {
        // Single image within a container
        const img = imgElements[0];
        const imgData: ImageData = {
          src: img.getAttribute('src') || '',
          alt: img.getAttribute('alt') || '',
          title: img.getAttribute('title') || ''
        };
        setImages([imgData]);
        setIsMultiImage(false);
        setImageUrl(imgData.src);
        setAltText(imgData.alt || '');
        setTitle(imgData.title || '');
      }
    }
  };

  const handleImageChange = (newSrc: string, newAlt?: string, newTitle?: string) => {
    const element = selectedElement.element;
    
    if (isMultiImage) {
      // Enhanced search for images using same logic as analyzeImageElement
      let imgElements: NodeListOf<HTMLImageElement> = element.querySelectorAll('img');
      
      if (imgElements.length === 0 && element.parentElement) {
        imgElements = element.parentElement.querySelectorAll('img');
      }
      
      if (imgElements.length === 0 && element.parentElement?.parentElement) {
        imgElements = element.parentElement.parentElement.querySelectorAll('img');
      }
      
      // Update specific image in multi-image scenario
      if (imgElements[currentImageIndex]) {
        imgElements[currentImageIndex].setAttribute('src', newSrc);
        if (newAlt !== undefined) {
          imgElements[currentImageIndex].setAttribute('alt', newAlt);
        }
        if (newTitle !== undefined) {
          imgElements[currentImageIndex].setAttribute('title', newTitle);
        }
      }
      
      // Update state
      const newImages = [...images];
      newImages[currentImageIndex] = { 
        ...newImages[currentImageIndex], 
        src: newSrc, 
        alt: newAlt, 
        title: newTitle 
      };
      setImages(newImages);
    } else {
      // Update single image
      if (element.tagName === 'IMG') {
        element.setAttribute('src', newSrc);
        if (newAlt !== undefined) {
          element.setAttribute('alt', newAlt);
        }
        if (newTitle !== undefined) {
          element.setAttribute('title', newTitle);
        }
      } else {
        // Enhanced search for single image
        let img: HTMLImageElement | null = element.querySelector('img');
        
        if (!img && element.parentElement) {
          img = element.parentElement.querySelector('img');
        }
        
        if (!img && element.parentElement?.parentElement) {
          img = element.parentElement.parentElement.querySelector('img');
        }
        
        if (img) {
          img.setAttribute('src', newSrc);
          if (newAlt !== undefined) {
            img.setAttribute('alt', newAlt);
          }
          if (newTitle !== undefined) {
            img.setAttribute('title', newTitle);
          }
        }
      }
      
      // Update state
      setImages([{ src: newSrc, alt: newAlt, title: newTitle }]);
    }

    // Update element data
    selectedElement.data = {
      ...selectedElement.data,
      src: newSrc,
      alt: newAlt,
      title: newTitle
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic file validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageUrl(imageUrl);
        handleImageChange(imageUrl, altText, title);
        
        // Store in localStorage for demo persistence
        const demoImages = JSON.parse(localStorage.getItem('sparti-demo-images') || '[]');
        const newImage = { 
          src: imageUrl, 
          alt: altText || file.name, 
          title: title || file.name,
          name: file.name 
        };
        demoImages.push(newImage);
        localStorage.setItem('sparti-demo-images', JSON.stringify(demoImages));
        
        // Refresh media library
        loadMediaLibrary();
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    setIsLoading(true);
    
    try {
      // Test if the URL is valid by creating an image element
      await loadImageFromUrl(imageUrl.trim());
      handleImageChange(imageUrl.trim(), altText, title);
      setIsUrlMode(false);
      toast.success('Image URL applied successfully');
    } catch (error) {
      toast.error('Failed to load image from URL. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!imageUrl) {
      toast.error('No image to process');
      return;
    }

    setIsProcessingBg(true);
    
    try {
      toast.info('Starting background removal... This may take a moment.');
      
      // Load the image
      let imgElement: HTMLImageElement;
      
      if (imageUrl.startsWith('data:')) {
        // Convert data URL to blob first
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        imgElement = await loadImage(blob);
      } else {
        imgElement = await loadImageFromUrl(imageUrl);
      }

      // Remove background
      const resultBlob = await removeBackground(imgElement);
      
      // Convert blob to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageUrl = e.target?.result as string;
        setImageUrl(newImageUrl);
        handleImageChange(newImageUrl, altText, title);
        
        // Save to media library
        const demoImages = JSON.parse(localStorage.getItem('sparti-demo-images') || '[]');
        const newImage = {
          src: newImageUrl,
          alt: altText + ' (background removed)',
          title: title + ' (background removed)',
          name: 'background-removed-' + Date.now()
        };
        demoImages.push(newImage);
        localStorage.setItem('sparti-demo-images', JSON.stringify(demoImages));
        
        loadMediaLibrary();
        toast.success('Background removed successfully!');
      };
      reader.readAsDataURL(resultBlob);
      
    } catch (error) {
      console.error('Background removal failed:', error);
      toast.error('Background removal failed. Please try again or use a different image.');
    } finally {
      setIsProcessingBg(false);
    }
  };

  const downloadImage = async () => {
    if (!imageUrl) return;
    
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'sparti-image-' + Date.now() + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const loadMediaLibrary = () => {
    const demoImages = JSON.parse(localStorage.getItem('sparti-demo-images') || '[]');
    setMediaLibraryImages(demoImages);
  };

  const selectFromLibrary = (image: ImageData) => {
    setImageUrl(image.src);
    setAltText(image.alt || '');
    setTitle(image.title || '');
    handleImageChange(image.src, image.alt, image.title);
    setIsMediaLibrary(false);
    toast.success('Image selected from library');
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!isMultiImage) return;
    
    let newIndex = currentImageIndex;
    if (direction === 'prev') {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    } else {
      newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    }
    
    setCurrentImageIndex(newIndex);
    setImageUrl(images[newIndex].src);
    setAltText(images[newIndex].alt || '');
    setTitle(images[newIndex].title || '');
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="sparti-edit-section">
      <div className="sparti-edit-label">
        <ImageIcon size={16} />
        Image Editor {isMultiImage && `(${currentImageIndex + 1}/${images.length})`}
      </div>

      {/* Multi-image navigation */}
      {isMultiImage && images.length > 1 && (
        <div className="sparti-edit-group">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <Button
              onClick={() => navigateImage('prev')}
              size="sm"
              variant="ghost"
              disabled={isLoading}
            >
              <ChevronLeft size={16} />
            </Button>
            
            <span className="text-sm font-medium">
              Image {currentImageIndex + 1} of {images.length}
            </span>
            
            <Button
              onClick={() => navigateImage('next')}
              size="sm"
              variant="ghost"
              disabled={isLoading}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Image preview */}
      {currentImage && (
        <div className="sparti-edit-group">
          <Label className="text-sm font-semibold">Preview</Label>
          <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border">
            {currentImage.src ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="text-gray-400 text-center">
                <ImageIcon size={24} className="mx-auto mb-2" />
                <p className="text-sm">No image</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* URL input mode */}
      {isUrlMode ? (
        <div className="sparti-edit-group">
          <Label className="text-sm font-semibold">Image URL</Label>
          <div className="space-y-3">
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            
            <div className="flex gap-2">
              <Button
                onClick={handleUrlSubmit}
                disabled={!imageUrl.trim() || isLoading}
                size="sm"
                className="flex-1"
              >
                <Check size={14} className="mr-1" />
                {isLoading ? 'Loading...' : 'Apply URL'}
              </Button>
              <Button
                onClick={() => setIsUrlMode(false)}
                variant="outline"
                size="sm"
              >
                <X size={14} />
              </Button>
            </div>
          </div>
        </div>
      ) : isMediaLibrary ? (
        /* Media Library Mode */
        <div className="sparti-edit-group">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold">Media Library</Label>
            <Button
              onClick={() => setIsMediaLibrary(false)}
              variant="ghost"
              size="sm"
            >
              <X size={14} />
            </Button>
          </div>
          
          {mediaLibraryImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {mediaLibraryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectFromLibrary(image)}
                  className="aspect-square rounded-lg overflow-hidden border hover:border-blue-500 transition-colors"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon size={32} className="mx-auto mb-2" />
              <p className="text-sm">No images in library</p>
              <p className="text-xs">Upload images to see them here</p>
            </div>
          )}
        </div>
      ) : (
        /* Main controls */
        <div className="space-y-4">
          {/* Action buttons */}
          <div className="sparti-edit-group">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                size="sm"
                className="w-full"
              >
                <Upload size={14} className="mr-1" />
                {isLoading ? 'Uploading...' : 'Upload'}
              </Button>

              <Button
                onClick={() => setIsUrlMode(true)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <LinkIcon size={14} className="mr-1" />
                URL
              </Button>

              <Button
                onClick={() => setIsMediaLibrary(true)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Grid size={14} className="mr-1" />
                Library
              </Button>

              <Button
                onClick={handleRemoveBackground}
                disabled={!imageUrl || isProcessingBg}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {isProcessingBg ? (
                  <RefreshCw size={14} className="mr-1 animate-spin" />
                ) : (
                  <Scissors size={14} className="mr-1" />
                )}
                {isProcessingBg ? 'Processing...' : 'Remove BG'}
              </Button>
            </div>
          </div>

          {/* Image properties */}
          <div className="sparti-edit-group">
            <Label className="text-sm font-semibold mb-3 block">Image Properties</Label>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-600">Alt Text</Label>
                <Input
                  value={altText}
                  onChange={(e) => {
                    setAltText(e.target.value);
                    handleImageChange(imageUrl, e.target.value, title);
                  }}
                  placeholder="Descriptive text for accessibility"
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-600">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleImageChange(imageUrl, altText, e.target.value);
                  }}
                  placeholder="Image title"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Advanced options */}
          <div className="sparti-edit-group">
            <Button
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="ghost"
              size="sm"
              className="w-full justify-between"
            >
              Advanced Options
              <ChevronRight 
                size={14} 
                className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
              />
            </Button>

            {showAdvanced && (
              <div className="mt-3 space-y-2">
                <Button
                  onClick={downloadImage}
                  disabled={!imageUrl}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download size={14} className="mr-1" />
                  Download Image
                </Button>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <Crop size={14} />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <RotateCw size={14} />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Palette size={14} />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">More tools coming soon</p>
              </div>
            )}
          </div>

          {/* Current URL display */}
          {imageUrl && (
            <div className="sparti-edit-group">
              <Label className="text-xs text-gray-600">Current URL</Label>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border text-xs">
                <span className="truncate flex-1 text-gray-800" title={imageUrl}>
                  {imageUrl.length > 50 ? `${imageUrl.substring(0, 50)}...` : imageUrl}
                </span>
                <Button
                  onClick={() => window.open(imageUrl, '_blank')}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                >
                  <ExternalLink size={12} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};