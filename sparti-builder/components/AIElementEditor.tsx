import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Send, Sparkles, X, Undo, Code, Eye } from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';
import { useSpartiEditor } from '../hooks/useSpartiEditor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  changes?: {
    content?: string;
    styles?: Record<string, string>;
    attributes?: Record<string, string>;
    explanation?: string;
  };
}

export const AIElementEditor: React.FC = () => {
  const { selectedElement, isEditing } = useSpartiBuilder();
  const { updateContent, updateStyles, updateAttribute } = useSpartiEditor();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedElement && !isOpen) {
      setIsOpen(true);
      setMessages([{
        id: Date.now().toString(),
        type: 'system',
        content: `Selected: ${selectedElement.element.tagName} element. What would you like to change?`,
        timestamp: new Date()
      }]);
    }
  }, [selectedElement]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getElementContext = () => {
    if (!selectedElement) return {};
    
    const element = selectedElement.element;
    return {
      tagName: element.tagName,
      content: element.textContent || element.innerHTML,
      styles: {
        className: element.className,
        computedStyles: window.getComputedStyle(element)
      },
      attributes: Array.from(element.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {} as Record<string, string>)
    };
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !selectedElement || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-element-editor', {
        body: {
          prompt: userMessage.content,
          elementContext: getElementContext(),
          elementType: selectedElement.element.tagName
        }
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.explanation || 'Changes applied successfully!',
        timestamp: new Date(),
        changes: data
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Apply changes if they exist
      if (data && !data.error) {
        if (data.content) {
          updateContent(selectedElement, data.content);
        }
        if (data.styles) {
          updateStyles(selectedElement, data.styles);
        }
        if (data.attributes) {
          Object.entries(data.attributes).forEach(([key, value]) => {
            updateAttribute(selectedElement, key, value as string);
          });
        }
        
        toast({
          title: "Element Updated",
          description: data.explanation || "AI changes applied successfully",
        });
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('AI Element Editor Error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `Error: ${error.message}. Please try again with a different request.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to apply AI changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (!isEditing || !selectedElement) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-96 h-[500px]'
    }`}>
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="h-full flex flex-col shadow-xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">AI Element Editor</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {selectedElement && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Code className="h-3 w-3 mr-1" />
                  {selectedElement.element.tagName.toLowerCase()}
                </Badge>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={clearChat}
                  className="h-6 text-xs px-2"
                >
                  Clear Chat
                </Button>
              </div>
            )}
          </CardHeader>
          
          <Separator />
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.type === 'ai'
                          ? 'bg-muted border'
                          : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.changes && (
                        <div className="mt-2 text-xs opacity-75">
                          <Sparkles className="h-3 w-3 inline mr-1" />
                          Changes applied
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted border rounded-lg px-3 py-2 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                      AI is thinking...
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <Separator />
            
            <div className="p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe what you want to change..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Press Enter to send • Shift+Enter for new line
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};