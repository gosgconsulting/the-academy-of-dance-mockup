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
  const { components } = useSupabaseDatabase();
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
      const { data } = selectedElement;
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