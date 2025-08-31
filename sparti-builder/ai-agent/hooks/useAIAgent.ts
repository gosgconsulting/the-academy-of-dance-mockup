import { useState, useEffect, useCallback } from 'react';
import { ContextEngine } from '../core/context-engine';
import { AIService } from '../services/ai-service';
import type { 
  AIAgentContext, 
  AIAgentMessage, 
  AIAgentConfig,
  ElementContext,
  Suggestion
} from '../types/ai-agent-types';

export interface UseAIAgentOptions {
  autoAnalyze?: boolean;
  enableObserver?: boolean;
  config?: Partial<AIAgentConfig>;
}

export const useAIAgent = (options: UseAIAgentOptions = {}) => {
  const [context, setContext] = useState<AIAgentContext | null>(null);
  const [messages, setMessages] = useState<AIAgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  
  const contextEngine = ContextEngine.getInstance();
  const aiService = AIService.getInstance();
  
  const config: AIAgentConfig = {
    maxContextElements: 10,
    enableFrameworkDetection: true,
    enableAccessibilityAnalysis: true,
    enableDesignPatterns: true,
    enableCodeGeneration: true,
    enableMonacoEditor: true,
    ...options.config
  };

  // Initialize context on mount
  useEffect(() => {
    if (options.autoAnalyze !== false) {
      initializeContext();
    }
    
    if (options.enableObserver !== false) {
      contextEngine.startObserving();
      return () => contextEngine.stopObserving();
    }
  }, []);

  /**
   * Initialize AI agent context
   */
  const initializeContext = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const pageContext = await contextEngine.buildPageContext();
      setContext(pageContext);
      
      // Add system message about initialization
      const systemMessage: AIAgentMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: `AI Agent initialized. Found ${pageContext.pageStructure.elements.length} elements, ${pageContext.frameworks.length} frameworks, and ${pageContext.designPatterns.length} design patterns.`,
        timestamp: Date.now(),
        context: pageContext
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
    } catch (error) {
      console.error('Error initializing AI agent context:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  /**
   * Send message to AI agent
   */
  const sendMessage = useCallback(async (content: string, mode: 'chat' | 'edit' | 'analyze' | 'generate' = 'chat') => {
    if (!context || isLoading) return null;

    const userMessage: AIAgentMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await aiService.sendRequest({
        prompt: content,
        context,
        mode
      });

      const aiMessage: AIAgentMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.message,
        timestamp: Date.now(),
        suggestions: response.suggestions,
        code: response.code
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }

      if (response.actions) {
        await aiService.applyChanges(response.actions);
      }

      return response;
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: AIAgentMessage = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      return null;
      
    } finally {
      setIsLoading(false);
    }
  }, [context, isLoading, aiService]);

  /**
   * Analyze specific element
   */
  const analyzeElement = useCallback(async (element: ElementContext) => {
    if (!context) return [];

    setIsLoading(true);
    try {
      const suggestions = await aiService.analyzeElement(element);
      setSuggestions(suggestions);
      
      const analysisMessage: AIAgentMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Analyzed ${element.element.tagName} element. Found ${suggestions.length} suggestions.`,
        timestamp: Date.now(),
        suggestions
      };
      
      setMessages(prev => [...prev, analysisMessage]);
      return suggestions;
      
    } catch (error) {
      console.error('Error analyzing element:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [context, aiService]);

  /**
   * Generate code from prompt
   */
  const generateCode = useCallback(async (prompt: string) => {
    if (!context) return null;

    setIsLoading(true);
    try {
      const result = await aiService.generateCode(prompt, context);
      
      const codeMessage: AIAgentMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Generated code based on your request:',
        timestamp: Date.now(),
        code: result.code,
        suggestions: result.suggestions
      };
      
      setMessages(prev => [...prev, codeMessage]);
      return result;
      
    } catch (error) {
      console.error('Error generating code:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [context, aiService]);

  /**
   * Edit elements with AI
   */
  const editElements = useCallback(async (prompt: string, elements: ElementContext[]) => {
    if (!context) return [];

    setIsLoading(true);
    try {
      const actions = await aiService.editElements(prompt, elements, context);
      
      const editMessage: AIAgentMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Applied ${actions.length} changes to ${elements.length} element(s).`,
        timestamp: Date.now(),
        actions
      };
      
      setMessages(prev => [...prev, editMessage]);
      return actions;
      
    } catch (error) {
      console.error('Error editing elements:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [context, aiService]);

  /**
   * Clear conversation
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setSuggestions([]);
  }, []);

  /**
   * Refresh context
   */
  const refreshContext = useCallback(async () => {
    await initializeContext();
  }, [initializeContext]);

  /**
   * Get element context by selector
   */
  const getElementContext = useCallback((selector: string): ElementContext | null => {
    if (!context) return null;

    const findElement = (elements: any[]): any => {
      for (const element of elements) {
        if (element.selector === selector) return element;
        const found = findElement(element.children || []);
        if (found) return found;
      }
      return null;
    };

    const element = findElement(context.pageStructure.elements);
    if (!element) return null;

    return {
      element,
      relationships: [],
      capabilities: [],
      suggestions: []
    };
  }, [context]);

  return {
    // State
    context,
    messages,
    isLoading,
    isAnalyzing,
    suggestions,
    config,
    
    // Actions
    sendMessage,
    analyzeElement,
    generateCode,
    editElements,
    clearMessages,
    refreshContext,
    getElementContext,
    initializeContext
  };
};