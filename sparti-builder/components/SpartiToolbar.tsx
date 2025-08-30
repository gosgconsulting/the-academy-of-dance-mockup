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
      const modifications = ContentExtractor.extractModifiedContent();
      
      if (modifications.size === 0) {
        setSaveMessage({ type: 'error', text: 'No changes to save' });
        return;
      }

      // Group modifications by section/component
      const sectionChanges = new Map<string, any[]>();
      
      modifications.forEach((change, elementId) => {
        const mapping = SectionMappingService.findMappingByComponentId(elementId);
        if (mapping) {
          if (!sectionChanges.has(mapping.filePath)) {
            sectionChanges.set(mapping.filePath, []);
          }
          sectionChanges.get(mapping.filePath)!.push(change);
        }
      });

      // Save each modified section
      let saveCount = 0;
      for (const [filePath, changes] of sectionChanges) {
        try {
          // In a real implementation, you'd read the original file content first
          // For demo purposes, we'll use a placeholder
          const originalContent = '// Original component content would be loaded here';
          
          const componentData = ReactCodeGenerator.generateComponentCode(
            originalContent, 
            new Map(changes.map(change => [change.elementId, change]))
          );
          
          const result = await FileSaveService.saveComponent(filePath, componentData, true);
          
          if (result.success) {
            saveCount++;
          } else {
            console.error('Save failed for', filePath, result.message);
          }
        } catch (error) {
          console.error('Error saving section:', filePath, error);
        }
      }

      if (saveCount > 0) {
        setSaveMessage({ 
          type: 'success', 
          text: `Saved ${saveCount} section${saveCount > 1 ? 's' : ''} successfully` 
        });
        ContentExtractor.clearHistory();
      } else {
        setSaveMessage({ type: 'error', text: 'No sections could be saved' });
      }

    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({ 
        type: 'error', 
        text: 'Failed to save changes' 
      });
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