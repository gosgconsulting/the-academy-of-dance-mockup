import React, { useState } from 'react';
import { Edit3, X, Save, Undo, Check, AlertCircle } from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';

export const SpartiToolbar: React.FC = () => {
  const { isEditing, config, enterEditMode, exitEditMode, savePage, isSaving } = useSpartiBuilder();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!config.toolbar) return null;

  const handleSave = async () => {
    if (!config.contentAPI) return;
    
    setSaveStatus('idle');
    const result = await savePage();
    
    if (result.success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
      console.error('Save failed:', result.error);
    }
  };

  const getSaveButtonContent = () => {
    if (isSaving) return 'Saving...';
    if (saveStatus === 'success') return <><Check size={16} /> Saved</>;
    if (saveStatus === 'error') return <><AlertCircle size={16} /> Error</>;
    return <><Save size={16} /> Save</>;
  };

  const getSaveButtonClass = () => {
    if (saveStatus === 'success') return 'sparti-btn sparti-btn-success';
    if (saveStatus === 'error') return 'sparti-btn sparti-btn-error';
    return 'sparti-btn sparti-btn-success';
  };

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
              {config.contentAPI && (
                <button 
                  className={getSaveButtonClass()}
                  onClick={handleSave}
                  disabled={isSaving}
                  title="Save Page Content"
                >
                  {getSaveButtonContent()}
                </button>
              )}
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
    </div>
  );
};