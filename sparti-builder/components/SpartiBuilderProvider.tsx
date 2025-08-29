import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EditingContext, SpartiElement, SpartiBuilderConfig } from '../types';
import { useSupabaseDatabase } from '../hooks/useSupabaseDatabase';
import { useToast } from '@/hooks/use-toast';

interface SpartiBuilderContextType extends EditingContext {
  config: SpartiBuilderConfig;
  enterEditMode: () => void;
  exitEditMode: () => void;
  selectElement: (element: SpartiElement | null) => void;
  hoverElement: (element: SpartiElement | null) => void;
  saveSelectedElement: () => Promise<void>;
  isSaving: boolean;
}

const SpartiBuilderContext = createContext<SpartiBuilderContextType | null>(null);

interface SpartiBuilderProviderProps {
  children: ReactNode;
  config?: SpartiBuilderConfig;
}

export const SpartiBuilderProvider: React.FC<SpartiBuilderProviderProps> = ({
  children,
  config = { enabled: true, toolbar: true, autoDetect: true }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SpartiElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<SpartiElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { components, currentTenant } = useSupabaseDatabase();
  const { toast } = useToast();

  const enterEditMode = () => {
    setIsEditing(true);
    document.body.classList.add('sparti-editing');
  };

  const exitEditMode = () => {
    setIsEditing(false);
    setSelectedElement(null);
    setHoveredElement(null);
    document.body.classList.remove('sparti-editing');
  };

  const selectElement = (element: SpartiElement | null) => {
    setSelectedElement(element);
  };

  const hoverElement = (element: SpartiElement | null) => {
    setHoveredElement(element);
  };

  const saveSelectedElement = async () => {
    if (!selectedElement) return;
    
    setIsSaving(true);
    
    try {
      const { data, element } = selectedElement;
      
      // Force update the content from any active editors before saving
      const allEditors = document.querySelectorAll('.ProseMirror');
      allEditors.forEach(editorElement => {
        if (editorElement && element.contains(editorElement)) {
          // If this element contains an active editor, get content from editor
          const editorContent = editorElement.innerHTML;
          element.innerHTML = editorContent;
          data.content = editorContent;
        }
      });
      
      // Get the latest content from the DOM element
      const currentContent = element.innerHTML;
      const currentTextContent = element.textContent || element.innerText || '';
      const currentStyles = window.getComputedStyle(element);
      
      // Extract relevant styles to save
      const stylesToSave = {
        color: currentStyles.color,
        backgroundColor: currentStyles.backgroundColor,
        fontSize: currentStyles.fontSize,
        fontFamily: currentStyles.fontFamily,
        fontWeight: currentStyles.fontWeight,
        textAlign: currentStyles.textAlign,
        padding: currentStyles.padding,
        margin: currentStyles.margin,
        border: currentStyles.border,
        borderRadius: currentStyles.borderRadius,
        // Add any custom styles from data
        ...selectedElement.data.styles
      };
      
      // Update the selectedElement data to match current content
      selectedElement.data.content = currentContent;
      selectedElement.data.textContent = currentTextContent;
      
      // Create a component object from the selected element
      const componentData = {
        name: data.id || `${data.tagName}-${Date.now()}`,
        type: data.elementType || data.tagName,
        content: {
          ...data,
          content: currentContent,
          textContent: currentTextContent,
          innerHTML: currentContent
        },
        styles: stylesToSave,
        is_active: true,
        is_global: false
      };
      
      console.log('Saving component data:', componentData);
      
      // Try to get existing component by name first
      try {
        const allComponents = await components.getAll();
        const existingComponent = allComponents.find(comp => comp.name === componentData.name);
        
        if (existingComponent) {
          // Update existing component
          await components.update(existingComponent.id, componentData);
          toast({
            title: "Component Updated",
            description: `Component "${componentData.name}" has been updated successfully for tenant ${currentTenant?.name || 'TAOD'}.`,
          });
        } else {
          // Create new component
          await components.create(componentData);
          toast({
            title: "Component Saved",
            description: `Component "${componentData.name}" has been saved to the database for tenant ${currentTenant?.name || 'TAOD'}.`,
          });
        }
      } catch (err) {
        // If getting components fails, try to create a new one
        await components.create(componentData);
        toast({
          title: "Component Saved", 
          description: `Component "${componentData.name}" has been saved to the database for tenant ${currentTenant?.name || 'TAOD'}.`,
        });
      }
      
      // After successful save, ensure the element content persists
      setTimeout(() => {
        if (element && element.isConnected) {
          element.innerHTML = currentContent;
          // Force a style recalculation to ensure changes are visible
          element.style.display = 'none';
          element.offsetHeight; // Trigger reflow
          element.style.display = '';
          
          console.log('Post-save: Content restored to element', {
            elementTagName: element.tagName,
            currentContent,
            elementContent: element.innerHTML
          });
        }
      }, 100);
      
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

  const contextValue: SpartiBuilderContextType = {
    config,
    isEditing,
    selectedElement,
    hoveredElement,
    enterEditMode,
    exitEditMode,
    selectElement,
    hoverElement,
    saveSelectedElement,
    isSaving,
  };

  return (
    <SpartiBuilderContext.Provider value={contextValue}>
      {children}
    </SpartiBuilderContext.Provider>
  );
};

export const useSpartiBuilder = () => {
  const context = useContext(SpartiBuilderContext);
  if (!context) {
    throw new Error('useSpartiBuilder must be used within SpartiBuilderProvider');
  }
  return context;
};