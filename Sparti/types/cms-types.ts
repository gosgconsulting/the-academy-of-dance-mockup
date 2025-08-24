/**
 * Sparti CMS Type Definitions
 * 
 * Core TypeScript types for the Sparti CMS system
 */

// Configuration Types
export interface SpartiConfig {
  ui: {
    navigation: Record<string, string[]>;
    theme?: {
      primaryColor?: string;
      accentColor?: string;
      borderRadius?: string;
      fontFamily?: string;
    };
    modal?: {
      maxWidth?: string;
      maxHeight?: string;
      showSchemaInfo?: boolean;
      showSectionCount?: boolean;
    };
  };
  collections: Record<string, any>;
  singletons: Record<string, any>;
  database?: {
    tables?: {
      schemas?: string;
      sections?: string;
      content?: string;
      media?: string;
    };
    helpers?: {
      getCurrentTenant?: string;
      checkUserRole?: string;
      getCurrentUser?: string;
    };
  };
  fieldTypes?: Record<string, FieldTypeConfig>;
  media?: MediaConfig;
  security?: SecurityConfig;
  development?: DevelopmentConfig;
}

// Field Type Configuration
export interface FieldTypeConfig {
  component: string;
  validation: Record<string, any>;
}

// Media Configuration
export interface MediaConfig {
  uploadPath: string;
  allowedTypes: string[];
  maxFileSize: number;
  imageOptimization?: {
    enabled: boolean;
    formats: string[];
    sizes: number[];
  };
}

// Security Configuration
export interface SecurityConfig {
  requireAuth: boolean;
  adminRole: string;
  editorRole: string;
  viewerRole: string;
  sessionTimeout: number;
  csrfProtection: boolean;
}

// Development Configuration
export interface DevelopmentConfig {
  enableDebugMode: boolean;
  showSchemaIds: boolean;
  logQueries: boolean;
  mockData: boolean;
}

// Database Schema Types
export interface CMSSchema {
  id: string;
  tenant_id: string;
  schema_type: 'singleton' | 'collection';
  schema_name: string;
  schema_definition: SchemaDefinition;
  ui_config: UIConfig;
  is_active: boolean;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface CMSSchemaSection {
  id: string;
  schema_id: string;
  tenant_id: string;
  section_name: string;
  section_type: 'object' | 'array' | 'field';
  section_definition: SectionDefinition;
  display_order: number;
  is_editable: boolean;
  created_at: string;
  updated_at: string;
}

// Schema Definition Types
export interface SchemaDefinition {
  label: string;
  description: string;
  fields: Record<string, FieldDefinition>;
}

export interface SectionDefinition {
  label: string;
  description: string;
  fields: Record<string, FieldDefinition>;
}

export interface FieldDefinition {
  type: FieldType;
  label: string;
  description?: string;
  required?: boolean;
  default?: any;
  validation?: Record<string, any>;
  options?: any[]; // For select fields
}

// UI Configuration Types
export interface UIConfig {
  group: string;
  icon: string;
  order: number;
  color?: string;
  description?: string;
}

// Field Types
export type FieldType = 
  | 'text'
  | 'textarea' 
  | 'rich-text'
  | 'image'
  | 'url'
  | 'email'
  | 'phone'
  | 'date'
  | 'boolean'
  | 'select'
  | 'number';

// Content Types
export interface CMSContent {
  id: string;
  tenant_id: string;
  schema_name: string;
  section_name: string;
  content_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface SchemaResponse {
  schema: CMSSchema;
  sections: CMSSchemaSection[];
}

export interface SectionListResponse {
  sections: CMSSchemaSection[];
  total: number;
}

// Editor State Types
export interface EditorState {
  currentSchema: CMSSchema | null;
  currentSections: CMSSchemaSection[];
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
}

// Modal Props Types
export interface SchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'singleton' | 'collection';
  itemName: string;
}

export interface SectionListProps {
  sections: CMSSchemaSection[];
  onSectionEdit: (section: CMSSchemaSection) => void;
  onSectionReorder: (sections: CMSSchemaSection[]) => void;
}

// Service Types
export interface CMSServiceInterface {
  // Schema operations
  getSchema(schemaName: string): Promise<CMSSchema | null>;
  getSchemas(): Promise<CMSSchema[]>;
  createSchema(schema: Omit<CMSSchema, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>): Promise<CMSSchema>;
  updateSchema(id: string, updates: Partial<CMSSchema>): Promise<CMSSchema>;
  deleteSchema(id: string): Promise<void>;
  
  // Section operations
  getSchemaSections(schemaName: string): Promise<CMSSchemaSection[]>;
  getSection(sectionId: string): Promise<CMSSchemaSection | null>;
  createSection(section: Omit<CMSSchemaSection, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>): Promise<CMSSchemaSection>;
  updateSection(id: string, updates: Partial<CMSSchemaSection>): Promise<CMSSchemaSection>;
  deleteSection(id: string): Promise<void>;
  reorderSections(schemaId: string, sectionIds: string[]): Promise<void>;
  
  // Content operations
  getContent(schemaName: string, sectionName: string): Promise<CMSContent | null>;
  saveContent(schemaName: string, sectionName: string, content: Record<string, any>): Promise<CMSContent>;
  deleteContent(schemaName: string, sectionName: string): Promise<void>;
}

// Error Types
export interface CMSError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Validation Types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Utility Types
export type SchemaType = 'singleton' | 'collection';
export type SectionType = 'object' | 'array' | 'field';

// Navigation Types
export interface NavigationGroup {
  name: string;
  schemas: string[];
  order: number;
  icon?: string;
  color?: string;
}

export interface NavigationItem {
  schemaName: string;
  label: string;
  type: SchemaType;
  group: string;
  icon: string;
  order: number;
  isActive: boolean;
}

// Form Types for the Editor
export interface FormField {
  name: string;
  type: FieldType;
  label: string;
  value: any;
  required: boolean;
  validation: Record<string, any>;
  options?: any[];
}

export interface FormSection {
  name: string;
  label: string;
  description: string;
  fields: FormField[];
  order: number;
  isEditable: boolean;
}

// Event Types
export interface CMSEvent {
  type: 'schema_created' | 'schema_updated' | 'schema_deleted' | 
        'section_created' | 'section_updated' | 'section_deleted' |
        'content_saved' | 'content_deleted';
  payload: Record<string, any>;
  timestamp: string;
  user_id: string;
  tenant_id: string;
}

// Hook Types
export interface UseCMSSchemaResult {
  schema: CMSSchema | null;
  sections: CMSSchemaSection[];
  isLoading: boolean;
  error: CMSError | null;
  refetch: () => Promise<void>;
}

export interface UseCMSContentResult {
  content: Record<string, any>;
  isLoading: boolean;
  error: CMSError | null;
  save: (data: Record<string, any>) => Promise<void>;
  isDirty: boolean;
}

// Component Props Types
export interface AdminNavigationProps {
  groups: Record<string, NavigationItem[]>;
  onSchemaSelect: (schemaName: string, schemaType: SchemaType) => void;
  currentSchema?: string;
}

export interface SchemaEditorProps {
  schema: CMSSchema;
  sections: CMSSchemaSection[];
  onSave: (content: Record<string, any>) => Promise<void>;
  onClose: () => void;
}

// Export utility type for creating new schemas
export type CreateSchemaInput = Omit<CMSSchema, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>;
export type CreateSectionInput = Omit<CMSSchemaSection, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>;

// Export utility type for updating schemas
export type UpdateSchemaInput = Partial<Pick<CMSSchema, 'schema_definition' | 'ui_config' | 'is_active' | 'version'>>;
export type UpdateSectionInput = Partial<Pick<CMSSchemaSection, 'section_definition' | 'display_order' | 'is_editable'>>;