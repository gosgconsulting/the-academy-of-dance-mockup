import React from 'react';
import { Edit3, X, Save, Undo, Menu, ChevronLeft } from 'lucide-react';
import { useSpartiBuilder } from './SpartiBuilderProvider';

interface SpartiToolbarProps {
  isSidebarVisible: boolean;
  onToggleSidebar: () => void;
}

export const SpartiToolbar: React.FC<SpartiToolbarProps> = ({ isSidebarVisible, onToggleSidebar }) => {
  const { isEditing, config, enterEditMode, exitEditMode } = useSpartiBuilder();

  if (!config.toolbar) return null;

  return (
    <div className="sparti-toolbar">
      <div className="sparti-toolbar-content">
        <div className="sparti-toolbar-brand">
          <Edit3 size={20} />
          <span>Sparti Builder</span>
        </div>
        
        <div className="sparti-toolbar-actions">
          <div className="sparti-toolbar-left-actions">
            <button 
              className="sparti-btn sparti-btn-ghost" 
              onClick={onToggleSidebar}
              title={isSidebarVisible ? "Hide page structure" : "Show page structure"}
            >
              {isSidebarVisible ? <ChevronLeft size={16} /> : <Menu size={16} />}
              {isSidebarVisible ? 'Hide Structure' : 'Structure'}
            </button>
          </div>
          
          <div className="sparti-toolbar-right-actions">
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
                <button className="sparti-btn sparti-btn-success" title="Save Changes">
                  <Save size={16} />
                  Save
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
      </div>
    </div>
  );
};