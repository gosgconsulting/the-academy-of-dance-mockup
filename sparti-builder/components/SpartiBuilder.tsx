// Universal Sparti Builder Plugin - Works on any website
import React, { ReactNode, useEffect } from 'react';
import { SpartiBuilderProvider } from './SpartiBuilderProvider';
import { SpartiToolbar } from './SpartiToolbar';
import { EditingOverlay } from './EditingOverlay';
import { ElementSelector } from './ElementSelector';
import { ContentEditPanel } from './ContentEditPanel';
import { SpartiBuilderConfig } from '../types';
import { UniversalElementDetector } from '../core/universal-detector';
import './sparti-builder.css';

interface SpartiBuilderProps {
  children: ReactNode;
  config?: SpartiBuilderConfig;
}

export const SpartiBuilder: React.FC<SpartiBuilderProps> = ({ 
  children, 
  config = { enabled: true, toolbar: true, autoDetect: true }
}) => {
  
  useEffect(() => {
    // Initialize universal compatibility
    const framework = UniversalElementDetector.detectFramework();
    console.log(`Sparti Builder initialized on ${framework} framework`);
    
    // Add universal styles to prevent conflicts
    document.head.insertAdjacentHTML('beforeend', `
      <style id="sparti-universal-reset">
        .sparti-builder-wrapper * {
          box-sizing: border-box;
        }
        .sparti-toolbar *, 
        .sparti-edit-panel *,
        .sparti-overlay * {
          all: revert !important;
          box-sizing: border-box !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }
        /* Prevent conflicts with existing CSS */
        .sparti-toolbar,
        .sparti-edit-panel {
          isolation: isolate;
        }
      </style>
    `);

    // Cleanup on unmount
    return () => {
      const style = document.getElementById('sparti-universal-reset');
      if (style) style.remove();
    };
  }, []);

  if (!config.enabled) {
    return <>{children}</>;
  }

  return (
    <SpartiBuilderProvider config={config}>
      <div className="sparti-builder-wrapper">
        <SpartiToolbar />
        <div className="sparti-content-area">
          <ElementSelector>
            {children}
          </ElementSelector>
          <EditingOverlay />
          <ContentEditPanel />
        </div>
      </div>
    </SpartiBuilderProvider>
  );
};