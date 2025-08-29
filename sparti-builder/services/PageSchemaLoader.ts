import { PageSchema, SectionSchema, ElementSchema } from '../types/content-schema';

export class PageSchemaLoader {
  private static applyStyles(element: HTMLElement, styles: Record<string, string>) {
    Object.entries(styles).forEach(([property, value]) => {
      if (value && value !== 'initial' && value !== 'normal') {
        element.style.setProperty(property, value);
      }
    });
  }

  private static applyAttributes(element: HTMLElement, attributes: Record<string, string>) {
    Object.entries(attributes).forEach(([name, value]) => {
      if (name !== 'style') { // Skip style attribute as we handle it separately
        element.setAttribute(name, value);
      }
    });
  }

  private static createElement(schema: ElementSchema): HTMLElement {
    const element = document.createElement(schema.tagName);
    
    // Set basic properties
    if (schema.id) element.id = schema.id;
    if (schema.content && schema.type === 'text') {
      element.textContent = schema.content;
    }

    // Apply attributes
    this.applyAttributes(element, schema.attributes);

    // Apply styles
    this.applyStyles(element, schema.styles);

    // Handle type-specific properties
    switch (schema.type) {
      case 'image':
        if (schema.src) (element as HTMLImageElement).src = schema.src;
        if (schema.alt) (element as HTMLImageElement).alt = schema.alt;
        break;
      case 'link':
        if (schema.href) (element as HTMLAnchorElement).href = schema.href;
        if (schema.title) element.title = schema.title;
        break;
      case 'button':
      case 'input':
        if (schema.value) (element as HTMLInputElement).value = schema.value;
        if (schema.placeholder) (element as HTMLInputElement).placeholder = schema.placeholder;
        break;
      case 'slider':
        // Handle slider reconstruction
        if (schema.images && schema.images.length > 0) {
          element.className = 'slider-container';
          schema.images.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            if (img.alt) imgElement.alt = img.alt;
            if (img.title) imgElement.title = img.title;
            element.appendChild(imgElement);
          });
        }
        break;
    }

    return element;
  }

  private static updateElement(existingElement: HTMLElement, schema: ElementSchema) {
    // Update content
    if (schema.content && schema.type === 'text') {
      existingElement.textContent = schema.content;
    }

    // Update attributes
    this.applyAttributes(existingElement, schema.attributes);

    // Update styles
    this.applyStyles(existingElement, schema.styles);

    // Handle type-specific updates
    switch (schema.type) {
      case 'image':
        if (schema.src) (existingElement as HTMLImageElement).src = schema.src;
        if (schema.alt) (existingElement as HTMLImageElement).alt = schema.alt;
        break;
      case 'link':
        if (schema.href) (existingElement as HTMLAnchorElement).href = schema.href;
        if (schema.title) existingElement.title = schema.title;
        break;
      case 'button':
      case 'input':
        if (schema.value) (existingElement as HTMLInputElement).value = schema.value;
        if (schema.placeholder) (existingElement as HTMLInputElement).placeholder = schema.placeholder;
        break;
      case 'slider':
        // Update slider images
        if (schema.images) {
          // Clear existing images
          existingElement.innerHTML = '';
          schema.images.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            if (img.alt) imgElement.alt = img.alt;
            if (img.title) imgElement.title = img.title;
            existingElement.appendChild(imgElement);
          });
        }
        break;
    }
  }

  private static loadSection(sectionSchema: SectionSchema, targetContainer: HTMLElement) {
    let sectionElement = document.getElementById(sectionSchema.id);
    
    if (!sectionElement) {
      // Create new section
      sectionElement = document.createElement('section');
      sectionElement.id = sectionSchema.id;
      targetContainer.appendChild(sectionElement);
    }

    // Apply section settings
    if (sectionSchema.settings.className) {
      sectionElement.className = sectionSchema.settings.className;
    }
    
    if (sectionSchema.settings.styles) {
      this.applyStyles(sectionElement, sectionSchema.settings.styles);
    }
    
    if (sectionSchema.settings.attributes) {
      this.applyAttributes(sectionElement, sectionSchema.settings.attributes);
    }

    // Clear existing content
    sectionElement.innerHTML = '';

    // Load elements
    sectionSchema.elements.forEach(elementSchema => {
      const element = this.createElement(elementSchema);
      sectionElement!.appendChild(element);
    });
  }

  public static async loadPageSchema(schema: PageSchema): Promise<void> {
    try {
      // Update page title
      document.title = schema.title;

      // Update meta description if provided
      if (schema.metadata.description) {
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = schema.metadata.description;
      }

      // Find main content container
      const mainContent = document.querySelector('main') || document.body;

      // Load sections in order
      schema.sections
        .sort((a, b) => a.order - b.order)
        .forEach(sectionSchema => {
          this.loadSection(sectionSchema, mainContent as HTMLElement);
        });

      console.log(`Page schema loaded successfully: ${schema.title} (v${schema.version})`);
    } catch (error) {
      console.error('Error loading page schema:', error);
      throw error;
    }
  }

  public static async updatePageContent(schema: Partial<PageSchema>): Promise<void> {
    try {
      // Update title if provided
      if (schema.title) {
        document.title = schema.title;
      }

      // Update meta description if provided
      if (schema.metadata?.description) {
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = schema.metadata.description;
      }

      // Update sections if provided
      if (schema.sections) {
        const mainContent = document.querySelector('main') || document.body;
        
        schema.sections.forEach(sectionSchema => {
          const existingSection = document.getElementById(sectionSchema.id);
          if (existingSection) {
            // Update existing section
            this.loadSection(sectionSchema, existingSection.parentElement as HTMLElement);
          } else {
            // Create new section
            this.loadSection(sectionSchema, mainContent as HTMLElement);
          }
        });
      }

      console.log('Page content updated successfully');
    } catch (error) {
      console.error('Error updating page content:', error);
      throw error;
    }
  }
}