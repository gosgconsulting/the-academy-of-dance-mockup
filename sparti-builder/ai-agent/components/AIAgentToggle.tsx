import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '../../../src/components/ui/button';

interface AIAgentToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AIAgentToggle: React.FC<AIAgentToggleProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null; // Hide toggle when AI Agent is open

  return (
    <Button
      onClick={onClick}
      className="fixed left-4 bottom-4 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 z-[9999]"
      title="Open AI Agent"
    >
      <Bot className="w-5 h-5" />
    </Button>
  );
};