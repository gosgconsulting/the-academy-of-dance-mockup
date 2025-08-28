// Advanced element detection system inspired by Pinegrow
import { ElementType, ElementData } from '../types';

export class SpartiElementDetector {
  static detectElementType(element: HTMLElement): ElementType {
    const tagName = element.tagName.toLowerCase();
    
    // Direct tag-based detection
    switch (tagName) {
      case 'img':
        return 'image';
      case 'video':
        return 'video';
      case 'button':
        return 'button';
      case 'a':
        return 'link';
      case 'input':
      case 'textarea':
      case 'select':
        return 'input';
      default:
        break;
    }

    // Role and attribute-based detection
    const role = element.getAttribute('role');
    const type = element.getAttribute('type');
    
    if (role === 'button' || element.onclick !== null) {
      return 'button';
    }
    
    if (type === 'button' || type === 'submit' || type === 'reset') {
      return 'button';
    }

    // Content-based detection
    const href = element.getAttribute('href');
    if (href) {
      return 'link';
    }

    // Check for interactive elements
    if (element.classList.contains('btn') || 
        element.classList.contains('button') ||
        element.getAttribute('onclick')) {
      return 'button';
    }

    // Enhanced image detection
    const hasImages = element.querySelectorAll('img').length > 0;
    const hasMultipleImages = element.querySelectorAll('img').length > 1;
    const hasVideo = element.querySelector('video') !== null;
    const hasText = element.textContent && element.textContent.trim().length > 0;
    
    // Detect sliders/carousels first (higher priority than single images)
    if (hasMultipleImages) {
      const classList = element.classList.toString().toLowerCase();
      const elementId = element.id.toLowerCase();
      const dataAttrs = Array.from(element.attributes).map(attr => attr.name.toLowerCase());
      
      // Check for slider/carousel indicators
      const sliderKeywords = ['slider', 'carousel', 'swiper', 'gallery', 'slideshow'];
      const hasSliderClass = sliderKeywords.some(keyword => 
        classList.includes(keyword) || 
        elementId.includes(keyword) || 
        dataAttrs.some(attr => attr.includes(keyword))
      );
      
      // Check for slider-specific attributes
      const hasSliderAttrs = element.hasAttribute('data-autoplay') || 
                           element.hasAttribute('data-slides') ||
                           element.querySelector('.slide, .swiper-slide, [class*="slide"]') ||
                           element.querySelector('[class*="dot"], [class*="indicator"]');
      
      if (hasSliderClass || hasSliderAttrs) {
        return 'slider';
      }
      
      // Fallback: multiple images without slider indicators = gallery (treat as image)
      return 'image';
    }
    
    // Single image detection (prioritize over media)
    if (hasImages && !hasText && element.children.length <= 3) {
      return 'image';
    }

    // Check for media containers (fallback)
    if (element.querySelector('img, video')) {
      return 'media';
    }

    // Check for container elements
    if (this.isContainerElement(element)) {
      return 'container';
    }

    // Check if it's primarily text content
    if (this.isTextElement(element)) {
      return 'text';
    }

    return 'unknown';
  }

  static isContainerElement(element: HTMLElement): boolean {
    const containerTags = ['div', 'section', 'article', 'aside', 'nav', 'header', 'footer', 'main'];
    const tagName = element.tagName.toLowerCase();
    
    return containerTags.includes(tagName) && element.children.length > 0;
  }

  static isTextElement(element: HTMLElement): boolean {
    const textTags = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'li', 'td', 'th'];
    const tagName = element.tagName.toLowerCase();
    
    if (textTags.includes(tagName)) {
      return true;
    }

    // Check if element has primarily text content
    const textContent = element.textContent?.trim() || '';
    const childElements = element.children.length;
    
    return textContent.length > 0 && childElements === 0;
  }

  static extractElementData(element: HTMLElement): ElementData {
    const elementType = this.detectElementType(element);
    const computedStyles = window.getComputedStyle(element);
    
    // Extract comprehensive styles
    const styles: Record<string, string> = {};
    const styleProps = [
      'color', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight', 
      'textAlign', 'padding', 'margin', 'border', 'borderRadius',
      'display', 'position', 'width', 'height', 'opacity', 'zIndex'
    ];
    
    styleProps.forEach(prop => {
      styles[prop] = computedStyles.getPropertyValue(prop);
    });

    // Extract all attributes
    const attributes: Record<string, string> = {};
    Array.from(element.attributes).forEach(attr => {
      attributes[attr.name] = attr.value;
    });

    // Extract element-specific properties
    const data: ElementData = {
      id: element.id || `sparti-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tagName: element.tagName.toLowerCase(),
      elementType,
      attributes,
      styles,
    };

    // Add element-specific properties
    switch (elementType) {
      case 'image':
        data.src = element.getAttribute('src') || '';
        data.alt = element.getAttribute('alt') || '';
        data.title = element.getAttribute('title') || '';
        break;
        
      case 'slider':
        // Extract slider configuration
        data.autoplay = element.getAttribute('data-autoplay') === 'true';
        data.autoplaySpeed = parseInt(element.getAttribute('data-autoplay-speed') || '3000');
        data.transition = element.getAttribute('data-transition') || 'fade';
        data.slidesToShow = parseInt(element.getAttribute('data-slides-to-show') || '1');
        
        // Extract images from slider
        const slides = element.querySelectorAll('img');
        data.images = Array.from(slides).map(img => ({
          src: img.src || '',
          alt: img.alt || '',
          title: img.title || '',
          caption: img.getAttribute('data-caption') || ''
        }));
        break;
        
      case 'video':
        data.src = element.getAttribute('src') || element.querySelector('source')?.getAttribute('src') || '';
        data.title = element.getAttribute('title') || '';
        break;
        
      case 'link':
        data.href = element.getAttribute('href') || '';
        data.title = element.getAttribute('title') || '';
        data.content = element.textContent || '';
        break;
        
      case 'button':
        data.type = element.getAttribute('type') || 'button';
        data.value = (element as HTMLButtonElement).value || '';
        data.content = element.textContent || '';
        break;
        
      case 'input':
        const input = element as HTMLInputElement;
        data.type = input.type || 'text';
        data.value = input.value || '';
        data.placeholder = input.placeholder || '';
        break;
        
      case 'text':
      case 'container':
      default:
        data.content = element.textContent || '';
        break;
    }

    return data;
  }

  static getElementCapabilities(elementType: ElementType): string[] {
    const capabilities: Record<ElementType, string[]> = {
      image: ['src', 'alt', 'title', 'dimensions', 'filters', 'position'],
      slider: ['images', 'autoplay', 'transition', 'navigation', 'layout'],
      video: ['src', 'controls', 'autoplay', 'dimensions', 'poster'],
      button: ['text', 'colors', 'borders', 'actions', 'states'],
      link: ['href', 'target', 'text', 'colors', 'decoration'],
      input: ['value', 'placeholder', 'type', 'validation', 'styling'],
      text: ['content', 'typography', 'colors', 'alignment'],
      container: ['layout', 'spacing', 'background', 'borders'],
      media: ['content', 'layout', 'styling'],
      unknown: ['basic']
    };

    return capabilities[elementType] || capabilities.unknown;
  }

  static isEditableElement(element: HTMLElement): boolean {
    // Skip non-editable elements
    const skipTags = ['script', 'style', 'noscript', 'meta', 'title', 'link'];
    const tagName = element.tagName.toLowerCase();
    
    if (skipTags.includes(tagName)) {
      return false;
    }

    // Skip Sparti Builder UI elements
    if (element.closest('.sparti-toolbar') || 
        element.closest('.sparti-edit-panel') ||
        element.closest('.sparti-overlay') ||
        element.classList.contains('sparti-ui')) {
      return false;
    }

    // Skip hidden elements
    const styles = window.getComputedStyle(element);
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      return false;
    }

    return true;
  }

  static findNearestEditableElement(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      if (this.isEditableElement(current)) {
        return current;
      }
      current = current.parentElement;
    }
    
    return null;
  }

  static getElementHierarchy(element: HTMLElement): ElementData[] {
    const hierarchy: ElementData[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      if (this.isEditableElement(current)) {
        hierarchy.unshift(this.extractElementData(current));
      }
      current = current.parentElement;
    }
    
    return hierarchy;
  }
}