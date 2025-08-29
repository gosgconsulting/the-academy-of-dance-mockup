import { PageSchema, SectionSchema, ElementSchema, ElementPosition } from '../types/content-schema';
import { ElementType } from '../types';

export class PageSchemaGenerator {
  private static getElementType(element: HTMLElement): ElementType {
    const tagName = element.tagName.toLowerCase();
    
    // Check for slider components
    if (element.classList.contains('slider') || element.querySelector('.slider-container')) {
      return 'slider';
    }
    
    // Check for container elements
    if (['div', 'section', 'article', 'aside', 'header', 'footer', 'main', 'nav'].includes(tagName)) {
      return 'container';
    }
    
    // Standard element mapping
    switch (tagName) {
      case 'img': return 'image';
      case 'video': return 'video';
      case 'button': return 'button';
      case 'a': return 'link';
      case 'input':
      case 'textarea':
      case 'select': return 'input';
      case 'p':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'span':
      case 'strong':
      case 'em': return 'text';
      default: return 'unknown';
    }
  }

  private static getElementPosition(element: HTMLElement): ElementPosition {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    };
  }

  private static getComputedStyles(element: HTMLElement): Record<string, string> {
    const computedStyle = window.getComputedStyle(element);
    const styles: Record<string, string> = {};
    
    // Only capture meaningful styles, not all computed styles
    const importantProperties = [
      'color', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight',
      'textAlign', 'padding', 'margin', 'border', 'borderRadius',
      'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight',
      'display', 'position', 'top', 'left', 'right', 'bottom',
      'zIndex', 'opacity', 'transform', 'transition'
    ];
    
    importantProperties.forEach(prop => {
      const value = computedStyle.getPropertyValue(prop);
      if (value && value !== 'initial' && value !== 'normal') {
        styles[prop] = value;
      }
    });
    
    return styles;
  }

  private static getElementAttributes(element: HTMLElement): Record<string, string> {
    const attributes: Record<string, string> = {};
    
    Array.from(element.attributes).forEach(attr => {
      attributes[attr.name] = attr.value;
    });
    
    return attributes;
  }

  private static generateElementSchema(element: HTMLElement, index: number): ElementSchema {
    const type = this.getElementType(element);
    const schema: ElementSchema = {
      id: element.id || `element-${Date.now()}-${index}`,
      type,
      tagName: element.tagName.toLowerCase(),
      content: element.textContent || undefined,
      attributes: this.getElementAttributes(element),
      styles: this.getComputedStyles(element),
      position: this.getElementPosition(element)
    };

    // Add type-specific properties
    switch (type) {
      case 'image':
        schema.src = element.getAttribute('src') || undefined;
        schema.alt = element.getAttribute('alt') || undefined;
        break;
      case 'link':
        schema.href = element.getAttribute('href') || undefined;
        schema.title = element.getAttribute('title') || undefined;
        break;
      case 'button':
      case 'input':
        schema.value = (element as HTMLInputElement).value || undefined;
        schema.placeholder = element.getAttribute('placeholder') || undefined;
        break;
      case 'slider':
        // Handle slider-specific properties
        const images = Array.from(element.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || undefined,
          title: img.title || undefined
        }));
        if (images.length > 0) {
          schema.images = images;
        }
        break;
    }

    return schema;
  }

  private static generateSectionSchema(section: HTMLElement, index: number): SectionSchema {
    const elements = Array.from(section.children) as HTMLElement[];
    
    return {
      id: section.id || `section-${Date.now()}-${index}`,
      type: section.getAttribute('data-section-type') || 'content',
      order: index,
      elements: elements.map((el, idx) => this.generateElementSchema(el, idx)),
      settings: {
        className: section.className || undefined,
        styles: this.getComputedStyles(section),
        attributes: this.getElementAttributes(section)
      }
    };
  }

  public static generatePageSchema(route: string = window.location.pathname): PageSchema {
    const title = document.title || 'Untitled Page';
    const mainContent = document.querySelector('main') || document.body;
    
    // Find all sections or create artificial sections
    let sections: HTMLElement[] = Array.from(mainContent.querySelectorAll('section'));
    
    // If no sections found, treat direct children as sections
    if (sections.length === 0) {
      sections = Array.from(mainContent.children) as HTMLElement[];
    }

    const schema: PageSchema = {
      id: `page-${route.replace(/\//g, '-') || 'home'}`,
      route,
      title,
      version: 1,
      sections: sections.map((section, index) => this.generateSectionSchema(section, index)),
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || undefined
      }
    };

    return schema;
  }

  public static generateIncrementalUpdate(changedElements: HTMLElement[]): Partial<PageSchema> {
    // Generate only changed elements for efficient updates
    const updatedSections = changedElements.map((element, index) => {
      const section = element.closest('section') || element.parentElement!;
      return this.generateSectionSchema(section as HTMLElement, index);
    });

    return {
      sections: updatedSections,
      metadata: {
        createdAt: new Date().toISOString(), // Add required field
        updatedAt: new Date().toISOString()
      }
    };
  }
}