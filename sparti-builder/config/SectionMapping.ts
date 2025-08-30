export interface SectionMapping {
  sectionId: string;
  componentName: string;
  filePath: string;
  description: string;
}

export const sectionMappings: SectionMapping[] = [
  {
    sectionId: 'hero-section',
    componentName: 'HeroSection',
    filePath: 'src/components/HeroSection.tsx',
    description: 'Main hero section with background slider'
  },
  {
    sectionId: 'about-section', 
    componentName: 'AboutUsSection',
    filePath: 'src/components/sections/AboutUsSection.tsx',
    description: 'About us section with company information'
  },
  {
    sectionId: 'trials-section',
    componentName: 'TrialsSection', 
    filePath: 'src/components/TrialsSection.tsx',
    description: 'Free trials and booking section'
  },
  {
    sectionId: 'programmes-section',
    componentName: 'ProgrammesAndExamsSection',
    filePath: 'src/components/sections/ProgrammesAndExamsSection.tsx', 
    description: 'Dance programmes and examination information'
  },
  {
    sectionId: 'achievements-section',
    componentName: 'AchievementsSection',
    filePath: 'src/components/sections/AchievementsSection.tsx',
    description: 'Awards and achievements showcase'
  },
  {
    sectionId: 'teachers-section', 
    componentName: 'TeachersSection',
    filePath: 'src/components/sections/TeachersSection.tsx',
    description: 'Faculty and instructors information'
  },
  {
    sectionId: 'locations-section',
    componentName: 'LocationsSection', 
    filePath: 'src/components/sections/LocationsSection.tsx',
    description: 'Studio locations and contact information'
  },
  {
    sectionId: 'reviews-section',
    componentName: 'ReviewsSection',
    filePath: 'src/components/sections/ReviewsSection.tsx', 
    description: 'Student and parent testimonials'
  },
  {
    sectionId: 'gallery-section',
    componentName: 'GallerySection',
    filePath: 'src/components/sections/GallerySection.tsx',
    description: 'Photo gallery and media showcase'
  },
  {
    sectionId: 'events-section',
    componentName: 'EventsSection', 
    filePath: 'src/components/sections/EventsSection.tsx',
    description: 'Upcoming events and performances'
  }
];

export class SectionMappingService {
  static findMappingByComponentId(componentId: string): SectionMapping | null {
    return sectionMappings.find(mapping => 
      mapping.sectionId === componentId || 
      mapping.componentName.toLowerCase() === componentId.toLowerCase()
    ) || null;
  }

  static findMappingByElement(element: HTMLElement): SectionMapping | null {
    // Check for data-sparti-component attribute
    const componentId = element.getAttribute('data-sparti-component');
    if (componentId) {
      return this.findMappingByComponentId(componentId);
    }

    // Check for id attribute
    const elementId = element.id;
    if (elementId) {
      return sectionMappings.find(mapping => 
        mapping.sectionId === elementId || 
        mapping.sectionId === `${elementId}-section`
      ) || null;
    }

    // Check parent elements
    let parent = element.parentElement;
    while (parent) {
      const parentComponentId = parent.getAttribute('data-sparti-component');
      if (parentComponentId) {
        return this.findMappingByComponentId(parentComponentId);
      }

      const parentId = parent.id;
      if (parentId) {
        const mapping = sectionMappings.find(mapping => 
          mapping.sectionId === parentId || 
          mapping.sectionId === `${parentId}-section`
        );
        if (mapping) return mapping;
      }

      parent = parent.parentElement;
    }

    return null;
  }

  static getAllMappings(): SectionMapping[] {
    return [...sectionMappings];
  }

  static addCustomMapping(mapping: SectionMapping): void {
    // Remove existing mapping with same sectionId
    const existingIndex = sectionMappings.findIndex(
      m => m.sectionId === mapping.sectionId
    );
    
    if (existingIndex >= 0) {
      sectionMappings[existingIndex] = mapping;
    } else {
      sectionMappings.push(mapping);
    }
  }
}