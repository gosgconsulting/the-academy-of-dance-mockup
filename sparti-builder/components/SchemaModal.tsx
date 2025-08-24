@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { X, Database, List, Edit3, Eye, Settings } from 'lucide-react';
-import { CMSSchema, CMSSchemaSection, SchemaModalProps } from '../types/cms-types';
-import { getSchemaForEditing } from '../services/cms-service';
+import { X, Database, List, Edit3, Eye, Settings, AlertCircle, RefreshCw } from 'lucide-react';

+// Mock types for now - will be replaced with actual CMS types
+interface MockSchema {
+  id: string;
+  schema_type: 'singleton' | 'collection';
+  schema_name: string;
+  schema_definition: {
+    label: string;
+    description: string;
+  };
+  ui_config: {
+    group: string;
+    icon: string;
+    order: number;
+  };
+}
+
+interface MockSection {
+  id: string;
+  section_name: string;
+  section_type: 'object' | 'array' | 'field';
+  section_definition: {
+    label: string;
+    description: string;
+    fields: Record<string, any>;
+  };
+  display_order: number;
+  is_editable: boolean;
+}
+
+interface SchemaModalProps {
+  isOpen: boolean;
+  onClose: () => void;
+  itemType: 'singleton' | 'collection';
+  itemName: string;
+}

 /**
  * Schema Modal Component
  * 
- * Main editing interface for CMS schemas. Opens as a centered modal
- * displaying schema information and all editable sections.
+ * Visual Editor Schema Modal - displays schema overview and section list
+ * for content management. Modal-first UX with no sidebar.
  * 
- * This is the primary editing interface - no sidebar is used.
+ * User Flow:
+ * 1. Click schema in admin navigation
+ * 2. Modal opens showing schema overview
+ * 3. Click section to edit (planned - not yet implemented)
+ * 4. Close modal to return to navigation
  */

 export const SchemaModal: React.FC<SchemaModalProps> = ({
   isOpen,
   onClose,
   itemType,
   itemName
 }) => {
-  const [schema, setSchema] = useState<CMSSchema | null>(null);
-  const [sections, setSections] = useState<CMSSchemaSection[]>([]);
+  const [schema, setSchema] = useState<MockSchema | null>(null);
+  const [sections, setSections] = useState<MockSection[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   // Load schema and sections when modal opens
   useEffect(() => {
     if (isOpen && itemName) {
       loadSchemaData();
     }
   }, [isOpen, itemName]);

+  // Mock data loading - will be replaced with actual CMS service calls
   const loadSchemaData = async () => {
     setIsLoading(true);
     setError(null);
     
     try {
-      const data = await getSchemaForEditing(itemName);
-      
-      if (!data) {
-        setError(`Schema "${itemName}" not found or inactive`);
-        return;
-      }
-      
-      setSchema(data.schema);
-      setSections(data.sections);
+      // Simulate API call delay
+      await new Promise(resolve => setTimeout(resolve, 800));
+      
+      // Mock schema data based on itemName
+      const mockSchemaData = getMockSchemaData(itemName, itemType);
+      
+      if (!mockSchemaData) {
+        setError(`Schema "${itemName}" not found or inactive`);
+        return;
+      }
+      
+      setSchema(mockSchemaData.schema);
+      setSections(mockSchemaData.sections);
     } catch (err: any) {
       setError(err.message || 'Failed to load schema data');
       console.error('Error loading schema:', err);
     } finally {
       setIsLoading(false);
     }
   };

+  // Mock data generator - will be replaced with actual database calls
+  const getMockSchemaData = (schemaName: string, schemaType: 'singleton' | 'collection') => {
+    const schemaLabels: Record<string, string> = {
+      'homepage': 'Homepage',
+      'about-page': 'About Page',
+      'contact-page': 'Contact Page',
+      'blog-posts': 'Blog Posts',
+      'blog-categories': 'Blog Categories',
+      'blog-authors': 'Blog Authors',
+      'dance-classes': 'Dance Classes',
+      'instructors': 'Instructors',
+      'schedules': 'Class Schedules',
+      'events': 'Events',
+      'gallery-images': 'Gallery Images',
+      'competitions': 'Competitions',
+      'site-config': 'Site Configuration',
+      'navigation-menu': 'Navigation Menu',
+      'footer-content': 'Footer Content',
+      'social-links': 'Social Links'
+    };
+
+    const mockSchema: MockSchema = {
+      id: `schema-${schemaName}`,
+      schema_type: schemaType,
+      schema_name: schemaName,
+      schema_definition: {
+        label: schemaLabels[schemaName] || schemaName,
+        description: `${schemaType === 'singleton' ? 'Single page' : 'Collection of items'} for ${schemaLabels[schemaName] || schemaName}`
+      },
+      ui_config: {
+        group: 'Content',
+        icon: 'file-text',
+        order: 1
+      }
+    };

+    const mockSections: MockSection[] = [
+      {
+        id: `section-${schemaName}-hero`,
+        section_name: 'hero',
+        section_type: 'object',
+        section_definition: {
+          label: 'Hero Section',
+          description: 'Main hero area with title and call-to-action',
+          fields: {
+            title: { type: 'text', label: 'Hero Title' },
+            subtitle: { type: 'text', label: 'Hero Subtitle' },
+            cta_text: { type: 'text', label: 'CTA Button Text' },
+            background_image: { type: 'image', label: 'Background Image' }
+          }
+        },
+        display_order: 1,
+        is_editable: true
+      },
+      {
+        id: `section-${schemaName}-content`,
+        section_name: 'content',
+        section_type: 'object',
+        section_definition: {
+          label: 'Main Content',
+          description: 'Primary content area with text and media',
+          fields: {
+            heading: { type: 'text', label: 'Content Heading' },
+            body: { type: 'rich-text', label: 'Content Body' },
+            featured_image: { type: 'image', label: 'Featured Image' }
+          }
+        },
+        display_order: 2,
+        is_editable: true
+      },
+      {
+        id: `section-${schemaName}-features`,
+        section_name: 'features',
+        section_type: 'array',
+        section_definition: {
+          label: 'Features List',
+          description: 'List of features or highlights',
+          fields: {
+            title: { type: 'text', label: 'Feature Title' },
+            description: { type: 'textarea', label: 'Feature Description' },
+            icon: { type: 'text', label: 'Icon Name' }
+          }
+        },
+        display_order: 3,
+        is_editable: true
+      }
+    ];

+    return { schema: mockSchema, sections: mockSections };
+  };

   const handleSectionEdit = (section: MockSection) => {
-    // TODO: Open section editor
-    console.log('Edit section:', section.section_name);
+    // TODO: Open section editor - not yet implemented
+    alert(`Section editing not yet implemented.\n\nWould edit: ${section.section_definition.label}\nSection: ${section.section_name}\nType: ${section.section_type}`);
   };

-  const handleSectionReorder = (reorderedSections: CMSSchemaSection[]) => {
+  const handleSectionReorder = (reorderedSections: MockSection[]) => {
     // TODO: Implement section reordering
     setSections(reorderedSections);
   };

+  const handleKeyDown = (e: KeyboardEvent) => {
+    if (e.key === 'Escape') {
+      onClose();
+    }
+  };
+
+  useEffect(() => {
+    if (isOpen) {
+      document.addEventListener('keydown', handleKeyDown);
+      document.body.style.overflow = 'hidden';
+    } else {
+      document.removeEventListener('keydown', handleKeyDown);
+      document.body.style.overflow = '';
+    }
+
+    return () => {
+      document.removeEventListener('keydown', handleKeyDown);
+      document.body.style.overflow = '';
+    };
+  }, [isOpen]);

   const getSchemaTypeIcon = (type: string) => {
     return type === 'singleton' ? Database : List;
   };

   const getSectionTypeIcon = (type: string) => {
     const icons = {
       object: Settings,
       array: List,
       field: Edit3
     };
     return icons[type as keyof typeof icons] || Settings;
   };

   const getSectionTypeColor = (type: string) => {
     const colors = {
-      object: 'text-blue-600',
-      array: 'text-green-600', 
-      field: 'text-purple-600'
+      object: '#3b82f6',
+      array: '#10b981', 
+      field: '#8b5cf6'
     };
-    return colors[type as keyof typeof colors] || 'text-gray-600';
+    return colors[type as keyof typeof colors] || '#6b7280';
   };

   if (!isOpen) return null;

   return (
     <div className="sparti-modal-overlay">
-      <div className="sparti-modal-backdrop" onClick={onClose} />
+      <div 
+        className="sparti-modal-backdrop" 
+        onClick={onClose}
+        role="presentation"
+      />
       
-      <div className="sparti-modal-container">
+      <div 
+        className="sparti-modal-container"
+        role="dialog"
+        aria-modal="true"
+        aria-labelledby="schema-modal-title"
+        aria-describedby="schema-modal-description"
+      >
         <div className="sparti-modal-content">
           
           {/* Modal Header */}
           <div className="sparti-modal-header">
             <div className="sparti-modal-title-section">
-              {schema && (
-                <>
-                  <div className="sparti-schema-icon">
-                    {React.createElement(getSchemaTypeIcon(schema.schema_type), {
-                      size: 24,
-                      className: 'text-primary'
-                    })}
-                  </div>
-                  <div>
-                    <h2 className="sparti-modal-title">
-                      {schema.schema_definition.label}
-                    </h2>
-                    <p className="sparti-modal-subtitle">
-                      {schema.schema_type} • {sections.length} sections
-                    </p>
-                  </div>
-                </>
-              )}
+              <div className="sparti-schema-icon">
+                <Edit3 size={24} />
+              </div>
+              <div>
+                <h2 id="schema-modal-title" className="sparti-modal-title">
+                  Visual Editor Schema
+                </h2>
+                <p id="schema-modal-description" className="sparti-modal-subtitle">
+                  {itemName} → {itemType}
+                </p>
+              </div>
             </div>
             
             <button 
               onClick={onClose}
               className="sparti-modal-close"
               aria-label="Close modal"
             >
               <X size={20} />
             </button>
           </div>

           {/* Modal Body */}
           <div className="sparti-modal-body">
             {isLoading && (
               <div className="sparti-loading-state">
-                <div className="sparti-spinner" />
-                <p>Loading schema data...</p>
+                <div className="sparti-spinner" aria-hidden="true" />
+                <p>Loading schema...</p>
               </div>
             )}

             {error && (
               <div className="sparti-error-state">
-                <p className="sparti-error-message">{error}</p>
+                <AlertCircle size={48} className="sparti-error-icon" />
+                <h3 className="sparti-error-title">Failed to load schema</h3>
+                <p className="sparti-error-message">{error}</p>
                 <button 
                   onClick={loadSchemaData}
                   className="sparti-retry-button"
                 >
+                  <RefreshCw size={16} />
                   Retry
                 </button>
               </div>
             )}

             {schema && !isLoading && !error && (
               <>
                 {/* Schema Overview */}
                 <div className="sparti-schema-overview">
-                  <h3 className="sparti-section-title">Schema Information</h3>
-                  <div className="sparti-info-grid">
-                    <div className="sparti-info-item">
-                      <span className="sparti-info-label">Type:</span>
-                      <span className="sparti-info-value">{schema.schema_type}</span>
-                    </div>
-                    <div className="sparti-info-item">
-                      <span className="sparti-info-label">Name:</span>
-                      <span className="sparti-info-value">{schema.schema_name}</span>
-                    </div>
-                    <div className="sparti-info-item">
-                      <span className="sparti-info-label">Group:</span>
-                      <span className="sparti-info-value">{schema.ui_config.group}</span>
-                    </div>
-                    <div className="sparti-info-item">
-                      <span className="sparti-info-label">Version:</span>
-                      <span className="sparti-info-value">v{schema.version}</span>
+                  <div className="sparti-overview-header">
+                    <div className="sparti-overview-icon">
+                      {React.createElement(getSchemaTypeIcon(schema.schema_type), {
+                        size: 32
+                      })}
                     </div>
+                    <div className="sparti-overview-info">
+                      <h3 className="sparti-overview-title">
+                        {schema.schema_definition.label}
+                      </h3>
+                      <p className="sparti-overview-meta">
+                        {schema.schema_type} • {sections.length} editable sections
+                      </p>
+                    </div>
                   </div>
                   {schema.schema_definition.description && (
-                    <p className="sparti-schema-description">
+                    <p className="sparti-overview-description">
                       {schema.schema_definition.description}
                     </p>
                   )}
                 </div>

                 {/* Sections List */}
                 <div className="sparti-sections-container">
                   <div className="sparti-sections-header">
-                    <h3 className="sparti-section-title">
-                      Editable Sections ({sections.length})
-                    </h3>
+                    <h3 className="sparti-sections-title">Sections</h3>
                     <p className="sparti-sections-subtitle">
                       Click on a section to edit its content and structure
                     </p>
                   </div>

                   {sections.length === 0 ? (
                     <div className="sparti-empty-state">
-                      <List className="sparti-empty-icon" size={48} />
+                      <Database className="sparti-empty-icon" size={48} />
                       <h4 className="sparti-empty-title">No Editable Sections</h4>
                       <p className="sparti-empty-description">
-                        This schema doesn't have any editable sections yet.
-                        Contact your administrator to add sections.
+                        No sections defined for this schema.
                       </p>
                     </div>
                   ) : (
-                    <div className="sparti-sections-list">
-                      {sections.map((section, index) => {
-                        const SectionIcon = getSectionTypeIcon(section.section_type);
-                        
-                        return (
-                          <div 
-                            key={section.id}
-                            className="sparti-section-item"
-                            onClick={() => handleSectionEdit(section)}
-                          >
-                            <div className="sparti-section-content">
-                              <div className="sparti-section-header">
-                                <div className="sparti-section-icon-container">
-                                  <SectionIcon 
-                                    size={20} 
-                                    className={getSectionTypeColor(section.section_type)}
-                                  />
-                                </div>
-                                <div className="sparti-section-info">
-                                  <h4 className="sparti-section-name">
-                                    {section.section_definition.label}
-                                  </h4>
-                                  <p className="sparti-section-meta">
-                                    {section.section_type} • {section.section_name}
-                                  </p>
-                                </div>
-                              </div>
-                              
-                              {section.section_definition.description && (
-                                <p className="sparti-section-description">
-                                  {section.section_definition.description}
-                                </p>
-                              )}
-                              
-                              <div className="sparti-section-fields">
-                                <span className="sparti-field-count">
-                                  {Object.keys(section.section_definition.fields || {}).length} fields
-                                </span>
-                                <div className="sparti-field-types">
-                                  {Object.values(section.section_definition.fields || {})
-                                    .slice(0, 3)
-                                    .map((field: any, idx) => (
-                                      <span key={idx} className="sparti-field-type">
-                                        {field.type}
-                                      </span>
-                                    ))
-                                  }
-                                  {Object.keys(section.section_definition.fields || {}).length > 3 && (
-                                    <span className="sparti-field-more">
-                                      +{Object.keys(section.section_definition.fields || {}).length - 3} more
-                                    </span>
-                                  )}
-                                </div>
-                              </div>
-                            </div>
-                            
-                            <div className="sparti-section-actions">
-                              <button 
-                                className="sparti-section-edit-btn"
-                                onClick={(e) => {
-                                  e.stopPropagation();
-                                  handleSectionEdit(section);
-                                }}
-                                title="Edit section content"
-                              >
-                                <Edit3 size={16} />
-                              </button>
-                              <button 
-                                className="sparti-section-view-btn"
-                                onClick={(e) => {
-                                  e.stopPropagation();
-                                  // TODO: View section content
-                                }}
-                                title="View section details"
-                              >
-                                <Eye size={16} />
-                              </button>
-                            </div>
-                          </div>
-                        );
-                      })}
+                    <div className="sparti-sections-table">
+                      <div className="sparti-table-header">
+                        <div className="sparti-table-cell sparti-table-header-cell">Section Name</div>
+                        <div className="sparti-table-cell sparti-table-header-cell">Type</div>
+                        <div className="sparti-table-cell sparti-table-header-cell">Description</div>
+                        <div className="sparti-table-cell sparti-table-header-cell">Actions</div>
+                      </div>
+                      
+                      <div className="sparti-table-body">
+                        {sections.map((section) => {
+                          const SectionIcon = getSectionTypeIcon(section.section_type);
+                          const fieldCount = Object.keys(section.section_definition.fields || {}).length;
+                          
+                          return (
+                            <div 
+                              key={section.id}
+                              className="sparti-table-row"
+                              onClick={() => handleSectionEdit(section)}
+                              role="button"
+                              tabIndex={0}
+                              onKeyDown={(e) => {
+                                if (e.key === 'Enter' || e.key === ' ') {
+                                  e.preventDefault();
+                                  handleSectionEdit(section);
+                                }
+                              }}
+                            >
+                              <div className="sparti-table-cell">
+                                <div className="sparti-section-name-cell">
+                                  <div 
+                                    className="sparti-section-type-icon"
+                                    style={{ color: getSectionTypeColor(section.section_type) }}
+                                  >
+                                    <SectionIcon size={16} />
+                                  </div>
+                                  <div>
+                                    <div className="sparti-section-label">
+                                      {section.section_definition.label}
+                                    </div>
+                                    <div className="sparti-section-key">
+                                      {section.section_name}
+                                    </div>
+                                  </div>
+                                </div>
+                              </div>
+                              
+                              <div className="sparti-table-cell">
+                                <span 
+                                  className="sparti-type-badge"
+                                  style={{ 
+                                    backgroundColor: getSectionTypeColor(section.section_type) + '20',
+                                    color: getSectionTypeColor(section.section_type)
+                                  }}
+                                >
+                                  {section.section_type}
+                                </span>
+                              </div>
+                              
+                              <div className="sparti-table-cell">
+                                <div className="sparti-section-description-cell">
+                                  <p className="sparti-section-description">
+                                    {section.section_definition.description || 'No description'}
+                                  </p>
+                                  <p className="sparti-section-fields-info">
+                                    {fieldCount} field{fieldCount !== 1 ? 's' : ''}
+                                  </p>
+                                </div>
+                              </div>
+                              
+                              <div className="sparti-table-cell">
+                                <div className="sparti-section-actions">
+                                  <button 
+                                    className="sparti-action-btn sparti-edit-btn"
+                                    onClick={(e) => {
+                                      e.stopPropagation();
+                                      handleSectionEdit(section);
+                                    }}
+                                    title="Edit section content"
+                                    aria-label={`Edit ${section.section_definition.label}`}
+                                  >
+                                    <Edit3 size={14} />
+                                  </button>
+                                  <button 
+                                    className="sparti-action-btn sparti-view-btn"
+                                    onClick={(e) => {
+                                      e.stopPropagation();
+                                      alert(`View details for: ${section.section_definition.label}`);
+                                    }}
+                                    title="View section details"
+                                    aria-label={`View details for ${section.section_definition.label}`}
+                                  >
+                                    <Eye size={14} />
+                                  </button>
+                                </div>
+                              </div>
+                            </div>
+                          );
+                        })}
+                      </div>
                     </div>
                   )}
                 </div>
               </>
             )}
           </div>

           {/* Modal Footer */}
           <div className="sparti-modal-footer">
-            <div className="sparti-modal-actions">
-              <button 
-                onClick={onClose}
-                className="sparti-btn sparti-btn-secondary"
-              >
-                Close
-              </button>
-              {schema && (
-                <button 
-                  className="sparti-btn sparti-btn-primary"
-                  onClick={() => {
-                    // TODO: Open schema settings
-                    console.log('Open schema settings for:', schema.schema_name);
-                  }}
-                >
-                  <Settings size={16} />
-                  Schema Settings
-                </button>
-              )}
-            </div>
+            <button 
+              onClick={onClose}
+              className="sparti-btn sparti-btn-primary"
+            >
+              Close
+            </button>
           </div>
         </div>
       </div>
     </div>
   );
 };

-// CSS Styles for the modal (injected into DOM)
-const MODAL_STYLES = `
-.sparti-modal-overlay {
-  position: fixed;
-  top: 0;
-  left: 0;
-  right: 0;
-  bottom: 0;
-  z-index: 2147483647;
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  padding: 1rem;
-}
-
-.sparti-modal-backdrop {
-  position: absolute;
-  inset: 0;
-  background: rgba(0, 0, 0, 0.5);
-  backdrop-filter: blur(4px);
-}
-
-.sparti-modal-container {
-  position: relative;
-  width: 100%;
-  max-width: 800px;
-  max-height: 90vh;
-  background: white;
-  border-radius: 12px;
-  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
-  display: flex;
-  flex-direction: column;
-  overflow: hidden;
-}
-
-.sparti-modal-content {
-  display: flex;
-  flex-direction: column;
-  height: 100%;
-}
-
-.sparti-modal-header {
-  display: flex;
-  align-items: center;
-  justify-content: space-between;
-  padding: 1.5rem;
-  border-bottom: 1px solid #e5e7eb;
-  background: #f9fafb;
-}
-
-.sparti-modal-title-section {
-  display: flex;
-  align-items: center;
-  gap: 1rem;
-}
-
-.sparti-schema-icon {
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  width: 48px;
-  height: 48px;
-  background: #f3f4f6;
-  border-radius: 8px;
-}
-
-.sparti-modal-title {
-  font-size: 1.5rem;
-  font-weight: 700;
-  color: #111827;
-  margin: 0;
-}
-
-.sparti-modal-subtitle {
-  font-size: 0.875rem;
-  color: #6b7280;
-  margin: 0;
-  text-transform: capitalize;
-}
-
-.sparti-modal-close {
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  width: 40px;
-  height: 40px;
-  border: none;
-  background: transparent;
-  border-radius: 6px;
-  color: #6b7280;
-  cursor: pointer;
-  transition: all 0.2s;
-}
-
-.sparti-modal-close:hover {
-  background: #f3f4f6;
-  color: #374151;
-}
-
-.sparti-modal-body {
-  flex: 1;
-  overflow-y: auto;
-  padding: 1.5rem;
-}
-
-.sparti-loading-state {
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  padding: 3rem;
-  text-align: center;
-}
-
-.sparti-spinner {
-  width: 32px;
-  height: 32px;
-  border: 3px solid #f3f4f6;
-  border-top: 3px solid #3b82f6;
-  border-radius: 50%;
-  animation: spin 1s linear infinite;
-  margin-bottom: 1rem;
-}
-
-@keyframes spin {
-  0% { transform: rotate(0deg); }
-  100% { transform: rotate(360deg); }
-}
-
-.sparti-error-state {
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  padding: 3rem;
-  text-align: center;
-}
-
-.sparti-error-message {
-  color: #dc2626;
-  margin-bottom: 1rem;
-}
-
-.sparti-retry-button {
-  padding: 0.5rem 1rem;
-  background: #3b82f6;
-  color: white;
-  border: none;
-  border-radius: 6px;
-  cursor: pointer;
-  transition: background 0.2s;
-}
-
-.sparti-retry-button:hover {
-  background: #2563eb;
-}
-
-.sparti-schema-info {
-  background: #f9fafb;
-  border: 1px solid #e5e7eb;
-  border-radius: 8px;
-  padding: 1.5rem;
-  margin-bottom: 2rem;
-}
-
-.sparti-section-title {
-  font-size: 1.125rem;
-  font-weight: 600;
-  color: #111827;
-  margin: 0 0 1rem 0;
-}
-
-.sparti-info-grid {
-  display: grid;
-  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
-  gap: 1rem;
-  margin-bottom: 1rem;
-}
-
-.sparti-info-item {
-  display: flex;
-  justify-content: space-between;
-  align-items: center;
-}
-
-.sparti-info-label {
-  font-weight: 500;
-  color: #6b7280;
-}
-
-.sparti-info-value {
-  font-weight: 600;
-  color: #111827;
-}
-
-.sparti-schema-description {
-  color: #6b7280;
-  font-style: italic;
-  margin: 0;
-}
-
-.sparti-sections-container {
-  margin-top: 2rem;
-}
-
-.sparti-sections-header {
-  margin-bottom: 1.5rem;
-}
-
-.sparti-sections-subtitle {
-  color: #6b7280;
-  margin: 0.5rem 0 0 0;
-}
-
-.sparti-empty-state {
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  padding: 3rem;
-  text-align: center;
-  border: 2px dashed #d1d5db;
-  border-radius: 8px;
-}
-
-.sparti-empty-icon {
-  color: #9ca3af;
-  margin-bottom: 1rem;
-}
-
-.sparti-empty-title {
-  font-size: 1.125rem;
-  font-weight: 600;
-  color: #374151;
-  margin: 0 0 0.5rem 0;
-}
-
-.sparti-empty-description {
-  color: #6b7280;
-  margin: 0;
-}
-
-.sparti-sections-list {
-  display: flex;
-  flex-direction: column;
-  gap: 0.75rem;
-}
-
-.sparti-section-item {
-  display: flex;
-  align-items: center;
-  justify-content: space-between;
-  padding: 1rem;
-  background: white;
-  border: 1px solid #e5e7eb;
-  border-radius: 8px;
-  cursor: pointer;
-  transition: all 0.2s;
-}
-
-.sparti-section-item:hover {
-  border-color: #3b82f6;
-  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
-  transform: translateY(-1px);
-}
-
-.sparti-section-content {
-  flex: 1;
-  min-width: 0;
-}
-
-.sparti-section-header {
-  display: flex;
-  align-items: center;
-  gap: 0.75rem;
-  margin-bottom: 0.5rem;
-}
-
-.sparti-section-icon-container {
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  width: 32px;
-  height: 32px;
-  background: #f3f4f6;
-  border-radius: 6px;
-}
-
-.sparti-section-info {
-  flex: 1;
-  min-width: 0;
-}
-
-.sparti-section-name {
-  font-size: 1rem;
-  font-weight: 600;
-  color: #111827;
-  margin: 0;
-}
-
-.sparti-section-meta {
-  font-size: 0.75rem;
-  color: #6b7280;
-  margin: 0;
-  text-transform: capitalize;
-}
-
-.sparti-section-description {
-  color: #6b7280;
-  font-size: 0.875rem;
-  margin: 0.5rem 0;
-  line-height: 1.4;
-}
-
-.sparti-section-fields {
-  display: flex;
-  align-items: center;
-  gap: 1rem;
-  margin-top: 0.5rem;
-}
-
-.sparti-field-count {
-  font-size: 0.75rem;
-  color: #6b7280;
-  font-weight: 500;
-}
-
-.sparti-field-types {
-  display: flex;
-  gap: 0.5rem;
-  flex-wrap: wrap;
-}
-
-.sparti-field-type {
-  font-size: 0.625rem;
-  padding: 0.125rem 0.375rem;
-  background: #e5e7eb;
-  color: #374151;
-  border-radius: 4px;
-  font-weight: 500;
-}
-
-.sparti-field-more {
-  font-size: 0.625rem;
-  color: #9ca3af;
-  font-style: italic;
-}
-
-.sparti-section-actions {
-  display: flex;
-  gap: 0.5rem;
-  margin-left: 1rem;
-}
-
-.sparti-section-edit-btn,
-.sparti-section-view-btn {
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  width: 32px;
-  height: 32px;
-  border: 1px solid #d1d5db;
-  background: white;
-  border-radius: 6px;
-  color: #6b7280;
-  cursor: pointer;
-  transition: all 0.2s;
-}
-
-.sparti-section-edit-btn:hover {
-  border-color: #3b82f6;
-  color: #3b82f6;
-  background: #eff6ff;
-}
-
-.sparti-section-view-btn:hover {
-  border-color: #10b981;
-  color: #10b981;
-  background: #ecfdf5;
-}
-
-.sparti-modal-footer {
-  padding: 1.5rem;
-  border-top: 1px solid #e5e7eb;
-  background: #f9fafb;
-}
-
-.sparti-modal-actions {
-  display: flex;
-  justify-content: space-between;
-  align-items: center;
-}
-
-.sparti-btn {
-  display: inline-flex;
-  align-items: center;
-  gap: 0.5rem;
-  padding: 0.5rem 1rem;
-  border-radius: 6px;
-  font-size: 0.875rem;
-  font-weight: 500;
-  border: none;
-  cursor: pointer;
-  transition: all 0.2s;
-}
-
-.sparti-btn-primary {
-  background: #3b82f6;
-  color: white;
-}
-
-.sparti-btn-primary:hover {
-  background: #2563eb;
-}
-
-.sparti-btn-secondary {
-  background: #f3f4f6;
-  color: #374151;
-  border: 1px solid #d1d5db;
-}
-
-.sparti-btn-secondary:hover {
-  background: #e5e7eb;
-}
-
-/* Responsive Design */
-@media (max-width: 768px) {
-  .sparti-modal-container {
-    max-width: 95vw;
-    max-height: 95vh;
-    margin: 0.5rem;
-  }
-  
-  .sparti-modal-header {
-    padding: 1rem;
-  }
-  
-  .sparti-modal-body {
-    padding: 1rem;
-  }
-  
-  .sparti-modal-footer {
-    padding: 1rem;
-  }
-  
-  .sparti-info-grid {
-    grid-template-columns: 1fr;
-  }
-  
-  .sparti-section-item {
-    flex-direction: column;
-    align-items: stretch;
-  }
-  
-  .sparti-section-actions {
-    margin-left: 0;
-    margin-top: 1rem;
-    justify-content: flex-end;
-  }
-}
-
-/* Dark mode support */
-@media (prefers-color-scheme: dark) {
-  .sparti-modal-container {
-    background: #1f2937;
-    color: #f9fafb;
-  }
-  
-  .sparti-modal-header {
-    background: #111827;
-    border-bottom-color: #374151;
-  }
-  
-  .sparti-modal-title {
-    color: #f9fafb;
-  }
-  
-  .sparti-schema-info {
-    background: #111827;
-    border-color: #374151;
-  }
-  
-  .sparti-section-item {
-    background: #1f2937;
-    border-color: #374151;
-  }
-  
-  .sparti-section-item:hover {
-    border-color: #3b82f6;
-  }
-  
-  .sparti-modal-footer {
-    background: #111827;
-    border-top-color: #374151;
-  }
-}
-`;
-
-// Inject styles when component mounts
-if (typeof document !== 'undefined') {
-  const styleId = 'sparti-modal-styles';
-  if (!document.getElementById(styleId)) {
-    const style = document.createElement('style');
-    style.id = styleId;
-    style.textContent = MODAL_STYLES;
-    document.head.appendChild(style);
-  }
-}

 export default SchemaModal;