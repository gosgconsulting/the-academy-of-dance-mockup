// Universal Sparti Builder Plugin - Works on any website
import React, { ReactNode, useEffect } from 'react';
import { SpartiBuilderProvider } from './SpartiBuilderProvider';
import { SpartiToolbar } from './SpartiToolbar';
import { SchemaSelector } from './SchemaSelector';
import { SchemaModal } from './SchemaModal';
import { SpartiBuilderConfig } from '../types';
import { SpartiStyleManager } from '../styles/sparti-styles';

interface SpartiBuilderProps {
  children: ReactNode;
  config?: SpartiBuilderConfig;
}

export const SpartiBuilder: React.FC<SpartiBuilderProps> = ({ 
  children, 
  config = { enabled: true, toolbar: true, autoDetect: true }
}) => {
  
  useEffect(() => {
    // Inject CSS styles directly into DOM for universal compatibility
    SpartiStyleManager.injectStyles();

    // Cleanup on unmount
    return () => {
      SpartiStyleManager.removeStyles();
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
          <SchemaSelector>
            {children}
          </SchemaSelector>
          <SchemaModal />
        </div>
      </div>
    </SpartiBuilderProvider>
  );
};