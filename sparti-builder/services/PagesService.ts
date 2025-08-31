import { supabase } from '@/integrations/supabase/client';

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export class PagesService {
  /**
   * Get all pages
   */
  static async getAllPages(): Promise<{ data: Page[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pages:', error);
        return { data: null, error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error in getAllPages:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Create a new page
   */
  static async createPage(pageData: {
    title: string;
    description?: string;
  }): Promise<{ data: Page | null; error: string | null }> {
    try {
      const slug = pageData.title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      
      const newPage = {
        title: pageData.title,
        slug,
        description: pageData.description || '',
        status: 'draft',
      };

      const { data, error } = await supabase
        .from('pages')
        .insert([newPage])
        .select()
        .single();

      if (error) {
        console.error('Error creating page:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in createPage:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Update page
   */
  static async updatePage(
    id: string, 
    updates: Partial<Page>
  ): Promise<{ data: Page | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating page:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in updatePage:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Delete page
   */
  static async deletePage(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // First delete any associated page sections
      const { error: sectionsError } = await supabase
        .from('page_sections')
        .delete()
        .eq('page_id', id);

      if (sectionsError) {
        console.error('Error deleting page sections:', sectionsError);
        return { success: false, error: sectionsError.message };
      }

      // Then delete the page
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting page:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in deletePage:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Toggle page publish status
   */
  static async togglePublishStatus(id: string): Promise<{ data: Page | null; error: string | null }> {
    try {
      // First get current status
      const { data: currentPage, error: fetchError } = await supabase
        .from('pages')
        .select('status')
        .eq('id', id)
        .single();

      if (fetchError) {
        return { data: null, error: fetchError.message };
      }

      // Toggle the status
      const newStatus = currentPage.status === 'published' ? 'draft' : 'published';
      
      const { data, error } = await supabase
        .from('pages')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling publish status:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in togglePublishStatus:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}