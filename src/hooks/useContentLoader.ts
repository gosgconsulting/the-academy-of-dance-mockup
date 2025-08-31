import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PageSection {
  id: string;
  page_id: string;
  section_id: string;
  section_type: string;
  content: any; // Using any to match Supabase Json type
  order_index: number;
  is_active: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: string; // Using string to match Supabase type
}

export interface ContentData {
  page: Page | null;
  sections: Record<string, PageSection>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to load and manage page content from Supabase
 */
export const useContentLoader = (pageSlug: string = 'index') => {
  const [contentData, setContentData] = useState<ContentData>({
    page: null,
    sections: {},
    isLoading: true,
    error: null,
  });

  const loadContent = async () => {
    try {
      setContentData(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Get page data
      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', pageSlug)
        .single();

      if (pageError) {
        throw new Error(`Failed to load page: ${pageError.message}`);
      }

      // Get sections for this page
      const { data: sections, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (sectionsError) {
        throw new Error(`Failed to load sections: ${sectionsError.message}`);
      }
      
      // Convert sections array to sections object for easy lookup
      const sectionsMap = (sections || []).reduce((acc, section) => {
        acc[section.section_id] = section as PageSection; // Type assertion
        return acc;
      }, {} as Record<string, PageSection>);

      setContentData({
        page: page as Page, // Type assertion
        sections: sectionsMap,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setContentData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load content',
      }));
    }
  };

  useEffect(() => {
    loadContent();

    // Subscribe to real-time changes
    const channel = supabase
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
          loadContent();
        }
      )
      .subscribe();

    return () => {
      channel?.unsubscribe();
    };
  }, [pageSlug]);

  const getSectionContent = (sectionId: string) => {
    return contentData.sections[sectionId]?.content || {};
  };

  const saveContent = async (sectionId: string, content: Record<string, any>) => {
    try {
      // Get page ID
      const { data: page } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', pageSlug)
        .single();

      if (!page) {
        throw new Error('Page not found');
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
        throw new Error(error.message);
      }

      // Reload content to get the latest data
      loadContent();
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };

  return {
    ...contentData,
    getSectionContent,
    saveContent,
    reloadContent: loadContent,
  };
};