import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '../providers/TenantProvider';

export interface Component {
  id: string;
  name: string;
  type: string;
  content: any;
  styles: any;
  is_active: boolean;
  is_global: boolean;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  name: string;
  content: any;
  styles: any;
  is_active: boolean;
  is_global: boolean;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_name?: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  settings: any;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export const useSupabaseDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentTenant } = useTenant();

  const executeWithLoading = async <T>(operation: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);
      return await operation();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Components API
  const components = {
    getAll: () => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('components')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Component[];
    }),

    getActive: () => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Component[];
    }),

    getById: (id: string) => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Component;
    }),

    create: (component: Omit<Component, 'id' | 'created_at' | 'updated_at' | 'tenant_id'>) => 
      executeWithLoading(async () => {
        if (!currentTenant) throw new Error('No tenant selected');
        
        const { data, error } = await supabase
          .from('components')
          .insert({
            ...component,
            tenant_id: currentTenant.tenant_id
          })
          .select()
          .single();
        
        if (error) throw error;
        return data as Component;
      }),

    update: (id: string, updates: Partial<Component>) => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('components')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Component;
    }),

    delete: (id: string) => executeWithLoading(async () => {
      const { error } = await supabase
        .from('components')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    })
  };

  // Pages API
  const pages = {
    getAll: () => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Page[];
    }),

    getPublished: () => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Page[];
    }),

    getById: (id: string) => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Page;
    }),

    getBySlug: (slug: string) => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Page;
    }),

    create: (page: Omit<Page, 'id' | 'created_at' | 'updated_at' | 'tenant_id'>) => 
      executeWithLoading(async () => {
        if (!currentTenant) throw new Error('No tenant selected');
        
        const { data, error } = await supabase
          .from('pages')
          .insert({
            ...page,
            tenant_id: currentTenant.tenant_id
          })
          .select()
          .single();
        
        if (error) throw error;
        return data as Page;
      }),

    update: (id: string, updates: Partial<Page>) => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Page;
    }),

    delete: (id: string) => executeWithLoading(async () => {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    })
  };

  // Settings API
  const settings = {
    get: () => executeWithLoading(async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data as SiteSettings | null;
    }),

    update: (updates: Partial<SiteSettings>) => executeWithLoading(async () => {
      if (!currentTenant) throw new Error('No tenant selected');
      
      // First try to get existing settings
      const { data: existing } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('site_settings')
          .update(updates)
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data as SiteSettings;
      } else {
        // Create new
        const { data, error } = await supabase
          .from('site_settings')
          .insert({
            ...updates,
            tenant_id: currentTenant.tenant_id
          })
          .select()
          .single();
        
        if (error) throw error;
        return data as SiteSettings;
      }
    })
  };

  return {
    isLoading,
    error,
    components,
    pages,
    settings,
    currentTenant
  };
};