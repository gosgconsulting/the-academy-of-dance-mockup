import { supabase } from '../../../src/integrations/supabase/client';
import type { 
  AIAgentContext, 
  AIAgentMessage, 
  AIAgentAction, 
  Suggestion,
  ElementContext 
} from '../types/ai-agent-types';

export interface AIServiceRequest {
  prompt: string;
  context: AIAgentContext;
  selectedElements?: ElementContext[];
  mode: 'chat' | 'edit' | 'analyze' | 'generate';
}

export interface AIServiceResponse {
  message: string;
  actions?: AIAgentAction[];
  suggestions?: Suggestion[];
  code?: string;
  success: boolean;
  error?: string;
}

export class AIService {
  private static instance: AIService;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Send a request to the AI agent
   */
  async sendRequest(request: AIServiceRequest): Promise<AIServiceResponse> {
    try {
      console.log('Sending AI request:', request);

      const response = await supabase.functions.invoke('ai-agent-processor', {
        body: {
          prompt: request.prompt,
          context: this.sanitizeContext(request.context),
          selectedElements: request.selectedElements || [],
          mode: request.mode,
          capabilities: this.getCapabilities()
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as AIServiceResponse;
    } catch (error) {
      console.error('AI Service error:', error);
      return {
        message: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Analyze element and provide suggestions
   */
  async analyzeElement(element: ElementContext): Promise<Suggestion[]> {
    const request: AIServiceRequest = {
      prompt: `Analyze this element and provide improvement suggestions: ${element.element.tagName}`,
      context: {
        pageStructure: { elements: [], styles: [], frameworks: [], components: [], accessibility: { issues: [], score: 100, improvements: [] } },
        selectedElements: [element],
        frameworks: [],
        designPatterns: [],
        history: []
      },
      selectedElements: [element],
      mode: 'analyze'
    };

    const response = await this.sendRequest(request);
    return response.suggestions || [];
  }

  /**
   * Generate code based on prompt
   */
  async generateCode(prompt: string, context: AIAgentContext): Promise<{ code: string; suggestions: Suggestion[] }> {
    const request: AIServiceRequest = {
      prompt,
      context,
      mode: 'generate'
    };

    const response = await this.sendRequest(request);
    return {
      code: response.code || '',
      suggestions: response.suggestions || []
    };
  }

  /**
   * Edit selected elements with AI
   */
  async editElements(
    prompt: string, 
    elements: ElementContext[], 
    context: AIAgentContext
  ): Promise<AIAgentAction[]> {
    const request: AIServiceRequest = {
      prompt,
      context,
      selectedElements: elements,
      mode: 'edit'
    };

    const response = await this.sendRequest(request);
    return response.actions || [];
  }

  /**
   * Chat with AI about the page
   */
  async chat(prompt: string, context: AIAgentContext): Promise<AIServiceResponse> {
    const request: AIServiceRequest = {
      prompt,
      context,
      mode: 'chat'
    };

    return this.sendRequest(request);
  }

  /**
   * Get AI capabilities
   */
  private getCapabilities() {
    return {
      canAnalyze: true,
      canEdit: true,
      canGenerate: true,
      canOptimize: true,
      canSuggest: true,
      frameworks: ['react', 'tailwind', 'bootstrap'],
      languages: ['html', 'css', 'javascript', 'typescript']
    };
  }

  /**
   * Sanitize context to remove circular references and large objects
   */
  private sanitizeContext(context: AIAgentContext): any {
    return {
      pageStructure: {
        frameworks: context.pageStructure.frameworks,
        accessibility: {
          score: context.pageStructure.accessibility.score,
          issues: context.pageStructure.accessibility.issues.slice(0, 5) // Limit issues
        }
      },
      selectedElements: context.selectedElements.map(el => ({
        element: {
          id: el.element.id,
          tagName: el.element.tagName,
          selector: el.element.selector,
          attributes: el.element.attributes,
          styles: el.element.styles,
          textContent: el.element.textContent
        },
        capabilities: el.capabilities,
        relationships: el.relationships
      })),
      frameworks: context.frameworks,
      designPatterns: context.designPatterns,
      historyCount: context.history.length
    };
  }

  /**
   * Process AI response and apply changes to DOM
   */
  async applyChanges(actions: AIAgentAction[]): Promise<void> {
    for (const action of actions) {
      try {
        await this.executeAction(action);
      } catch (error) {
        console.error('Error applying action:', action.id, error);
      }
    }
  }

  /**
   * Execute a single AI action
   */
  private async executeAction(action: AIAgentAction): Promise<void> {
    switch (action.type) {
      case 'edit':
        this.executeEditAction(action);
        break;
      case 'create':
        this.executeCreateAction(action);
        break;
      case 'delete':
        this.executeDeleteAction(action);
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }
  }

  /**
   * Execute edit action
   */
  private executeEditAction(action: AIAgentAction): void {
    action.changes.forEach(change => {
      const element = document.querySelector(`[data-element-id="${change.element}"]`) as HTMLElement;
      if (element) {
        if (change.property === 'textContent') {
          element.textContent = change.newValue;
        } else if (change.property.startsWith('style.')) {
          const styleProp = change.property.replace('style.', '');
          element.style.setProperty(styleProp, change.newValue);
        } else if (change.property.startsWith('attr.')) {
          const attrName = change.property.replace('attr.', '');
          element.setAttribute(attrName, change.newValue);
        }
      }
    });
  }

  /**
   * Execute create action
   */
  private executeCreateAction(action: AIAgentAction): void {
    // Implementation for creating new elements
    console.log('Creating elements:', action);
  }

  /**
   * Execute delete action
   */
  private executeDeleteAction(action: AIAgentAction): void {
    action.elements.forEach(elementId => {
      const element = document.querySelector(`[data-element-id="${elementId}"]`);
      if (element) {
        element.remove();
      }
    });
  }
}