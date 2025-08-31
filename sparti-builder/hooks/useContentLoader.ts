import { useState, useEffect } from 'react';
import { SupabaseContentService, PageSection, Page } from '../services/SupabaseContentService';

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
      
      const { page, sections } = await SupabaseContentService.loadPageContent(pageSlug);
      
      // Convert sections array to sections object for easy lookup
      const sectionsMap = sections.reduce((acc, section) => {
        acc[section.section_id] = section;
        return acc;
      }, {} as Record<string, PageSection>);

      setContentData({
        page,
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
    const channel = SupabaseContentService.subscribeToContentChanges(
      pageSlug,
      (sections) => {
        const sectionsMap = sections.reduce((acc, section) => {
          acc[section.section_id] = section;
          return acc;
        }, {} as Record<string, PageSection>);

        setContentData(prev => ({
          ...prev,
          sections: sectionsMap,
        }));
      }
    );

    return () => {
      channel?.unsubscribe();
    };
  }, [pageSlug]);

  const getSectionContent = (sectionId: string) => {
    return contentData.sections[sectionId]?.content || {};
  };

  const saveContent = async (sectionId: string, content: Record<string, any>) => {
    const result = await SupabaseContentService.saveSectionContent(
      pageSlug,
      sectionId,
      content
    );
    
    if (result.success) {
      // Reload content to get the latest data
      loadContent();
    }
    
    return result;
  };

  return {
    ...contentData,
    getSectionContent,
    saveContent,
    reloadContent: loadContent,
  };
};