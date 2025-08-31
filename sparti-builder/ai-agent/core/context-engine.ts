import { UniversalElementDetector } from '../../core/universal-detector';
import type { 
  AIAgentContext, 
  PageStructure, 
  ElementNode, 
  ElementContext,
  DetectedFramework,
  DesignPattern,
  AccessibilityReport,
  A11yIssue,
  Suggestion
} from '../types/ai-agent-types';

export class ContextEngine {
  private static instance: ContextEngine;
  private pageStructure: PageStructure | null = null;
  private observers: MutationObserver[] = [];

  static getInstance(): ContextEngine {
    if (!ContextEngine.instance) {
      ContextEngine.instance = new ContextEngine();
    }
    return ContextEngine.instance;
  }

  /**
   * Analyze the entire page and build comprehensive context
   */
  async buildPageContext(): Promise<AIAgentContext> {
    console.log('Building page context...');
    
    const pageStructure = await this.analyzePageStructure();
    const selectedElements = this.getSelectedElementsContext();
    const frameworks = this.detectFrameworks();
    const designPatterns = this.analyzeDesignPatterns();
    
    return {
      pageStructure,
      selectedElements,
      frameworks,
      designPatterns,
      history: []
    };
  }

  /**
   * Analyze page structure and extract all relevant elements
   */
  private async analyzePageStructure(): Promise<PageStructure> {
    const elements = this.buildElementTree(document.body);
    const styles = this.extractStylesheets();
    const frameworks = this.detectFrameworks().map(f => f.name);
    const components = this.identifyComponents();
    const accessibility = await this.analyzeAccessibility();

    this.pageStructure = {
      elements,
      styles,
      frameworks,
      components,
      accessibility
    };

    return this.pageStructure;
  }

  /**
   * Build a tree structure of all DOM elements
   */
  private buildElementTree(rootElement: HTMLElement, parent?: ElementNode): ElementNode[] {
    const nodes: ElementNode[] = [];
    
    for (const child of Array.from(rootElement.children) as HTMLElement[]) {
      if (this.shouldIncludeElement(child)) {
        const node = this.createElementNode(child, parent);
        node.children = this.buildElementTree(child, node);
        nodes.push(node);
      }
    }
    
    return nodes;
  }

  /**
   * Create an ElementNode from HTMLElement
   */
  private createElementNode(element: HTMLElement, parent?: ElementNode): ElementNode {
    const computedStyles = window.getComputedStyle(element);
    const styles: Record<string, string> = {};
    
    // Extract relevant computed styles
    const relevantProps = [
      'display', 'position', 'width', 'height', 'margin', 'padding',
      'color', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight',
      'textAlign', 'border', 'borderRadius', 'boxShadow', 'transform',
      'opacity', 'zIndex', 'flexDirection', 'justifyContent', 'alignItems'
    ];
    
    relevantProps.forEach(prop => {
      const value = computedStyles.getPropertyValue(prop);
      if (value && value !== 'initial' && value !== 'normal') {
        styles[prop] = value;
      }
    });

    return {
      id: this.generateElementId(element),
      tagName: element.tagName.toLowerCase(),
      selector: this.generateSelector(element),
      attributes: this.getElementAttributes(element),
      styles,
      children: [],
      parent,
      textContent: element.textContent?.trim() || undefined,
      element
    };
  }

  /**
   * Generate unique ID for element
   */
  private generateElementId(element: HTMLElement): string {
    if (element.id) return element.id;
    
    // Generate based on path and content
    const path = this.getElementPath(element);
    const content = element.textContent?.trim().substring(0, 20) || '';
    return `el-${btoa(path + content).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12)}`;
  }

  /**
   * Generate CSS selector for element
   */
  private generateSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    
    const path: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.className) {
        const classes = current.className.split(' ').filter(c => c.trim());
        if (classes.length > 0) {
          selector += '.' + classes.slice(0, 2).join('.');
        }
      }
      
      path.unshift(selector);
      current = current.parentElement;
    }
    
    return path.join(' > ');
  }

  /**
   * Get element path for ID generation
   */
  private getElementPath(element: HTMLElement): string {
    const path: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      const index = Array.from(current.parentElement?.children || []).indexOf(current);
      path.unshift(`${current.tagName.toLowerCase()}[${index}]`);
      current = current.parentElement;
    }
    
    return path.join('/');
  }

  /**
   * Extract element attributes
   */
  private getElementAttributes(element: HTMLElement): Record<string, string> {
    const attributes: Record<string, string> = {};
    
    for (const attr of Array.from(element.attributes)) {
      attributes[attr.name] = attr.value;
    }
    
    return attributes;
  }

  /**
   * Check if element should be included in analysis
   */
  private shouldIncludeElement(element: HTMLElement): boolean {
    // Skip script, style, and other non-visual elements
    const skipTags = ['script', 'style', 'link', 'meta', 'title'];
    if (skipTags.includes(element.tagName.toLowerCase())) return false;
    
    // Skip hidden elements
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
      return false;
    }
    
    return true;
  }

  /**
   * Extract all stylesheets from the page
   */
  private extractStylesheets(): CSSStyleSheet[] {
    const sheets: CSSStyleSheet[] = [];
    
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        if (sheet.cssRules) {
          sheets.push(sheet);
        }
      } catch (e) {
        // Cross-origin stylesheets might not be accessible
        console.warn('Cannot access stylesheet:', sheet.href);
      }
    }
    
    return sheets;
  }

  /**
   * Detect CSS frameworks in use
   */
  private detectFrameworks(): DetectedFramework[] {
    const frameworks: DetectedFramework[] = [];
    
    // Detect Tailwind CSS
    if (this.detectTailwindCSS()) {
      frameworks.push({
        name: 'Tailwind CSS',
        classes: this.extractTailwindClasses(),
        utilities: this.getTailwindUtilities(),
        components: []
      });
    }
    
    // Detect Bootstrap
    if (this.detectBootstrap()) {
      frameworks.push({
        name: 'Bootstrap',
        classes: this.extractBootstrapClasses(),
        utilities: this.getBootstrapUtilities(),
        components: this.getBootstrapComponents()
      });
    }
    
    return frameworks;
  }

  /**
   * Detect Tailwind CSS
   */
  private detectTailwindCSS(): boolean {
    // Check for common Tailwind classes
    const tailwindClasses = ['flex', 'grid', 'text-', 'bg-', 'p-', 'm-', 'w-', 'h-'];
    const allClasses = this.getAllClassesInDOM();
    
    return tailwindClasses.some(prefix => 
      allClasses.some(cls => cls.startsWith(prefix))
    );
  }

  /**
   * Detect Bootstrap
   */
  private detectBootstrap(): boolean {
    const bootstrapClasses = ['container', 'row', 'col-', 'btn', 'card', 'navbar'];
    const allClasses = this.getAllClassesInDOM();
    
    return bootstrapClasses.some(cls => allClasses.includes(cls) || 
      allClasses.some(c => c.startsWith(cls))
    );
  }

  /**
   * Get all CSS classes used in the DOM
   */
  private getAllClassesInDOM(): string[] {
    const classes = new Set<string>();
    const elements = document.querySelectorAll('*');
    
    elements.forEach(element => {
      if (element.className && typeof element.className === 'string') {
        element.className.split(' ').forEach(cls => {
          if (cls.trim()) classes.add(cls.trim());
        });
      }
    });
    
    return Array.from(classes);
  }

  /**
   * Extract Tailwind classes from DOM
   */
  private extractTailwindClasses(): string[] {
    const allClasses = this.getAllClassesInDOM();
    const tailwindPattern = /^(flex|grid|text-|bg-|p-|m-|w-|h-|border-|rounded-|shadow-|hover:|focus:|md:|lg:|xl:)/;
    
    return allClasses.filter(cls => tailwindPattern.test(cls));
  }

  /**
   * Extract Bootstrap classes from DOM
   */
  private extractBootstrapClasses(): string[] {
    const allClasses = this.getAllClassesInDOM();
    const bootstrapPattern = /^(container|row|col-|btn|card|navbar|alert|badge|breadcrumb|dropdown|modal|nav|pagination|progress|spinner|toast)/;
    
    return allClasses.filter(cls => bootstrapPattern.test(cls));
  }

  /**
   * Get Tailwind utilities
   */
  private getTailwindUtilities() {
    return [
      { category: 'Layout', classes: ['flex', 'grid', 'block', 'inline'], description: 'Display utilities' },
      { category: 'Spacing', classes: ['p-', 'm-', 'px-', 'py-'], description: 'Padding and margin utilities' },
      { category: 'Colors', classes: ['text-', 'bg-', 'border-'], description: 'Color utilities' },
      { category: 'Typography', classes: ['text-', 'font-', 'leading-'], description: 'Text utilities' }
    ];
  }

  /**
   * Get Bootstrap utilities
   */
  private getBootstrapUtilities() {
    return [
      { category: 'Layout', classes: ['container', 'row', 'col-'], description: 'Grid system' },
      { category: 'Components', classes: ['btn', 'card', 'navbar'], description: 'UI components' },
      { category: 'Utilities', classes: ['text-', 'bg-', 'd-'], description: 'Utility classes' }
    ];
  }

  /**
   * Get Bootstrap components
   */
  private getBootstrapComponents(): string[] {
    return ['alert', 'badge', 'breadcrumb', 'button', 'card', 'carousel', 'dropdown', 'modal', 'navbar', 'nav', 'pagination'];
  }

  /**
   * Identify custom components in the page
   */
  private identifyComponents() {
    // This would identify React components, custom elements, etc.
    // For now, return empty array
    return [];
  }

  /**
   * Analyze page accessibility
   */
  private async analyzeAccessibility(): Promise<AccessibilityReport> {
    const issues: A11yIssue[] = [];
    const improvements: Suggestion[] = [];
    
    // Check for missing alt attributes on images
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img, index) => {
      issues.push({
        type: 'error',
        rule: 'img-alt',
        message: 'Image missing alt attribute',
        element: this.generateElementId(img as HTMLElement),
        fix: 'Add alt attribute describing the image content'
      });
    });
    
    // Check for missing form labels
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
        issues.push({
          type: 'error',
          rule: 'label-associated',
          message: 'Form input missing associated label',
          element: this.generateElementId(input as HTMLElement),
          fix: 'Add a label element or aria-label attribute'
        });
      }
    });
    
    // Calculate accessibility score
    const totalElements = document.querySelectorAll('img, input, button, a').length;
    const score = totalElements > 0 ? Math.max(0, 100 - (issues.length / totalElements) * 100) : 100;
    
    return {
      issues,
      score: Math.round(score),
      improvements
    };
  }

  /**
   * Analyze design patterns in the page
   */
  private analyzeDesignPatterns(): DesignPattern[] {
    const patterns: DesignPattern[] = [];
    
    // Detect navigation patterns
    const navs = document.querySelectorAll('nav, .navbar, .navigation');
    if (navs.length > 0) {
      patterns.push({
        type: 'component',
        name: 'Navigation',
        elements: Array.from(navs).map(nav => this.generateElementId(nav as HTMLElement)),
        properties: { type: 'navigation', count: navs.length },
        confidence: 0.9
      });
    }
    
    // Detect card patterns
    const cards = document.querySelectorAll('.card, .product-card, [class*="card"]');
    if (cards.length > 0) {
      patterns.push({
        type: 'component',
        name: 'Card Layout',
        elements: Array.from(cards).map(card => this.generateElementId(card as HTMLElement)),
        properties: { type: 'card', count: cards.length },
        confidence: 0.8
      });
    }
    
    // Detect grid patterns
    const grids = document.querySelectorAll('.grid, [style*="display: grid"], [class*="grid"]');
    if (grids.length > 0) {
      patterns.push({
        type: 'layout',
        name: 'Grid Layout',
        elements: Array.from(grids).map(grid => this.generateElementId(grid as HTMLElement)),
        properties: { type: 'grid', count: grids.length },
        confidence: 0.85
      });
    }
    
    return patterns;
  }

  /**
   * Get context for currently selected elements
   */
  private getSelectedElementsContext(): ElementContext[] {
    // This would return context for selected elements
    // For now, return empty array
    return [];
  }

  /**
   * Start observing DOM changes
   */
  startObserving(): void {
    const observer = new MutationObserver((mutations) => {
      let shouldRebuild = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          shouldRebuild = true;
        }
      });
      
      if (shouldRebuild) {
        // Debounce rebuild
        setTimeout(() => this.buildPageContext(), 500);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true
    });
    
    this.observers.push(observer);
  }

  /**
   * Stop observing DOM changes
   */
  stopObserving(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Get current page structure
   */
  getPageStructure(): PageStructure | null {
    return this.pageStructure;
  }
}