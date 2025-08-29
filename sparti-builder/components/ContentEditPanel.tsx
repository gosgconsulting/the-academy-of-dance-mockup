// Enhanced Content Edit Panel with component registry integration
import React, { useState } from 'react';
import { Type, Image, Video, Link, MousePointer, Settings, X, Save } from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';
import { ElementType } from '../types';
import { useSupabaseDatabase } from '../hooks/useSupabaseDatabase';
import { componentRegistry } from '../registry';
import { useToast } from '@/hooks/use-toast';

// Specialized editor components
import { TextEditor } from './editors/TextEditor';
import { ImageEditor } from './editors/ImageEditor';
import { ButtonEditor } from './editors/ButtonEditor';
import { ContainerEditor } from './editors/ContainerEditor';
import { SliderEditor } from './editors/SliderEditor';

export const ContentEditPanel: React.FC = () => {
  const { isEditing, selectedElement, selectElement } = useSpartiBuilder();
  const [isSaving, setIsSaving] = useState(false);
  const { components, isLoading, error } = useSupabaseDatabase();
  const { toast } = useToast();

  if (!isEditing || !selectedElement) return null;

  const { data } = selectedElement;
  const elementType = data.elementType;
  
  // Determine if this element should be saved as a component
  const isComponent = ['header', 'footer', 'sidebar', 'navigation'].includes(data.tagName);

  const getEditorIcon = (type: ElementType) => {
    const icons = {
      image: Image,
      slider: Image, // Use Image icon for sliders too
      video: Video,
      link: Link,
      button: MousePointer,
      input: Settings,
      text: Type,
      container: Settings,
      media: Image,
      unknown: Settings,
    };
    return icons[type] || Settings;
  };

  const renderSpecializedEditor = () => {
    const commonProps = { selectedElement };
    
    // Use SliderEditor for slider elements
    if (elementType === 'slider') {
      return <SliderEditor {...commonProps} />;
    }
    
    // Use ImageEditor for image elements or elements containing images
    if (elementType === 'image' || 
        elementType === 'media' || 
        data.tagName === 'IMG' || 
        selectedElement.element.querySelector('img') ||
        selectedElement.element.tagName === 'IMG') {
      return <ImageEditor {...commonProps} />;
    }
    
    // Check if component is registered in registry and use appropriate editor
    const registeredComponent = componentRegistry.get(elementType);
    if (registeredComponent) {
      console.log(`Using registered component: ${registeredComponent.name}`);
      
      // Use specific editor based on component definition
      switch (registeredComponent.editor) {
        case 'SliderEditor':
          return <SliderEditor {...commonProps} />;
        case 'ImageEditor':
          return <ImageEditor {...commonProps} />;
        case 'ButtonEditor':
          return <ButtonEditor {...commonProps} />;
        case 'ContainerEditor':
          return <ContainerEditor {...commonProps} />;
        case 'TextEditor':
        default:
          return <TextEditor {...commonProps} />;
      }
    }
    
    // Fallback for button elements
    if (elementType === 'button' || data.tagName === 'BUTTON') {
      return <ButtonEditor {...commonProps} />;
    }
    
    // Fallback: use TextEditor for all unregistered element types
    return <TextEditor {...commonProps} />;
  };

  const IconComponent = getEditorIcon(elementType);

  // Save the current element to the database as a component
  const saveToDatabase = async () => {
    setIsSaving(true);
    
    try {
      // Create a component object from the selected element
      const componentData = {
        name: data.id || `${data.tagName}-${Date.now()}`,
        type: data.tagName,
        content: data,
        styles: selectedElement.data.styles || {},
        is_active: true,
        is_global: false
      };
      
      // Try to get existing component by name first
      try {
        const allComponents = await components.getAll();
        const existingComponent = allComponents.find(comp => comp.name === componentData.name);
        
        if (existingComponent) {
          // Update existing component
          await components.update(existingComponent.id, componentData);
          toast({
            title: "Component Updated",
            description: `Component "${componentData.name}" has been updated successfully.`,
          });
        } else {
          // Create new component
          await components.create(componentData);
          toast({
            title: "Component Saved",
            description: `Component "${componentData.name}" has been saved to the database.`,
          });
        }
      } catch (err) {
        // If getting components fails, try to create a new one
        await components.create(componentData);
        toast({
          title: "Component Saved", 
          description: `Component "${componentData.name}" has been saved to the database.`,
        });
      }
      
    } catch (err: any) {
      console.error('Error saving component:', err);
      toast({
        title: "Save Failed",
        description: err.message || "Failed to save component to database",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="sparti-modal-backdrop" onClick={() => selectElement(null)}></div>
      <div className="sparti-edit-panel">
        <div className="sparti-edit-panel-header">
          <div className="sparti-edit-header-content">
            <IconComponent size={20} />
            <div>
              <h3>{elementType.charAt(0).toUpperCase() + elementType.slice(1)} Editor</h3>
              <p className="sparti-element-path">{data.tagName.toUpperCase()}</p>
              {componentRegistry.has(elementType) && (
                <div className="sparti-registry-status">
                  ✓ Registered Component
                </div>
              )}
            </div>
          </div>
          <div className="sparti-edit-panel-actions">
            <button 
              className={`sparti-btn sparti-btn-primary ${isSaving ? 'sparti-btn-loading' : ''}`}
              onClick={saveToDatabase}
              disabled={isSaving}
              aria-label="Save to database"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save to Database'}
            </button>
            <button 
              className="sparti-btn sparti-btn-ghost sparti-close-btn" 
              onClick={() => selectElement(null)}
              aria-label="Close editor"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="sparti-edit-panel-content">
          {error && (
            <div className="sparti-alert sparti-alert-error">
              {error}
            </div>
          )}
          {isLoading && (
            <div className="sparti-alert sparti-alert-info">
              Loading components...
            </div>
          )}
          {renderSpecializedEditor()}
        </div>
      </div>
    </>
  );
};