import { SpartiConfig } from './types/cms-types';

/**
 * Sparti CMS Configuration
 * 
 * This file defines the admin UI navigation structure and schema organization.
 * Schema definitions and content structure are stored in the database.
 * 
 * Key Principles:
 * - Navigation groups organize schemas in the admin interface
 * - Schema keys must match schema_name in cms_schemas table
 * - Collections and singletons are loaded dynamically from database
 * - Only UI organization is defined here, not content structure
 */

const config = (configObj: SpartiConfig): SpartiConfig => configObj;

export default config({
  ui: {
    navigation: {
      // Content Management
      'Content': [
        'homepage',
        'about-page',
        'contact-page'
      ],
      
      // Blog Management
      'Blog': [
        'blog-posts',
        'blog-categories',
        'blog-authors'
      ],
      
      // Dance Programs
      'Programs': [
        'dance-classes',
        'instructors',
        'schedules'
      ],
      
      // Events & Gallery
      'Events': [
        'events',
        'gallery-images',
        'competitions'
      ],
      
      // Site Configuration
      'Settings': [
        'site-config',
        'navigation-menu',
        'footer-content',
        'social-links'
      ]
    },
    
    // Global UI settings
    theme: {
      primaryColor: '#8B5A3C', // Dance academy brand color
      accentColor: '#D4AF37',  // Gold accent
      borderRadius: '8px',
      fontFamily: 'Poppins, sans-serif'
    },
    
    // Modal configuration
    modal: {
      maxWidth: '800px',
      maxHeight: '90vh',
      showSchemaInfo: true,
      showSectionCount: true
    }
  },
  
  // Collections are loaded dynamically from database
  // This section is populated at runtime from cms_schemas table
  collections: {
    // Runtime populated from database where schema_type = 'collection'
  },
  
  // Singletons are loaded dynamically from database  
  // This section is populated at runtime from cms_schemas table
  singletons: {
    // Runtime populated from database where schema_type = 'singleton'
  },
  
  // Database configuration
  database: {
    // Tables used by the CMS
    tables: {
      schemas: 'cms_schemas',
      sections: 'cms_schema_sections',
      content: 'cms_content', // For actual content storage
      media: 'cms_media'      // For media asset management
    },
    
    // RLS helper functions
    helpers: {
      getCurrentTenant: 'get_current_tenant_id()',
      checkUserRole: 'user_has_role(text)',
      getCurrentUser: 'auth.uid()'
    }
  },
  
  // Field type definitions for the editor
  fieldTypes: {
    'text': {
      component: 'TextInput',
      validation: { maxLength: 500 }
    },
    'textarea': {
      component: 'TextareaInput', 
      validation: { maxLength: 2000 }
    },
    'rich-text': {
      component: 'RichTextEditor',
      validation: { maxLength: 10000 }
    },
    'image': {
      component: 'ImageUpload',
      validation: { fileTypes: ['jpg', 'png', 'webp'], maxSize: '5MB' }
    },
    'url': {
      component: 'URLInput',
      validation: { pattern: 'url' }
    },
    'email': {
      component: 'EmailInput', 
      validation: { pattern: 'email' }
    },
    'phone': {
      component: 'PhoneInput',
      validation: { pattern: 'phone' }
    },
    'date': {
      component: 'DatePicker',
      validation: { format: 'YYYY-MM-DD' }
    },
    'boolean': {
      component: 'Checkbox',
      validation: {}
    },
    'select': {
      component: 'SelectInput',
      validation: { options: 'required' }
    },
    'number': {
      component: 'NumberInput',
      validation: { min: 0 }
    }
  },
  
  // Media handling configuration
  media: {
    uploadPath: '/uploads',
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    imageOptimization: {
      enabled: true,
      formats: ['webp', 'jpg'],
      sizes: [400, 800, 1200, 1600]
    }
  },
  
  // Security settings
  security: {
    requireAuth: true,
    adminRole: 'admin',
    editorRole: 'editor',
    viewerRole: 'viewer',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    csrfProtection: true
  },
  
  // Development settings
  development: {
    enableDebugMode: process.env.NODE_ENV === 'development',
    showSchemaIds: false,
    logQueries: false,
    mockData: false
  }
});

/**
 * Configuration Validation
 * 
 * Validates that the configuration is properly structured
 * and all required fields are present.
 */
export function validateConfig(config: SpartiConfig): boolean {
  // Validate navigation structure
  if (!config.ui?.navigation || Object.keys(config.ui.navigation).length === 0) {
    console.error('Sparti Config: Navigation groups are required');
    return false;
  }
  
  // Validate navigation schema keys
  for (const [group, schemas] of Object.entries(config.ui.navigation)) {
    if (!Array.isArray(schemas) || schemas.length === 0) {
      console.error(`Sparti Config: Group "${group}" must contain schema keys`);
      return false;
    }
    
    for (const schema of schemas) {
      if (typeof schema !== 'string' || schema.trim() === '') {
        console.error(`Sparti Config: Invalid schema key in group "${group}"`);
        return false;
      }
    }
  }
  
  // Validate field types
  if (!config.fieldTypes || Object.keys(config.fieldTypes).length === 0) {
    console.error('Sparti Config: Field types are required');
    return false;
  }
  
  return true;
}

/**
 * Get Navigation Groups
 * 
 * Returns the navigation structure for the admin UI
 */
export function getNavigationGroups(): Record<string, string[]> {
  const config = require('./sparti.config.ts').default;
  return config.ui.navigation;
}

/**
 * Get Schema Keys
 * 
 * Returns all schema keys across all navigation groups
 */
export function getAllSchemaKeys(): string[] {
  const navigation = getNavigationGroups();
  return Object.values(navigation).flat();
}

/**
 * Get Group for Schema
 * 
 * Returns the UI group that contains a specific schema
 */
export function getGroupForSchema(schemaName: string): string | null {
  const navigation = getNavigationGroups();
  
  for (const [group, schemas] of Object.entries(navigation)) {
    if (schemas.includes(schemaName)) {
      return group;
    }
  }
  
  return null;
}