// AI Agent Module - Advanced AI-powered editing and analysis for Sparti Builder

// Core AI Agent
export { useAIAgent } from './hooks/useAIAgent';
export { ContextEngine } from './core/context-engine';
export { AIService } from './services/ai-service';

// Components
export { AIAgentInterface } from './components/AIAgentInterface';
export { MonacoEditor } from './components/MonacoEditor';

// Types
export type {
  AIAgentContext,
  AIAgentMessage,
  AIAgentConfig,
  AIAgentAction,
  ElementContext,
  ElementNode,
  PageStructure,
  DetectedFramework,
  DesignPattern,
  Suggestion,
  AIAgentCapabilities
} from './types/ai-agent-types';

// Re-export for backwards compatibility
export { AIElementEditor } from '../components/AIElementEditor';