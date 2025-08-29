// Enhanced Content Edit Panel with component registry integration
import React, { useState } from 'react';
import { Type, Image, Video, Link, MousePointer, Settings, X } from 'lucide-react';
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
  const { components, isLoading, error } = useSupabaseDatabase();

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