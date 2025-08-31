import { SpartiElement } from '../types';

export interface ContentChange {
  type: 'text' | 'image' | 'slider' | 'style' | 'attribute';
  elementId: string;
  content?: string;
  element?: HTMLElement;
  styles?: Record<string, string>;
  attributes?: Record<string, string>;
  oldValue?: any;
  newValue?: any;
  newText?: string; // Added for compatibility
  value?: string; // Added for compatibility
}

export interface ModificationSummary {
  filePath: string;
  originalContent: string;
  elements: Array<{
    type: string;
    element?: HTMLElement;
    newText?: string;
    newImageUrl?: string;
    newAltText?: string;
  }>;
}

export class ContentExtractor {
  private static changeHistory: ContentChange[] = [];
  private static readonly MAX_HISTORY = 50;

  static trackChange(change: ContentChange): void {
    this.changeHistory.push({
      ...change,
      timestamp: Date.now()
    } as any);

    // Keep only the last MAX_HISTORY changes
    if (this.changeHistory.length > this.MAX_HISTORY) {
      this.changeHistory = this.changeHistory.slice(-this.MAX_HISTORY);
    }

    console.log('Tracked change:', change);
  }

  static getChangesSince(timestamp?: number): ContentChange[] {
    if (!timestamp) return this.changeHistory;
    
    return this.changeHistory.filter(change => 
      (change as any).timestamp > timestamp
    );
  }

  static clearHistory(): void {
    this.changeHistory = [];
  }

  static extractModifiedContent(): Map<string, ContentChange> {
    const modifications = new Map<string, ContentChange>();

    // Group changes by elementId, keeping only the latest change per element
    this.changeHistory.forEach(change => {
      modifications.set(change.elementId, change);
    });

    return modifications;
  }

  static extractTextContent(element: SpartiElement): string {
    const htmlElement = element.element;
    
    // Try to get the inner text, preserving some structure
    if (htmlElement.tagName === 'P' || htmlElement.tagName === 'H1' || 
        htmlElement.tagName === 'H2' || htmlElement.tagName === 'H3') {
      return htmlElement.innerText;
    }

    // For other elements, get the text content
    return htmlElement.textContent || '';
  }

  static extractImageContent(element: SpartiElement): {src: string, alt?: string, title?: string} {
    const htmlElement = element.element;
    
    if (htmlElement.tagName === 'IMG') {
      const img = htmlElement as HTMLImageElement;
      return {
        src: img.src,
        alt: img.alt,
        title: img.title
      };
    }

    // Look for img elements within the selected element
    const img = htmlElement.querySelector('img');
    if (img) {
      return {
        src: img.src,
        alt: img.alt,
        title: img.title
      };
    }

    return { src: '' };
  }

  static extractSliderImages(element: SpartiElement): Array<{src: string, alt?: string}> {
    const htmlElement = element.element;
    const images: Array<{src: string, alt?: string}> = [];

    // Look for all img elements within the slider
    const imgElements = htmlElement.querySelectorAll('img');
    imgElements.forEach(img => {
      images.push({
        src: img.src,
        alt: img.alt
      });
    });

    return images;
  }

  static extractStyles(element: SpartiElement): Record<string, string> {
    const htmlElement = element.element;
    const computedStyles = window.getComputedStyle(htmlElement);
    const styles: Record<string, string> = {};

    // Extract key style properties
    const importantProps = [
      'backgroundColor', 'color', 'fontSize', 'fontFamily', 
      'fontWeight', 'textAlign', 'padding', 'margin',
      'border', 'borderRadius', 'width', 'height'
    ];

    importantProps.forEach(prop => {
      const value = computedStyles.getPropertyValue(prop);
      if (value && value !== 'initial' && value !== 'inherit') {
        styles[prop] = value;
      }
    });

    return styles;
  }

  static extractAttributes(element: SpartiElement): Record<string, string> {
    const htmlElement = element.element;
    const attributes: Record<string, string> = {};

    // Extract all non-sparti attributes
    for (let i = 0; i < htmlElement.attributes.length; i++) {
      const attr = htmlElement.attributes[i];
      if (!attr.name.startsWith('data-sparti')) {
        attributes[attr.name] = attr.value;
      }
    }

    return attributes;
  }

  static getSpartiComponentId(element: HTMLElement): string | null {
    return element.getAttribute('data-sparti-component');
  }

  static isEditableElement(element: HTMLElement): boolean {
    return element.hasAttribute('data-sparti-editable') || 
           element.hasAttribute('data-sparti-component');
  }

  static findParentEditableElement(element: HTMLElement): HTMLElement | null {
    let current = element.parentElement;
    
    while (current) {
      if (this.isEditableElement(current)) {
        return current;
      }
      current = current.parentElement;
    }
    
    return null;
  }
}
