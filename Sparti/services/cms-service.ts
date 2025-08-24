import { supabase, executeQuery, handleSupabaseError, getCurrentTenantId } from '../lib/supabase-client';
import { 
  CMSSchema, 
  CMSSchemaSection, 
  CMSContent,
  CMSServiceInterface,
  SchemaResponse,
  SectionListResponse,
  CreateSchemaInput,
  CreateSectionInput,
  UpdateSchemaInput,
  UpdateSectionInput
} from '../types/cms-types';

/**
 * Sparti CMS Service
 * 
 * Provides all database operations for the CMS system with automatic
 * tenant scoping via RLS and comprehensive error handling.
 */

class CMSService implements CMSServiceInterface {
  
  /**
   * Schema Operations
   */
  
  async getSchema(schemaName: string): Promise<CMSSchema | null> {
    try {
      const query = supabase
        .from('cms_schemas')
        .select('*')
        .eq('schema_name', schemaName)
        .eq('is_active', true)
        .single();
      
      const data = await executeQuery<CMSSchema>(query, 'getSchema');
      return data;
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        // No data found - return null instead of throwing
        return null;
      }
      handleSupabaseError(error, 'getSchema');
    }
  }
  
  async getSchemas(): Promise<CMSSchema[]> {
    try {
      const query = supabase
        .from('cms_schemas')
        .select('*')
        .eq('is_active', true)
        .order('schema_name');
      
      return await executeQuery<CMSSchema[]>(query, 'getSchemas');
    } catch (error: any) {
      handleSupabaseError(error, 'getSchemas');
    }
  }
  
  async createSchema(schema: CreateSchemaInput): Promise<CMSSchema> {
    try {
      const query = supabase
        .from('cms_schemas')
        .insert([schema])
        .select()
        .single();
      
      return await executeQuery<CMSSchema>(query, 'createSchema');
    } catch (error: any) {
      handleSupabaseError(error, 'createSchema');
    }
  }
  
  async updateSchema(id: string, updates: UpdateSchemaInput): Promise<CMSSchema> {
    try {
      const query = supabase
        .from('cms_schemas')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      return await executeQuery<CMSSchema>(query, 'updateSchema');
    } catch (error: any) {
      handleSupabaseError(error, 'updateSchema');
    }
  }
  
  async deleteSchema(id: string): Promise<void> {
    try {
      // Soft delete by setting is_active to false
      const query = supabase
        .from('cms_schemas')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      await executeQuery(query, 'deleteSchema');
    } catch (error: any) {
      handleSupabaseError(error, 'deleteSchema');
    }
  }
  
  /**
   * Section Operations
   */
  
  async getSchemaSections(schemaName: string): Promise<CMSSchemaSection[]> {
    try {
      const query = supabase
        .from('cms_schema_sections')
        .select(`
          *,
          cms_schemas!inner(schema_name)
        `)
        .eq('cms_schemas.schema_name', schemaName)
        .eq('cms_schemas.is_active', true)
        .eq('is_editable', true)
        .order('display_order');
      
      return await executeQuery<CMSSchemaSection[]>(query, 'getSchemaSections');
    } catch (error: any) {
      handleSupabaseError(error, 'getSchemaSections');
    }
  }
  
  async getSection(sectionId: string): Promise<CMSSchemaSection | null> {
    try {
      const query = supabase
        .from('cms_schema_sections')
        .select('*')
        .eq('id', sectionId)
        .single();
      
      const data = await executeQuery<CMSSchemaSection>(query, 'getSection');
      return data;
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return null;
      }
      handleSupabaseError(error, 'getSection');
    }
  }
  
  async createSection(section: CreateSectionInput): Promise<CMSSchemaSection> {
    try {
      const query = supabase
        .from('cms_schema_sections')
        .insert([section])
        .select()
        .single();
      
      return await executeQuery<CMSSchemaSection>(query, 'createSection');
    } catch (error: any) {
      handleSupabaseError(error, 'createSection');
    }
  }
  
  async updateSection(id: string, updates: UpdateSectionInput): Promise<CMSSchemaSection> {
    try {
      const query = supabase
        .from('cms_schema_sections')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      return await executeQuery<CMSSchemaSection>(query, 'updateSection');
    } catch (error: any) {
      handleSupabaseError(error, 'updateSection');
    }
  }
  
  async deleteSection(id: string): Promise<void> {
    try {
      // Hard delete sections (they're tied to schemas)
      const query = supabase
        .from('cms_schema_sections')
        .delete()
        .eq('id', id);
      
      await executeQuery(query, 'deleteSection');
    } catch (error: any) {
      handleSupabaseError(error, 'deleteSection');
    }
  }
  
  async reorderSections(schemaId: string, sectionIds: string[]): Promise<void> {
    try {
      // Update display_order for each section
      const updates = sectionIds.map((sectionId, index) => ({
        id: sectionId,
        display_order: index + 1,
        updated_at: new Date().toISOString()
      }));
      
      const query = supabase
        .from('cms_schema_sections')
        .upsert(updates, { onConflict: 'id' });
      
      await executeQuery(query, 'reorderSections');
    } catch (error: any) {
      handleSupabaseError(error, 'reorderSections');
    }
  }
  
  /**
   * Content Operations
   */
  
  async getContent(schemaName: string, sectionName: string): Promise<CMSContent | null> {
    try {
      const query = supabase
        .from('cms_content')
        .select('*')
        .eq('schema_name', schemaName)
        .eq('section_name', sectionName)
        .single();
      
      const data = await executeQuery<CMSContent>(query, 'getContent');
      return data;
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return null;
      }
      handleSupabaseError(error, 'getContent');
    }
  }
  
  async saveContent(
    schemaName: string, 
    sectionName: string, 
    content: Record<string, any>
  ): Promise<CMSContent> {
    try {
      const tenantId = await getCurrentTenantId();
      if (!tenantId) {
        throw new Error('No tenant context available');
      }
      
      const contentData = {
        tenant_id: tenantId,
        schema_name: schemaName,
        section_name: sectionName,
        content_data: content,
        updated_at: new Date().toISOString()
      };
      
      const query = supabase
        .from('cms_content')
        .upsert([contentData], { 
          onConflict: 'tenant_id,schema_name,section_name',
          ignoreDuplicates: false 
        })
        .select()
        .single();
      
      return await executeQuery<CMSContent>(query, 'saveContent');
    } catch (error: any) {
      handleSupabaseError(error, 'saveContent');
    }
  }
  
  async deleteContent(schemaName: string, sectionName: string): Promise<void> {
    try {
      const query = supabase
        .from('cms_content')
        .delete()
        .eq('schema_name', schemaName)
        .eq('section_name', sectionName);
      
      await executeQuery(query, 'deleteContent');
    } catch (error: any) {
      handleSupabaseError(error, 'deleteContent');
    }
  }
  
  /**
   * Advanced Query Operations
   */
  
  async getSchemaWithSections(schemaName: string): Promise<SchemaResponse | null> {
    try {
      const [schema, sections] = await Promise.all([
        this.getSchema(schemaName),
        this.getSchemaSections(schemaName)
      ]);
      
      if (!schema) {
        return null;
      }
      
      return { schema, sections };
    } catch (error: any) {
      handleSupabaseError(error, 'getSchemaWithSections');
    }
  }
  
  async searchSchemas(searchTerm: string): Promise<CMSSchema[]> {
    try {
      const query = supabase
        .from('cms_schemas')
        .select('*')
        .eq('is_active', true)
        .or(`schema_name.ilike.%${searchTerm}%,schema_definition->label.ilike.%${searchTerm}%`)
        .order('schema_name');
      
      return await executeQuery<CMSSchema[]>(query, 'searchSchemas');
    } catch (error: any) {
      handleSupabaseError(error, 'searchSchemas');
    }
  }
  
  async getSchemasByGroup(groupName: string): Promise<CMSSchema[]> {
    try {
      const query = supabase
        .from('cms_schemas')
        .select('*')
        .eq('is_active', true)
        .eq('ui_config->group', groupName)
        .order('ui_config->order', { ascending: true });
      
      return await executeQuery<CMSSchema[]>(query, 'getSchemasByGroup');
    } catch (error: any) {
      handleSupabaseError(error, 'getSchemasByGroup');
    }
  }
  
  /**
   * Bulk Operations
   */
  
  async bulkUpdateSections(updates: Array<{ id: string; updates: UpdateSectionInput }>): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const bulkData = updates.map(({ id, updates: sectionUpdates }) => ({
        id,
        ...sectionUpdates,
        updated_at: timestamp
      }));
      
      const query = supabase
        .from('cms_schema_sections')
        .upsert(bulkData, { onConflict: 'id' });
      
      await executeQuery(query, 'bulkUpdateSections');
    } catch (error: any) {
      handleSupabaseError(error, 'bulkUpdateSections');
    }
  }
  
  /**
   * Validation Operations
   */
  
  async validateSchemaName(schemaName: string, excludeId?: string): Promise<boolean> {
    try {
      let query = supabase
        .from('cms_schemas')
        .select('id')
        .eq('schema_name', schemaName)
        .eq('is_active', true);
      
      if (excludeId) {
        query = query.neq('id', excludeId);
      }
      
      const data = await executeQuery<any[]>(query, 'validateSchemaName');
      return data.length === 0; // true if name is available
    } catch (error: any) {
      handleSupabaseError(error, 'validateSchemaName');
    }
  }
  
  async validateSectionName(schemaId: string, sectionName: string, excludeId?: string): Promise<boolean> {
    try {
      let query = supabase
        .from('cms_schema_sections')
        .select('id')
        .eq('schema_id', schemaId)
        .eq('section_name', sectionName);
      
      if (excludeId) {
        query = query.neq('id', excludeId);
      }
      
      const data = await executeQuery<any[]>(query, 'validateSectionName');
      return data.length === 0; // true if name is available
    } catch (error: any) {
      handleSupabaseError(error, 'validateSectionName');
    }
  }
}

// Export singleton instance
export const cmsService = new CMSService();

/**
 * Convenience Functions
 * 
 * Higher-level operations that combine multiple service calls
 */

// Get complete schema data for editing
export const getSchemaForEditing = async (schemaName: string): Promise<SchemaResponse | null> => {
  return await cmsService.getSchemaWithSections(schemaName);
};

// Get navigation data for admin UI
export const getNavigationData = async (): Promise<Record<string, CMSSchema[]>> => {
  try {
    const allSchemas = await cmsService.getSchemas();
    const groupedSchemas: Record<string, CMSSchema[]> = {};
    
    // Group schemas by their UI group
    allSchemas.forEach(schema => {
      const group = schema.ui_config.group || 'Other';
      if (!groupedSchemas[group]) {
        groupedSchemas[group] = [];
      }
      groupedSchemas[group].push(schema);
    });
    
    // Sort schemas within each group by order
    Object.keys(groupedSchemas).forEach(group => {
      groupedSchemas[group].sort((a, b) => {
        const orderA = a.ui_config.order || 999;
        const orderB = b.ui_config.order || 999;
        return orderA - orderB;
      });
    });
    
    return groupedSchemas;
  } catch (error: any) {
    handleSupabaseError(error, 'getNavigationData');
  }
};

// Create schema with initial sections
export const createSchemaWithSections = async (
  schema: CreateSchemaInput,
  sections: Omit<CreateSectionInput, 'schema_id'>[]
): Promise<SchemaResponse> => {
  try {
    // Create the schema first
    const createdSchema = await cmsService.createSchema(schema);
    
    // Create sections with the schema ID
    const sectionsWithSchemaId = sections.map(section => ({
      ...section,
      schema_id: createdSchema.id
    }));
    
    const createdSections = await Promise.all(
      sectionsWithSchemaId.map(section => cmsService.createSection(section))
    );
    
    return {
      schema: createdSchema,
      sections: createdSections
    };
  } catch (error: any) {
    handleSupabaseError(error, 'createSchemaWithSections');
  }
};

// Duplicate schema with all sections
export const duplicateSchema = async (
  sourceSchemaName: string,
  newSchemaName: string,
  newLabel?: string
): Promise<SchemaResponse> => {
  try {
    const sourceData = await getSchemaForEditing(sourceSchemaName);
    if (!sourceData) {
      throw new Error(`Source schema "${sourceSchemaName}" not found`);
    }
    
    const { schema: sourceSchema, sections: sourceSections } = sourceData;
    
    // Create new schema
    const newSchema: CreateSchemaInput = {
      schema_type: sourceSchema.schema_type,
      schema_name: newSchemaName,
      schema_definition: {
        ...sourceSchema.schema_definition,
        label: newLabel || `${sourceSchema.schema_definition.label} (Copy)`
      },
      ui_config: sourceSchema.ui_config,
      is_active: true,
      version: 1
    };
    
    // Create new sections
    const newSections = sourceSections.map(section => ({
      section_name: section.section_name,
      section_type: section.section_type,
      section_definition: section.section_definition,
      display_order: section.display_order,
      is_editable: section.is_editable
    }));
    
    return await createSchemaWithSections(newSchema, newSections);
  } catch (error: any) {
    handleSupabaseError(error, 'duplicateSchema');
  }
};

/**
 * Content Helper Functions
 */

// Get all content for a schema (all sections)
export const getSchemaContent = async (schemaName: string): Promise<Record<string, any>> => {
  try {
    const sections = await cmsService.getSchemaSections(schemaName);
    const contentPromises = sections.map(async section => {
      const content = await cmsService.getContent(schemaName, section.section_name);
      return {
        sectionName: section.section_name,
        content: content?.content_data || {}
      };
    });
    
    const contentResults = await Promise.all(contentPromises);
    
    // Convert to object with section names as keys
    const schemaContent: Record<string, any> = {};
    contentResults.forEach(({ sectionName, content }) => {
      schemaContent[sectionName] = content;
    });
    
    return schemaContent;
  } catch (error: any) {
    handleSupabaseError(error, 'getSchemaContent');
  }
};

// Save all content for a schema
export const saveSchemaContent = async (
  schemaName: string, 
  content: Record<string, any>
): Promise<void> => {
  try {
    const savePromises = Object.entries(content).map(([sectionName, sectionContent]) =>
      cmsService.saveContent(schemaName, sectionName, sectionContent)
    );
    
    await Promise.all(savePromises);
  } catch (error: any) {
    handleSupabaseError(error, 'saveSchemaContent');
  }
};

/**
 * Utility Functions
 */

// Check if schema exists and is active
export const schemaExists = async (schemaName: string): Promise<boolean> => {
  const schema = await cmsService.getSchema(schemaName);
  return schema !== null;
};

// Get schema type (singleton or collection)
export const getSchemaType = async (schemaName: string): Promise<'singleton' | 'collection' | null> => {
  const schema = await cmsService.getSchema(schemaName);
  return schema?.schema_type || null;
};

// Get section count for a schema
export const getSectionCount = async (schemaName: string): Promise<number> => {
  const sections = await cmsService.getSchemaSections(schemaName);
  return sections.length;
};

// Export the service instance as default
export default cmsService;