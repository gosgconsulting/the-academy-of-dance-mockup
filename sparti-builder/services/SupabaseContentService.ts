import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface PageSection {
  id: string;
  page_id: string;
  section_id: string;
  section_type: string;
  content: any; // Changed from Record<string, any> to any to match Json type
  order_index: number;
  is_active: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: string; // Changed from 'draft' | 'published' to string to match Supabase type
}

export class SupabaseContentService {
  /**
   * Load page content by slug
   */
  static async loadPageContent(slug: string = 'index'): Promise<{
    page: Page | null;
    sections: PageSection[];
  }> {
    try {
      // Get page data
      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (pageError) {
        console.error('Error loading page:', pageError);
        return { page: null, sections: [] };
      }

      // Get sections for this page
      const { data: sections, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (sectionsError) {
        console.error('Error loading sections:', sectionsError);
        return { page, sections: [] };
      }

      return { page, sections: sections || [] };
    } catch (error) {
      console.error('Error in loadPageContent:', error);
      return { page: null, sections: [] };
    }
  }

  /**
   * Save section content to database
   */
  static async saveSectionContent(
    pageSlug: string,
    sectionId: string,
    content: Record<string, any>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // First, get the page ID
      const { data: page } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', pageSlug)
        .single();

      if (!page) {
        return { success: false, error: 'Page not found' };
      }

      // Get existing section to preserve section_type
      const { data: existingSection } = await supabase
        .from('page_sections')
        .select('section_type')
        .eq('page_id', page.id)
        .eq('section_id', sectionId)
        .single();

      // Update or insert section content
      const { error } = await supabase
        .from('page_sections')
        .upsert({
          page_id: page.id,
          section_id: sectionId,
          section_type: existingSection?.section_type || `${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}Section`,
          content: content as any, // Cast to any to match Json type
        }, {
          onConflict: 'page_id,section_id'
        });

      if (error) {
        console.error('Error saving section content:', error);
        return { success: false, error: error.message };
      }

      // Save to content history for version control
      const { data: section } = await supabase
        .from('page_sections')
        .select('id')
        .eq('page_id', page.id)
        .eq('section_id', sectionId)
        .single();

      if (section) {
        await supabase.from('content_history').insert({
          section_id: section.id,
          content: content as any,
          change_type: 'update'
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Error in saveSectionContent:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Save multiple sections at once (bulk save)
   */
  static async saveBulkContent(
    pageSlug: string,
    sections: Array<{ sectionId: string; content: Record<string, any> }>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get page ID
      const { data: page } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', pageSlug)
        .single();

      if (!page) {
        return { success: false, error: 'Page not found' };
      }

      // Get existing sections to preserve section_types
      const { data: existingSections } = await supabase
        .from('page_sections')
        .select('section_id, section_type')
        .eq('page_id', page.id);

      const existingTypesMap = (existingSections || []).reduce((acc, section) => {
        acc[section.section_id] = section.section_type;
        return acc;
      }, {} as Record<string, string>);

      // Prepare bulk upsert data
      const sectionsData = sections.map(({ sectionId, content }) => ({
        page_id: page.id,
        section_id: sectionId,
        section_type: existingTypesMap[sectionId] || `${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}Section`,
        content: content as any, // Cast to any to match Json type
      }));

      // Bulk upsert sections
      const { error } = await supabase
        .from('page_sections')
        .upsert(sectionsData, {
          onConflict: 'page_id,section_id'
        });

      if (error) {
        console.error('Error bulk saving content:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in saveBulkContent:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Upload media to Supabase Storage
   */
  static async uploadMedia(
    file: File,
    folder: string = 'uploads'
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) {
        return { success: false, error: uploadError.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Save to media library table
      await supabase.from('media_library').insert({
        filename: file.name,
        file_path: fileName,
        file_type: file.type,
        file_size: file.size,
      });

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error('Error uploading media:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Subscribe to real-time content changes
   */
  static subscribeToContentChanges(
    pageSlug: string,
    callback: (sections: PageSection[]) => void
  ) {
    return supabase
      .channel(`page_content_${pageSlug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'page_sections',
        },
        () => {
          // Reload content when changes occur
          this.loadPageContent(pageSlug).then(({ sections }) => {
            callback(sections);
          });
        }
      )
      .subscribe();
  }
}