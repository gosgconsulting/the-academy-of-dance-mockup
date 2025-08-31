import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Minimize2, Maximize2, X, Code, Wand2, Settings, Lightbulb } from 'lucide-react';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { ScrollArea } from '../../../src/components/ui/scroll-area';
import { useToast } from '../../../src/components/ui/use-toast';
import { useSpartiBuilder } from '../../components/SpartiBuilderProvider';
import { ContextEngine } from '../core/context-engine';
import { AIService } from '../services/ai-service';
import { MonacoEditor } from './MonacoEditor';
import type { AIAgentMessage, AIAgentContext, AIAgentConfig } from '../types/ai-agent-types';

interface AIAgentInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAgentInterface: React.FC<AIAgentInterfaceProps> = ({ isOpen, onClose }) => {
  const { selectedElement } = useSpartiBuilder();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<AIAgentMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [context, setContext] = useState<AIAgentContext | null>(null);
  const [mode, setMode] = useState<'chat' | 'code' | 'analyze'>('chat');
  const [config, setConfig] = useState<AIAgentConfig>({
    maxContextElements: 10,
    enableFrameworkDetection: true,
    enableAccessibilityAnalysis: true,
    enableDesignPatterns: true,
    enableCodeGeneration: true,
    enableMonacoEditor: true
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contextEngine = ContextEngine.getInstance();
  const aiService = AIService.getInstance();

  useEffect(() => {
    if (isOpen) {
      initializeContext();
      addSystemMessage('AI Agent is ready! I can help you analyze, edit, and improve your page elements.');
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedElement) {
      addSystemMessage(`Selected element: ${selectedElement.data.tagName}. Ask me to analyze or modify it!`);
    }
  }, [selectedElement]);

  const initializeContext = async () => {
    try {
      const pageContext = await contextEngine.buildPageContext();
      setContext(pageContext);
      
      if (pageContext.frameworks.length > 0) {
        addSystemMessage(`Detected frameworks: ${pageContext.frameworks.map(f => f.name).join(', ')}`);
      }
      
      if (pageContext.pageStructure.accessibility.score < 80) {
        addSystemMessage(`Accessibility score: ${pageContext.pageStructure.accessibility.score}/100. I can help improve it!`);
      }
    } catch (error) {
      console.error('Error initializing context:', error);
      toast({
        title: "Context Error",
        description: "Failed to analyze page context",
        variant: "destructive"
      });
    }
  };

  const addSystemMessage = (content: string) => {
    const message: AIAgentMessage = {
      id: Date.now().toString(),
      type: 'system',
      content,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !context) return;

    const userMessage: AIAgentMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.chat(input, context);
      
      const aiMessage: AIAgentMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.message,
        timestamp: Date.now(),
        suggestions: response.suggestions,
        code: response.code
      };

      setMessages(prev => [...prev, aiMessage]);

      if (response.actions && response.actions.length > 0) {
        await aiService.applyChanges(response.actions);
        toast({
          title: "Changes Applied",
          description: `Applied ${response.actions.length} change(s) to the page`
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickAction = async (action: string) => {
    if (!selectedElement) {
      toast({
        title: "No Element Selected",
        description: "Please select an element first",
        variant: "destructive"
      });
      return;
    }

    setInput(action);
    await sendMessage();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed left-4 bottom-4 bg-background border rounded-lg shadow-lg transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">AI Agent</span>
          {selectedElement && (
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
              {selectedElement.data.tagName}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {/* Mode Selector */}
          <div className="flex bg-background rounded-md p-1">
            <Button
              variant={mode === 'chat' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('chat')}
            >
              <Bot className="w-3 h-3" />
            </Button>
            <Button
              variant={mode === 'code' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('code')}
            >
              <Code className="w-3 h-3" />
            </Button>
            <Button
              variant={mode === 'analyze' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('analyze')}
            >
              <Wand2 className="w-3 h-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Content Area */}
          <div className="flex-1 flex flex-col h-[calc(100%-120px)]">
            {mode === 'chat' && (
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.type === 'ai'
                          ? 'bg-muted'
                          : 'bg-accent text-accent-foreground text-xs'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <div className="text-xs font-medium flex items-center gap-1">
                              <Lightbulb className="w-3 h-3" />
                              Suggestions:
                            </div>
                            {message.suggestions.map((suggestion, index) => (
                              <div key={index} className="text-xs p-2 bg-background/50 rounded border">
                                <div className="font-medium">{suggestion.title}</div>
                                <div className="text-muted-foreground">{suggestion.description}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {message.code && (
                          <div className="mt-3">
                            <div className="text-xs font-medium mb-1">Generated Code:</div>
                            <pre className="text-xs bg-background/50 p-2 rounded border overflow-x-auto">
                              <code>{message.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            )}
            
            {mode === 'code' && config.enableMonacoEditor && (
              <div className="flex-1">
                <MonacoEditor context={context} />
              </div>
            )}
            
            {mode === 'analyze' && context && (
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h3 className="font-medium mb-2">Page Analysis</h3>
                    <div className="text-sm space-y-1">
                      <div>Elements: {context.pageStructure.elements.length}</div>
                      <div>Frameworks: {context.frameworks.map(f => f.name).join(', ') || 'None detected'}</div>
                      <div>A11y Score: {context.pageStructure.accessibility.score}/100</div>
                      <div>Design Patterns: {context.designPatterns.length}</div>
                    </div>
                  </div>
                  
                  {context.pageStructure.accessibility.issues.length > 0 && (
                    <div className="border rounded-lg p-3">
                      <h3 className="font-medium mb-2">Accessibility Issues</h3>
                      <div className="space-y-2">
                        {context.pageStructure.accessibility.issues.slice(0, 5).map((issue, index) => (
                          <div key={index} className="text-sm p-2 bg-destructive/10 rounded">
                            <div className="font-medium text-destructive">{issue.rule}</div>
                            <div className="text-muted-foreground">{issue.message}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Quick Actions */}
          {selectedElement && mode === 'chat' && (
            <div className="px-3 py-2 border-t bg-muted/30">
              <div className="flex gap-1 text-xs">
                <Button size="sm" variant="outline" onClick={() => handleQuickAction('Analyze this element and suggest improvements')}>
                  Analyze
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleQuickAction('Make this element more accessible')}>
                  A11y
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleQuickAction('Improve the visual design of this element')}>
                  Design
                </Button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about your page or selected element..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};