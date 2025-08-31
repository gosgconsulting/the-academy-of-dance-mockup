import { ModificationSummary } from './ContentExtractor';
import { SupabaseContentService } from './SupabaseContentService';

export interface SaveResult {
  success: boolean;
  message: string;
  modifiedSections: string[];
  error?: string;
}

export class FileSaveService {
  /**
   * Save modifications to Supabase database
   */
  static async saveModifications(
    modifications: ModificationSummary[]
  ): Promise<SaveResult> {
    const modifiedSections: string[] = [];
    
    try {
      // Group modifications by section for bulk save
      const sectionUpdates: Array<{ sectionId: string; content: Record<string, any> }> = [];

      for (const modification of modifications) {
        // Extract section content from modifications
        const sectionContent = this.extractSectionContent(modification);
        if (sectionContent) {
          sectionUpdates.push(sectionContent);
          modifiedSections.push(sectionContent.sectionId);
        }
      }

      if (sectionUpdates.length === 0) {
        return {
          success: false,
          message: 'No valid content modifications found',
          modifiedSections,
          error: 'No content to save'
        };
      }

      // Save to Supabase
      const result = await SupabaseContentService.saveBulkContent('index', sectionUpdates);

      if (result.success) {
        return {
          success: true,
          message: `Successfully updated ${modifiedSections.length} section(s) in database`,
          modifiedSections
        };
      } else {
        return {
          success: false,
          message: 'Failed to save to database',
          modifiedSections,
          error: result.error
        };
      }
    } catch (error) {
      console.error('Save operation failed:', error);
      return {
        success: false,
        message: 'Failed to save modifications',
        modifiedSections,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Extract section content from modification data
   */
  private static extractSectionContent(modification: ModificationSummary): {
    sectionId: string;
    content: Record<string, any>;
  } | null {
    try {
      // Look for section identifier in the modification
      const sectionId = this.getSectionIdFromModification(modification);
      if (!sectionId) return null;

      // Build content object from modifications
      const content: Record<string, any> = {};

      modification.elements.forEach(element => {
        if (element.type === 'text' && element.newText) {
          // Determine the content property based on element attributes or position
          const contentKey = this.getContentKey(element, sectionId);
          content[contentKey] = element.newText;
        } else if (element.type === 'image' && element.newImageUrl) {
          content.imageUrl = element.newImageUrl;
          if (element.newAltText) {
            content.imageAlt = element.newAltText;
          }
        }
      });

      return { sectionId, content };
    } catch (error) {
      console.error('Error extracting section content:', error);
      return null;
    }
  }

  /**
   * Get section ID from modification data
   */
  private static getSectionIdFromModification(modification: ModificationSummary): string | null {
    // Extract from file path (e.g., HeroSection.tsx -> hero)
    if (modification.filePath.includes('HeroSection')) return 'hero';
    if (modification.filePath.includes('AboutUsSection')) return 'about';
    if (modification.filePath.includes('TrialsSection')) return 'trials';
    if (modification.filePath.includes('VisionMissionSection')) return 'vision-mission';
    if (modification.filePath.includes('ProgrammesAndExamsSection')) return 'programmes';
    if (modification.filePath.includes('CompetitionExcellenceSection')) return 'competition';
    if (modification.filePath.includes('EventsSection')) return 'events';
    if (modification.filePath.includes('AchievementsSection')) return 'achievements';
    if (modification.filePath.includes('TeachersSection')) return 'teachers';
    if (modification.filePath.includes('ReviewsSection')) return 'reviews';
    if (modification.filePath.includes('LocationsSection')) return 'locations';
    if (modification.filePath.includes('GallerySection')) return 'gallery';

    // Try to extract from element data-sparti-section attributes
    for (const element of modification.elements) {
      const sectionAttr = element.element?.getAttribute?.('data-sparti-section');
      if (sectionAttr) return sectionAttr;
      
      // Look in parent elements
      let parent = element.element?.parentElement;
      while (parent) {
        const parentSection = parent.getAttribute?.('data-sparti-section');
        if (parentSection) return parentSection;
        parent = parent.parentElement;
      }
    }

    return null;
  }

  /**
   * Determine content key based on element and section
   */
  private static getContentKey(element: any, sectionId: string): string {
    // Check for specific content attributes
    const contentAttr = element.element?.getAttribute?.('data-content-key');
    if (contentAttr) return contentAttr;

    // Default mappings based on element type and section
    const tagName = element.element?.tagName?.toLowerCase();
    const className = element.element?.className || '';

    if (tagName === 'h1' || className.includes('title')) return 'title';
    if (tagName === 'h2' || className.includes('subtitle')) return 'subtitle';
    if (className.includes('description') || tagName === 'p') return 'description';
    if (className.includes('vision')) return 'vision';
    if (className.includes('mission')) return 'mission';

    // Fallback
    return 'content';
  }

  /**
   * Save individual section content
   */
  static async saveSectionContent(
    sectionId: string,
    content: Record<string, any>
  ): Promise<SaveResult> {
    try {
      const result = await SupabaseContentService.saveSectionContent('index', sectionId, content);

      if (result.success) {
        return {
          success: true,
          message: `Successfully updated ${sectionId} section`,
          modifiedSections: [sectionId]
        };
      } else {
        return {
          success: false,
          message: 'Failed to save section content',
          modifiedSections: [],
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save section content',
        modifiedSections: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}