import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Layout, 
  Image, 
  Type, 
  Square, 
  AlignJustify,
  Menu,
  Minus,
  GripVertical,
  Eye
} from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';
import { UniversalElementDetector } from '../core/universal-detector';

// Force refresh to clear Vite cache

interface PageSection {
  id: string;
  name: string;
  element: HTMLElement;
  type: 'header' | 'section' | 'footer' | 'slider' | 'text' | 'image' | 'container';
  category: 'structural' | 'content' | 'navigation';
  children?: PageSection[];
  isExpanded?: boolean;
}

interface SectionGroup {
  name: string;
  category: string;
  sections: PageSection[];
  isExpanded: boolean;
}

interface SpartiSidebarProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const SpartiSidebar: React.FC<SpartiSidebarProps> = ({ isVisible, onToggle }) => {
  const [sectionGroups, setSectionGroups] = useState<SectionGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['structural', 'content']));
  const { selectElement, selectedElement } = useSpartiBuilder();

  const getElementIcon = (type: PageSection['type']) => {
    const icons = {
      header: AlignJustify,
      section: Layout,
      footer: Minus,
      slider: Image,
      text: Type,
      image: Image,
      container: Square
    };
    return icons[type] || Square;
  };

  const getElementCategory = (element: HTMLElement): PageSection['category'] => {
    const tagName = element.tagName.toLowerCase();
    
    if (tagName === 'header' || tagName === 'footer' || tagName === 'nav') {
      return 'structural';
    }
    
    if (tagName === 'main' || element.hasAttribute('data-sparti-section')) {
      return 'content';
    }
    
    const classList = element.className.toLowerCase();
    if (classList.includes('nav') || classList.includes('menu')) {
      return 'navigation';
    }
    
    return 'content';
  };

  const getElementName = (element: HTMLElement): string => {
    // Check for data-sparti-section attribute first
    const sectionName = element.getAttribute('data-sparti-section');
    if (sectionName) {
      return sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace('-', ' ');
    }

    // Check for data-sparti-component attribute
    const componentName = element.getAttribute('data-sparti-component');
    if (componentName) {
      return componentName.charAt(0).toUpperCase() + componentName.slice(1).replace('-', ' ');
    }

    // Check for ID
    if (element.id) {
      return element.id.charAt(0).toUpperCase() + element.id.slice(1).replace('-', ' ');
    }

    // Check for semantic elements
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'header') return 'Header';
    if (tagName === 'footer') return 'Footer';
    if (tagName === 'nav') return 'Navigation';
    if (tagName === 'main') return 'Main Content';
    if (tagName === 'section') return 'Section';

    // Check for classes that might indicate purpose
    const classList = element.className.toLowerCase();
    if (classList.includes('hero')) return 'Hero';
    if (classList.includes('about')) return 'About';
    if (classList.includes('gallery')) return 'Gallery';
    if (classList.includes('contact')) return 'Contact';
    if (classList.includes('footer')) return 'Footer';
    if (classList.includes('header')) return 'Header';

    return `${tagName.charAt(0).toUpperCase() + tagName.slice(1)}`;
  };

  const getElementType = (element: HTMLElement): PageSection['type'] => {
    const tagName = element.tagName.toLowerCase();
    
    if (tagName === 'header') return 'header';
    if (tagName === 'footer') return 'footer';
    
    // Check if it's a slider/hero section
    if (UniversalElementDetector.isSliderElement(element)) return 'slider';
    
    // Check element type from detector
    const elementType = UniversalElementDetector.detectElementType(element);
    
    switch (elementType) {
      case 'image':
      case 'slider':
        return 'slider';
      case 'text':
        return 'text';
      default:
        return tagName === 'section' ? 'section' : 'container';
    }
  };

  const findSliderImages = (sliderElement: HTMLElement): PageSection[] => {
    const images = sliderElement.querySelectorAll('img');
    return Array.from(images).map((img, index) => ({
      id: `${sliderElement.id || 'slider'}-image-${index}`,
      name: `Image ${index + 1}`,
      element: img,
      type: 'image' as const
    }));
  };

  const scanPageSections = (): SectionGroup[] => {
    const sections: PageSection[] = [];
    
    // Find main structural elements
    const structuralSelectors = [
      'header[data-sparti-ignore]',
      '[data-sparti-section]',
      '.sparti-section',
      'main > section',
      'footer[data-sparti-ignore]'
    ];

    const foundElements = new Set<HTMLElement>();

    structuralSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!foundElements.has(element as HTMLElement)) {
          foundElements.add(element as HTMLElement);
          
          const section: PageSection = {
            id: element.id || `section-${sections.length}`,
            name: getElementName(element as HTMLElement),
            element: element as HTMLElement,
            type: getElementType(element as HTMLElement),
            category: getElementCategory(element as HTMLElement),
            isExpanded: false
          };

          // If it's a slider, find sub-images
          if (section.type === 'slider') {
            section.children = findSliderImages(element as HTMLElement);
            section.isExpanded = expandedSections.has(section.id);
          }

          sections.push(section);
        }
      });
    });

    const sortedSections = sections.sort((a, b) => {
      // Sort by DOM order
      const aRect = a.element.getBoundingClientRect();
      const bRect = b.element.getBoundingClientRect();
      return aRect.top - bRect.top;
    });

    // Group sections by category
    const groups: SectionGroup[] = [
      {
        name: 'LAYOUT',
        category: 'structural',
        sections: sortedSections.filter(s => s.category === 'structural'),
        isExpanded: expandedGroups.has('structural')
      },
      {
        name: 'CONTENT',
        category: 'content', 
        sections: sortedSections.filter(s => s.category === 'content'),
        isExpanded: expandedGroups.has('content')
      },
      {
        name: 'NAVIGATION',
        category: 'navigation',
        sections: sortedSections.filter(s => s.category === 'navigation'),
        isExpanded: expandedGroups.has('navigation')
      }
    ].filter(group => group.sections.length > 0);

    return groups;
  };

  useEffect(() => {
    if (isVisible) {
      const foundGroups = scanPageSections();
      setSectionGroups(foundGroups);
    }
  }, [isVisible]);

  const handleSectionClick = (section: PageSection) => {
    if (UniversalElementDetector.isEditableElement(section.element)) {
      const spartiElement = {
        element: section.element,
        data: UniversalElementDetector.extractElementData(section.element)
      };
      selectElement(spartiElement);
    }
    
    // Scroll to element
    section.element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  const toggleGroup = (groupCategory: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupCategory)) {
      newExpanded.delete(groupCategory);
    } else {
      newExpanded.add(groupCategory);
    }
    setExpandedGroups(newExpanded);
    
    // Update groups with new expanded state
    setSectionGroups(prev => prev.map(group => ({
      ...group,
      isExpanded: newExpanded.has(group.category)
    })));
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    
    // Update sections with new expanded state
    setSectionGroups(prev => prev.map(group => ({
      ...group,
      sections: group.sections.map(section => ({
        ...section,
        isExpanded: newExpanded.has(section.id)
      }))
    })));
  };

  if (!isVisible) return null;

  return (
    <div className="sparti-sidebar-left">
      <div className="sparti-sidebar-header">
        <h3 className="sparti-sidebar-title">Components</h3>
        <button 
          onClick={onToggle}
          className="sparti-btn sparti-btn-ghost sparti-btn-sm"
          title="Hide sidebar"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="sparti-sidebar-content">
        {sectionGroups.map((group) => (
          <div key={group.category} className="sparti-group">
            <button
              className="sparti-group-header"
              onClick={() => toggleGroup(group.category)}
            >
              <span className="sparti-group-title">{group.name}</span>
              {group.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {group.isExpanded && (
              <div className="sparti-group-content">
                {group.sections.map((section) => (
                  <div key={section.id} className="sparti-component-item">
                    <div 
                      className={`sparti-component-header ${
                        selectedElement?.element === section.element ? 'sparti-component-active' : ''
                      }`}
                      onClick={() => handleSectionClick(section)}
                    >
                      <div className="sparti-component-drag">
                        <GripVertical size={12} />
                      </div>
                      <div className="sparti-component-icon">
                        {React.createElement(getElementIcon(section.type), { size: 16 })}
                      </div>
                      <span className="sparti-component-name">{section.name}</span>
                      {section.children && (
                        <button
                          className="sparti-component-expand"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(section.id);
                          }}
                        >
                          {section.isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        </button>
                      )}
                    </div>

                    {section.children && section.isExpanded && (
                      <div className="sparti-component-children">
                        {section.children.map((child) => (
                          <div 
                            key={child.id} 
                            className={`sparti-child-component ${
                              selectedElement?.element === child.element ? 'sparti-component-active' : ''
                            }`}
                            onClick={() => handleSectionClick(child)}
                          >
                            <div className="sparti-component-drag">
                              <GripVertical size={10} />
                            </div>
                            <div className="sparti-component-icon">
                              {React.createElement(getElementIcon(child.type), { size: 14 })}
                            </div>
                            <span className="sparti-child-name">{child.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};