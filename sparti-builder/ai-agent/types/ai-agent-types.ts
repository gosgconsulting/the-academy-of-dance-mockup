// AI Agent Type Definitions
export interface AIAgentContext {
  pageStructure: PageStructure;
  selectedElements: ElementContext[];
  frameworks: DetectedFramework[];
  designPatterns: DesignPattern[];
  history: AIAgentAction[];
}

export interface PageStructure {
  elements: ElementNode[];
  styles: CSSStyleSheet[];
  frameworks: string[];
  components: ComponentDefinition[];
  accessibility: AccessibilityReport;
}

export interface ElementNode {
  id: string;
  tagName: string;
  selector: string;
  attributes: Record<string, string>;
  styles: ComputedStyles;
  children: ElementNode[];
  parent?: ElementNode;
  textContent?: string;
  element: HTMLElement;
}

export interface ElementContext {
  element: ElementNode;
  relationships: ElementRelationship[];
  capabilities: ElementCapability[];
  suggestions: Suggestion[];
}

export interface ElementRelationship {
  type: 'parent' | 'child' | 'sibling' | 'dependency';
  target: string; // element ID
  description: string;
}

export interface ElementCapability {
  type: 'style' | 'content' | 'structure' | 'attribute';
  property: string;
  currentValue: any;
  possibleValues: any[];
  constraints?: string[];
}

export interface DetectedFramework {
  name: string;
  version?: string;
  classes: string[];
  utilities: FrameworkUtility[];
  components: string[];
}

export interface FrameworkUtility {
  category: string;
  classes: string[];
  description: string;
}

export interface DesignPattern {
  type: 'layout' | 'component' | 'interaction' | 'responsive';
  name: string;
  elements: string[]; // element IDs
  properties: Record<string, any>;
  confidence: number;
}

export interface Suggestion {
  type: 'improvement' | 'fix' | 'enhancement' | 'alternative';
  title: string;
  description: string;
  code?: string;
  preview?: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
}

export interface AIAgentAction {
  id: string;
  type: 'edit' | 'create' | 'delete' | 'analyze' | 'suggest';
  timestamp: number;
  elements: string[]; // element IDs
  changes: ActionChange[];
  prompt: string;
  result: ActionResult;
}

export interface ActionChange {
  property: string;
  oldValue: any;
  newValue: any;
  element: string; // element ID
}

export interface ActionResult {
  success: boolean;
  message: string;
  suggestions?: Suggestion[];
  generatedCode?: string;
}

export interface ComputedStyles {
  [property: string]: string;
}

export interface AccessibilityReport {
  issues: A11yIssue[];
  score: number;
  improvements: Suggestion[];
}

export interface A11yIssue {
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  element: string; // element ID
  fix?: string;
}

export interface AIAgentMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: number;
  context?: AIAgentContext;
  actions?: AIAgentAction[];
  suggestions?: Suggestion[];
  code?: string;
}

export interface AIAgentConfig {
  maxContextElements: number;
  enableFrameworkDetection: boolean;
  enableAccessibilityAnalysis: boolean;
  enableDesignPatterns: boolean;
  enableCodeGeneration: boolean;
  enableMonacoEditor: boolean;
}

export interface ComponentDefinition {
  name: string;
  type: string;
  properties: Record<string, any>;
  template?: string;
  styles?: string;
  documentation?: string;
}

export interface AIAgentCapabilities {
  canAnalyze: boolean;
  canEdit: boolean;
  canGenerate: boolean;
  canOptimize: boolean;
  canSuggest: boolean;
  frameworks: string[];
  languages: string[];
}