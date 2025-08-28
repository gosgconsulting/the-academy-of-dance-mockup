import React from 'react';
import { SpartiBuilderProvider } from './SpartiBuilderProvider';
import { SpartiToolbar } from './SpartiToolbar';
import { EditingOverlay } from './EditingOverlay';
import { ElementSelector } from './ElementSelector';
import { ContentEditPanel } from './ContentEditPanel';
import { SpartiBuilderConfig } from '../types';
import '../components/sparti-builder.css';

interface SpartiBuilderProps {
  children: React.ReactNode;
  config?: SpartiBuilderConfig;
}

export const SpartiBuilder: React.FC<SpartiBuilderProps> = ({ 
  children, 
  config = { enabled: true, toolbar: true, autoDetect: true }
}) => {
  return (
    <SpartiBuilderProvider config={config}>
      <SpartiToolbar />
      <ElementSelector>
        {children}
      </ElementSelector>
      <EditingOverlay />
      <ContentEditPanel />
    </SpartiBuilderProvider>
  );
};