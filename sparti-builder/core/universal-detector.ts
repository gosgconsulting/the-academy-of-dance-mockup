// Enhanced Universal Element Detector - Works on any website
import { ElementType, ElementData } from '../types';

export class UniversalElementDetector {
  // Common selectors that should be avoided for editing
  private static readonly SKIP_SELECTORS = [
    '.sparti-toolbar', '.sparti-edit-panel', '.sparti-overlay', '.sparti-ui',
    'script', 'style', 'noscript', 'meta', 'title', 'link', 'head',
    '[data-sparti-ignore]', '.no-edit', '[contenteditable="false"]',
    '.sparti-no-edit', 'header[data-sparti-ignore]', 'footer[data-sparti-ignore]',
    'nav[data-sparti-ignore]', '.fixed-ui', '.whatsapp-button', '.whatsapp-chat'
  ];

  // Interactive element indicators
  // Interactive element indicators  
  private static readonly SEMANTIC_INDICATORS = [
    'button', 'a[href]', 'input', 'select', 'textarea', 'details', 'summary',
    '[onclick]', '[role="button"]', '[tabindex]', '.btn', '.button'
  ];

  static detectElementType(element: HTMLElement): ElementType {
    const tagName = element.tagName.toLowerCase();
    
    // Direct tag-based detection (highest priority)
    switch (tagName) {
      case 'img':
        return 'image';
      case 'video':
      case 'source': // video source
        return 'video';
      case 'button':
        return 'button';
      case 'a':
        return element.hasAttribute('href') ? 'link' : 'text';
      case 'input':
      case 'textarea':
      case 'select':
        return 'input';
      case 'iframe':
      case 'embed':
      case 'object':
        return 'media';
    }

    // Attribute-based detection
    const role = element.getAttribute('role');
    const type = element.getAttribute('type');
    const onclick = element.getAttribute('onclick');
    
    if (role === 'button' || onclick || type === 'button' || type === 'submit' || type === 'reset') {
      return 'button';
    }

    // Class and data attribute detection
    const className = element.className.toString().toLowerCase();
    
    // Check against semantic indicators
    const isInteractive = this.SEMANTIC_INDICATORS.some(selector => {
      if (selector.startsWith('.')) {
        return className.includes(selector.slice(1));
      }
      if (selector.startsWith('[') && selector.endsWith(']')) {
        const attr = selector.slice(1, -1).split('=')[0];
        return element.hasAttribute(attr);
      }
      return element.matches(selector);
    });
    
    if (isInteractive) {
      if (className.includes('btn') || className.includes('button') || element.tagName.toLowerCase() === 'button') {
        return 'button';
      }
      if (className.includes('link') || element.tagName.toLowerCase() === 'a') {
        return 'link';
      }
    }

    // URL detection in href attributes
    if (element.hasAttribute('href')) {
      return 'link';
    }

    // Background image detection
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none' && !backgroundImage.includes('gradient')) {
      return 'image';
    }

    // Slider/Carousel detection (before media container)
    if (this.isSliderElement(element)) {
      return 'slider';
    }

    // Media container detection
    if (element.querySelector('img, video, iframe, embed, object')) {
      return 'media';
    }

    // Container element detection
    if (this.isContainerElement(element)) {
      return 'container';
    }

    // Text element detection
    if (this.isTextElement(element)) {
      return 'text';
    }

    return 'unknown';
  }

  static isSliderElement(element: HTMLElement): boolean {
    const className = element.className.toString().toLowerCase();
    const tagName = element.tagName.toLowerCase();
    
    // Check for specific Sparti components that are sliders
    const spartiComponent = element.getAttribute('data-sparti-component');
    if (spartiComponent === 'hero-section' || spartiComponent?.includes('slider') || spartiComponent?.includes('carousel')) {
      return true;
    }
    
    // Check for common slider/carousel class names
    const sliderClasses = [
      'slider', 'carousel', 'swiper', 'glide', 'splide', 'keen-slider',
      'owl-carousel', 'slick', 'flickity', 'embla', 'hero-slider',
      'image-slider', 'gallery-slider', 'slideshow', 'banner-slider',
      'hero-section', 'hero-banner', 'banner-carousel', 'main-slider'
    ];
    
    // Check if element has slider-related classes
    const hasSliderClass = sliderClasses.some(cls => className.includes(cls));
    if (hasSliderClass) return true;
    
    // Check for data attributes that indicate sliders
    const sliderAttributes = [
      'data-slider', 'data-carousel', 'data-swiper', 'data-glide',
      'data-splide', 'data-flickity', 'data-embla'
    ];
    
    const hasSliderAttribute = sliderAttributes.some(attr => element.hasAttribute(attr));
    if (hasSliderAttribute) return true;
    
    // Check if element contains multiple images (potential image slider)
    const images = element.querySelectorAll('img');
    if (images.length >= 2) {
      // Additional checks to confirm it's likely a slider
      // Check for navigation controls or slide indicators
      const hasNavigation = element.querySelector('.prev, .next, .arrow, .nav, .dots, .indicators');
      const hasSliderStructure = element.querySelector('.slide, .item, .panel, [data-slide]');
      
      // Check for opacity-based transitions (common in hero sliders)
      const hasOpacityTransitions = Array.from(element.querySelectorAll('div')).some(div => {
        const style = window.getComputedStyle(div);
        return style.opacity !== undefined && (
          div.className.includes('opacity-') || 
          style.transition?.includes('opacity') ||
          div.className.includes('transition')
        );
      });
      
      if (hasNavigation || hasSliderStructure || hasOpacityTransitions) {
        return true;
      }
      
      // If it's a container with multiple images and specific layout, likely a slider
      if (tagName === 'div' || tagName === 'section') {
        const computedStyle = window.getComputedStyle(element);
        const overflow = computedStyle.overflow || computedStyle.overflowX;
        if (overflow === 'hidden' && images.length >= 2) {
          return true;
        }
      }
    }
    
    return false;
  }

  static isContainerElement(element: HTMLElement): boolean {
    const containerTags = [
      'div', 'section', 'article', 'aside', 'nav', 'header', 'footer', 'main',
      'figure', 'figcaption', 'details', 'summary', 'dialog', 'form', 'fieldset'
    ];
    const tagName = element.tagName.toLowerCase();
    
    // Must be a container tag with children
    if (!containerTags.includes(tagName)) return false;
    
    // Has child elements or significant content
    const hasChildren = element.children.length > 0;
    const hasSignificantText = (element.textContent || '').trim().length > 50;
    
    return hasChildren || hasSignificantText;
  }

  static isTextElement(element: HTMLElement): boolean {
    const textTags = [
      'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'label', 'li', 'td', 'th', 'dt', 'dd', 'blockquote',
      'strong', 'em', 'b', 'i', 'u', 'small', 'mark', 'del', 'ins'
    ];
    const tagName = element.tagName.toLowerCase();
    
    if (textTags.includes(tagName)) {
      return true;
    }

    // Check if element has primarily text content and minimal children
    const textContent = (element.textContent || '').trim();
    const childElements = element.children.length;
    const childTextNodes = Array.from(element.childNodes).filter(
      node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    ).length;
    
    return textContent.length > 0 && (childElements === 0 || childTextNodes > childElements);
  }

  static extractElementData(element: HTMLElement): ElementData {
    const elementType = this.detectElementType(element);
    const computedStyles = window.getComputedStyle(element);
    
    // Extract comprehensive styles with universal property names
    const styles: Record<string, string> = {};
    const universalStyleProps = [
      'color', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight', 
      'textAlign', 'textDecoration', 'lineHeight', 'letterSpacing',
      'padding', 'margin', 'border', 'borderRadius', 'borderWidth', 'borderColor',
      'display', 'position', 'width', 'height', 'maxWidth', 'maxHeight',
      'opacity', 'zIndex', 'visibility', 'overflow', 'cursor',
      'transform', 'transition', 'boxShadow', 'backgroundImage'
    ];
    
    universalStyleProps.forEach(prop => {
      const value = computedStyles.getPropertyValue(prop);
      if (value && value !== 'initial' && value !== 'inherit') {
        styles[prop] = value;
      }
    });

    // Extract all attributes safely
    const attributes: Record<string, string> = {};
    try {
      Array.from(element.attributes).forEach(attr => {
        attributes[attr.name] = attr.value;
      });
    } catch (e) {
      // Fallback for older browsers
      if (element.id) attributes['id'] = element.id;
      if (element.className) attributes['class'] = element.className.toString();
    }

    // Generate unique ID if none exists
    const uniqueId = element.id || 
      element.getAttribute('data-sparti-id') ||
      `sparti-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const data: ElementData = {
      id: uniqueId,
      tagName: element.tagName.toLowerCase(),
      elementType,
      attributes,
      styles,
    };

    // Add element-specific properties with error handling
    try {
      switch (elementType) {
        case 'image':
          data.src = element.getAttribute('src') || 
                    computedStyles.backgroundImage?.match(/url\("([^"]*)"\)/)?.[1] || '';
          data.alt = element.getAttribute('alt') || '';
          data.title = element.getAttribute('title') || '';
          break;
          
        case 'video':
          data.src = element.getAttribute('src') || 
                    element.querySelector('source')?.getAttribute('src') || '';
          data.title = element.getAttribute('title') || '';
          break;
          
        case 'link':
          data.href = element.getAttribute('href') || '';
          data.title = element.getAttribute('title') || '';
          data.content = this.getTextContent(element);
          break;
          
        case 'button':
          data.type = element.getAttribute('type') || 'button';
          data.value = (element as HTMLButtonElement).value || '';
          data.content = this.getTextContent(element);
          break;
          
        case 'input':
          const input = element as HTMLInputElement;
          data.type = input.type || 'text';
          data.value = input.value || '';
          data.placeholder = input.placeholder || '';
          break;
          
        default:
          data.content = this.getTextContent(element);
          break;
      }
    } catch (e) {
      console.warn('Error extracting element-specific data:', e);
      data.content = element.textContent || '';
    }

    return data;
  }

  private static getTextContent(element: HTMLElement): string {
    // Get text content while preserving some formatting
    try {
      return element.textContent || element.innerText || '';
    } catch (e) {
      return '';
    }
  }

  static isEditableElement(element: HTMLElement): boolean {
    if (!element || element === document.body || element === document.documentElement) {
      return false;
    }

    // Skip header, footer, and navigation elements
    const nonEditableTags = ['header', 'footer', 'nav'];
    const tagName = element.tagName.toLowerCase();
    
    if (nonEditableTags.includes(tagName)) {
      return false;
    }

    // Skip elements inside non-editable containers
    if (element.closest('header, footer, nav, [data-sparti-ignore], .sparti-no-edit')) {
      return false;
    }

    // Only allow editing within sparti-section containers
    const isInEditableSection = element.closest('[data-sparti-section], .sparti-section');
    if (!isInEditableSection && !element.matches('[data-sparti-section], .sparti-section')) {
      return false;
    }

    // Skip elements with explicit skip indicators
    for (const selector of this.SKIP_SELECTORS) {
      try {
        if (element.matches?.(selector) || element.closest?.(selector)) {
          return false;
        }
      } catch (e) {
        // Fallback for older browsers or invalid selectors
        if (element.tagName?.toLowerCase() === selector.toLowerCase()) {
          return false;
        }
      }
    }

    // Skip hidden elements
    try {
      const styles = window.getComputedStyle(element);
      if (styles.display === 'none' || 
          styles.visibility === 'hidden' || 
          styles.opacity === '0') {
        return false;
      }
    } catch (e) {
      // Fallback check
      if (element.style.display === 'none' || element.hidden) {
        return false;
      }
    }

    // Skip very small elements (likely decorative)
    try {
      const rect = element.getBoundingClientRect();
      if (rect.width < 10 && rect.height < 10) {
        return false;
      }
    } catch (e) {
      // Continue if getBoundingClientRect fails
    }

    return true;
  }

  static findNearestEditableElement(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element;
    let depth = 0;
    const maxDepth = 10; // Prevent infinite loops
    
    while (current && current !== document.body && depth < maxDepth) {
      // Skip elements outside editable sections
      if (current.closest('[data-sparti-ignore], .sparti-no-edit')) {
        return null;
      }
      
      // Only allow elements within sparti sections
      if (!current.closest('[data-sparti-section], .sparti-section') && 
          !current.matches('[data-sparti-section], .sparti-section')) {
        current = current.parentElement;
        depth++;
        continue;
      }
      
      if (this.isEditableElement(current)) {
        return current;
      }
      current = current.parentElement;
      depth++;
    }
    
    return null;
  }

  static getElementCapabilities(elementType: ElementType): string[] {
    const capabilities: Record<ElementType, string[]> = {
      image: ['src', 'alt', 'title', 'dimensions', 'filters', 'position', 'lazy-loading'],
      video: ['src', 'controls', 'autoplay', 'dimensions', 'poster', 'subtitles'],
      button: ['text', 'colors', 'borders', 'actions', 'states', 'icons'],
      link: ['href', 'target', 'text', 'colors', 'decoration', 'rel'],
      input: ['value', 'placeholder', 'type', 'validation', 'styling', 'attributes'],
      text: ['content', 'typography', 'colors', 'alignment', 'spacing'],
      container: ['layout', 'spacing', 'background', 'borders', 'responsive'],
      media: ['content', 'layout', 'styling', 'responsive'],
      slider: ['images', 'autoplay', 'navigation', 'transitions', 'layout'],
      unknown: ['basic', 'styling']
    };

    return capabilities[elementType] || capabilities.unknown;
  }

  static getElementHierarchy(element: HTMLElement): ElementData[] {
    const hierarchy: ElementData[] = [];
    let current: HTMLElement | null = element;
    let depth = 0;
    const maxDepth = 15; // Reasonable limit
    
    while (current && current !== document.body && depth < maxDepth) {
      if (this.isEditableElement(current)) {
        try {
          hierarchy.unshift(this.extractElementData(current));
        } catch (e) {
          console.warn('Error extracting element data for hierarchy:', e);
        }
      }
      current = current.parentElement;
      depth++;
    }
    
    return hierarchy;
  }

  // Universal method to check if site has specific framework
  static detectFramework(): string {
    const indicators = {
      'React': () => window.React || document.querySelector('[data-reactroot]'),
      'Vue': () => (window as any).Vue || document.querySelector('[data-server-rendered]'),
      'Angular': () => (window as any).ng || document.querySelector('[ng-app], [ng-version]'),
      'WordPress': () => document.querySelector('link[href*="wp-content"]'),
      'Shopify': () => (window as any).Shopify || document.querySelector('script[src*="shopify"]'),
      'Squarespace': () => document.querySelector('script[src*="squarespace"]'),
      'Wix': () => document.querySelector('meta[name="generator"][content*="Wix"]'),
    };

    for (const [name, check] of Object.entries(indicators)) {
      try {
        if (check()) return name;
      } catch (e) {
        continue;
      }
    }

    return 'Unknown';
  }
}