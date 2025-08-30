import { SpartiElement } from '../types';

export interface ReactComponentData {
  imports: string[];
  content: string;
  exportLine: string;
}

export class ReactCodeGenerator {
  private static sanitizeContent(content: string): string {
    // Escape quotes and handle JSX content properly
    return content
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n');
  }

  private static extractAttributes(element: HTMLElement): Record<string, string> {
    const attrs: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (!attr.name.startsWith('data-sparti')) {
        attrs[attr.name] = attr.value;
      }
    }
    return attrs;
  }

  private static generateAttributesString(attributes: Record<string, string>): string {
    return Object.entries(attributes)
      .map(([key, value]) => {
        if (key === 'className') {
          return `className="${value}"`;
        }
        return `${key}="${value}"`;
      })
      .join(' ');
  }

  static generateComponentCode(
    originalContent: string,
    modifications: Map<string, any>
  ): ReactComponentData {
    let updatedContent = originalContent;
    const imports = new Set<string>();
    
    // Extract existing imports from original content
    const importMatches = originalContent.match(/import.*from.*['"]/g);
    if (importMatches) {
      importMatches.forEach(imp => imports.add(imp));
    }

    // Process each modification
    modifications.forEach((modification, elementId) => {
      const { type, content, element, styles, attributes } = modification;

      switch (type) {
        case 'text':
          // Update text content in JSX
          updatedContent = this.updateTextContent(updatedContent, elementId, content);
          break;

        case 'image':
          // Update image src and alt attributes
          updatedContent = this.updateImageContent(updatedContent, elementId, content, attributes);
          break;

        case 'slider':
          // Update slider images array
          updatedContent = this.updateSliderContent(updatedContent, elementId, content);
          break;

        case 'style':
          // Update className or inline styles
          updatedContent = this.updateStyleContent(updatedContent, elementId, styles);
          break;
      }
    });

    // Extract component name and export
    const componentNameMatch = originalContent.match(/(?:const|function)\s+(\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Component';
    const exportLine = `export default ${componentName};`;

    return {
      imports: Array.from(imports),
      content: updatedContent,
      exportLine
    };
  }

  private static updateTextContent(content: string, elementId: string, newText: string): string {
    // Find text content within JSX elements that have the matching data-sparti-component
    const pattern = new RegExp(
      `(<[^>]*data-sparti-component="${elementId}"[^>]*>)(.*?)(<\/[^>]*>)`,
      'gs'
    );
    
    return content.replace(pattern, (match, openTag, oldContent, closeTag) => {
      // Check if it's a simple text node or has nested JSX
      if (oldContent.includes('<')) {
        // Has nested JSX, try to replace just the text parts
        return `${openTag}${newText}${closeTag}`;
      } else {
        // Simple text content
        return `${openTag}${newText}${closeTag}`;
      }
    });
  }

  private static updateImageContent(
    content: string, 
    elementId: string, 
    newSrc: string, 
    attributes?: Record<string, string>
  ): string {
    const pattern = new RegExp(
      `(<img[^>]*data-sparti-component="${elementId}"[^>]*)(src="[^"]*")([^>]*>)`,
      'g'
    );
    
    return content.replace(pattern, (match, prefix, oldSrc, suffix) => {
      let newAttributes = `src="${newSrc}"`;
      
      if (attributes?.alt) {
        const altPattern = /alt="[^"]*"/;
        if (suffix.includes('alt=')) {
          suffix = suffix.replace(altPattern, `alt="${attributes.alt}"`);
        } else {
          newAttributes += ` alt="${attributes.alt}"`;
        }
      }
      
      return `${prefix}${newAttributes}${suffix}`;
    });
  }

  private static updateSliderContent(content: string, elementId: string, images: any[]): string {
    // Find the heroImages array definition
    const arrayPattern = /const\s+heroImages\s*=\s*\[(.*?)\];/gs;
    
    return content.replace(arrayPattern, () => {
      const imageStrings = images.map(img => `    '${img.src}'`).join(',\n');
      return `const heroImages = [
${imageStrings}
  ];`;
    });
  }

  private static updateStyleContent(content: string, elementId: string, styles: Record<string, string>): string {
    // This is more complex - would need to update className or style attributes
    // For now, we'll focus on className updates
    const pattern = new RegExp(
      `(<[^>]*data-sparti-component="${elementId}"[^>]*className=")([^"]*)("[^>]*>)`,
      'g'
    );
    
    return content.replace(pattern, (match, prefix, oldClassName, suffix) => {
      // Merge or update className based on styles
      // This is a simplified version - in practice, you'd need more sophisticated class management
      return `${prefix}${oldClassName}${suffix}`;
    });
  }

  static generateBackupContent(originalContent: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `/*
 * BACKUP CREATED: ${timestamp}
 * Original file content preserved below
 */

${originalContent}`;
  }
}