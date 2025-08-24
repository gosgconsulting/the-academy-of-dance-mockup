import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Database, List, Settings, Home, FileText, Users, Calendar, Image } from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';

/**
 * Admin Navigation Component
 * 
 * Left-side navigation panel that displays schema groups and items
 * from sparti.config.ts. Clicking a schema opens the SchemaModal.
 */

interface NavigationItem {
  schemaName: string;
  schemaType: 'singleton' | 'collection';
  label: string;
  icon: string;
  order: number;
}

interface NavigationGroup {
  name: string;
  items: NavigationItem[];
  isExpanded: boolean;
}

export const AdminNavigation: React.FC = () => {
  const { isEditing, config } = useSpartiBuilder();
  const [groups, setGroups] = useState<NavigationGroup[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<{
    itemType: 'singleton' | 'collection';
    itemName: string;
  } | null>(null);

  // Mock navigation data - in real implementation this would come from sparti.config.ts + database
  useEffect(() => {
    const mockGroups: NavigationGroup[] = [
      {
        name: 'Content',
        isExpanded: true,
        items: [
          { schemaName: 'homepage', schemaType: 'singleton', label: 'Homepage', icon: 'home', order: 1 },
          { schemaName: 'about-page', schemaType: 'singleton', label: 'About Page', icon: 'file-text', order: 2 },
          { schemaName: 'contact-page', schemaType: 'singleton', label: 'Contact Page', icon: 'file-text', order: 3 }
        ]
      },
      {
        name: 'Blog',
        isExpanded: false,
        items: [
          { schemaName: 'blog-posts', schemaType: 'collection', label: 'Blog Posts', icon: 'file-text', order: 1 },
          { schemaName: 'blog-categories', schemaType: 'collection', label: 'Categories', icon: 'list', order: 2 },
          { schemaName: 'blog-authors', schemaType: 'collection', label: 'Authors', icon: 'users', order: 3 }
        ]
      },
      {
        name: 'Programs',
        isExpanded: false,
        items: [
          { schemaName: 'dance-classes', schemaType: 'collection', label: 'Dance Classes', icon: 'calendar', order: 1 },
          { schemaName: 'instructors', schemaType: 'collection', label: 'Instructors', icon: 'users', order: 2 },
          { schemaName: 'schedules', schemaType: 'singleton', label: 'Class Schedules', icon: 'calendar', order: 3 }
        ]
      },
      {
        name: 'Events',
        isExpanded: false,
        items: [
          { schemaName: 'events', schemaType: 'collection', label: 'Events', icon: 'calendar', order: 1 },
          { schemaName: 'gallery-images', schemaType: 'collection', label: 'Gallery', icon: 'image', order: 2 },
          { schemaName: 'competitions', schemaType: 'collection', label: 'Competitions', icon: 'calendar', order: 3 }
        ]
      },
      {
        name: 'Settings',
        isExpanded: false,
        items: [
          { schemaName: 'site-config', schemaType: 'singleton', label: 'Site Configuration', icon: 'settings', order: 1 },
          { schemaName: 'navigation-menu', schemaType: 'singleton', label: 'Navigation Menu', icon: 'list', order: 2 },
          { schemaName: 'footer-content', schemaType: 'singleton', label: 'Footer Content', icon: 'file-text', order: 3 },
          { schemaName: 'social-links', schemaType: 'singleton', label: 'Social Links', icon: 'settings', order: 4 }
        ]
      }
    ];
    
    setGroups(mockGroups);
  }, []);

  const toggleGroup = (groupName: string) => {
    setGroups(prev => prev.map(group => 
      group.name === groupName 
        ? { ...group, isExpanded: !group.isExpanded }
        : group
    ));
  };

  const handleSchemaClick = (item: NavigationItem) => {
    setSelectedSchema(item.schemaName);
    setModalProps({
      itemType: item.schemaType,
      itemName: item.schemaName
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalProps(null);
    setSelectedSchema(null);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      home: Home,
      'file-text': FileText,
      list: List,
      users: Users,
      calendar: Calendar,
      image: Image,
      settings: Settings,
      database: Database
    };
    return icons[iconName] || FileText;
  };

  const getSchemaTypeIcon = (type: 'singleton' | 'collection') => {
    return type === 'singleton' ? Database : List;
  };

  if (!isEditing) return null;

  return (
    <>
      <div className="sparti-admin-navigation">
        <div className="sparti-nav-header">
          <h2 className="sparti-nav-title">Content Management</h2>
          <p className="sparti-nav-subtitle">Manage your website content</p>
        </div>

        <div className="sparti-nav-content">
          {groups.map((group) => (
            <div key={group.name} className="sparti-nav-group">
              <button
                className="sparti-nav-group-header"
                onClick={() => toggleGroup(group.name)}
              >
                <span className="sparti-nav-group-title">{group.name}</span>
                <div className="sparti-nav-group-toggle">
                  {group.isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </button>

              {group.isExpanded && (
                <div className="sparti-nav-group-items">
                  {group.items.map((item) => {
                    const IconComponent = getIcon(item.icon);
                    const TypeIcon = getSchemaTypeIcon(item.schemaType);
                    const isSelected = selectedSchema === item.schemaName;

                    return (
                      <button
                        key={item.schemaName}
                        className={`sparti-nav-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSchemaClick(item)}
                      >
                        <div className="sparti-nav-item-icon">
                          <IconComponent size={18} />
                        </div>
                        <div className="sparti-nav-item-content">
                          <span className="sparti-nav-item-label">{item.label}</span>
                          <div className="sparti-nav-item-meta">
                            <TypeIcon size={12} />
                            <span className="sparti-nav-item-type">{item.schemaType}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schema Modal */}
      {isModalOpen && modalProps && (
        <SchemaModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          itemType={modalProps.itemType}
          itemName={modalProps.itemName}
        />
      )}
    </>
  );
};