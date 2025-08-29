import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EditingContext, SpartiElement, SpartiBuilderConfig } from '../types';
import { PageSchemaGenerator } from '../services/PageSchemaGenerator';
import { ContentAPI } from '../services/ContentAPI';
import { SaveResponse } from '../types/content-schema';

interface SpartiBuilderContextType extends EditingContext {
  config: SpartiBuilderConfig;
  enterEditMode: () => void;
  exitEditMode: () => void;
  selectElement: (element: SpartiElement | null) => void;
  hoverElement: (element: SpartiElement | null) => void;
  savePage: () => Promise<SaveResponse>;
  isSaving: boolean;
}

const SpartiBuilderContext = createContext<SpartiBuilderContextType | null>(null);

interface SpartiBuilderProviderProps {
  children: ReactNode;
  config?: SpartiBuilderConfig;
}

export const SpartiBuilderProvider: React.FC<SpartiBuilderProviderProps> = ({
  children,
  config = { enabled: true, toolbar: true, autoDetect: true, contentAPI: true }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SpartiElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<SpartiElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const savePage = async (): Promise<SaveResponse> => {
    if (!config.contentAPI) {
      return { success: false, error: 'Content API not enabled' };
    }

    setIsSaving(true);
    try {
      const schema = PageSchemaGenerator.generatePageSchema();
      const result = await ContentAPI.savePage(schema);
      
      if (result.success) {
        console.log(`Page saved successfully (v${result.version})`);
      }
      
      return result;
    } catch (error) {
      console.error('Error saving page:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
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
    savePage,
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