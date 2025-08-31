import React, { useState } from 'react';
import { Edit3, X, Save, Undo } from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';
import { ContentExtractor } from '../services/ContentExtractor';
import { ReactCodeGenerator } from '../services/ReactCodeGenerator';
import { FileSaveService } from '../services/FileSaveService';
import { SectionMappingService } from '../config/SectionMapping';

export const SpartiToolbar: React.FC = () => {
  const { isEditing, config, enterEditMode, exitEditMode } = useSpartiBuilder();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Extract modifications from the current DOM state
      const modifications = ContentExtractor.extractModifiedContent();
      
      if (modifications.size === 0) {
        setSaveMessage({ type: 'error', text: 'No changes detected to save.' });
        return;
      }

      console.log(`Found ${modifications.size} modifications to save:`, modifications);

      // Convert modifications to the format expected by FileSaveService
      const modificationsList: any[] = [];
      modifications.forEach((change, elementId) => {
        const sectionMapping = SectionMappingService.findMappingByComponentId(elementId);
        if (sectionMapping) {
          modificationsList.push({
            filePath: sectionMapping.filePath,
            elements: [{
              type: change.type || 'text',
              newText: change.newText || change.value,
              element: change.element
            }]
          });
        }
      });

      // Save modifications to Supabase database
      const result = await FileSaveService.saveModifications(modificationsList);

      if (result.success) {
        setSaveMessage({ type: 'success', text: result.message });
        ContentExtractor.clearHistory();
      } else {
        setSaveMessage({ type: 'error', text: `${result.message}${result.error ? ': ' + result.error : ''}` });
      }

    } catch (error) {
      console.error('Save operation failed:', error);
      setSaveMessage({ type: 'error', text: `Save failed: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setIsSaving(false);
      
      // Clear message after 5 seconds
      setTimeout(() => setSaveMessage(null), 5000);
    }
  };

  if (!config.toolbar) return null;

  return (
    <div className="sparti-toolbar">
      <div className="sparti-toolbar-content">
        <div className="sparti-toolbar-brand">
          <Edit3 size={20} />
          <span>Sparti Builder</span>
        </div>
        
        <div className="sparti-toolbar-actions">
          {!isEditing ? (
            <button 
              className="sparti-btn sparti-btn-primary" 
              onClick={enterEditMode}
            >
              <Edit3 size={16} />
              Edit with Sparti Builder
            </button>
          ) : (
            <>
              <button className="sparti-btn sparti-btn-ghost" title="Undo">
                <Undo size={16} />
              </button>
              <button 
                className={`sparti-btn sparti-btn-success ${isSaving ? 'sparti-btn-loading' : ''}`} 
                onClick={handleSave}
                disabled={isSaving}
                title="Save Changes to Source Code"
              >
                <Save size={16} />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button 
                className="sparti-btn sparti-btn-ghost" 
                onClick={exitEditMode}
                title="Exit Editor"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Save Status Message */}
      {saveMessage && (
        <div className={`sparti-save-message sparti-save-message-${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}
    </div>
  );
};