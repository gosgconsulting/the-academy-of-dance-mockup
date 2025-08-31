import React, { ReactNode } from 'react';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import { CMSSettingsProvider } from '../context/CMSSettingsContext';
import { SpartiBuilder } from './SpartiBuilder';

interface SpartiCMSWrapperProps {
  children: ReactNode;
}

const SpartiCMSWrapperContent: React.FC<SpartiCMSWrapperProps> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Hide toolbar in admin area to provide cleaner editing experience
    const isAdminArea = window.location.pathname.startsWith('/admin');
    
    return (
      <SpartiBuilder config={{ enabled: true, toolbar: !isAdminArea, autoDetect: true }}>
        {children}
      </SpartiBuilder>
    );
  }

  return <>{children}</>;
};

export const SpartiCMSWrapper: React.FC<SpartiCMSWrapperProps> = ({ children }) => {
  return (
    <AuthProvider>
      <CMSSettingsProvider>
        <SpartiCMSWrapperContent>
          {children}
        </SpartiCMSWrapperContent>
      </CMSSettingsProvider>
    </AuthProvider>
  );
};

export default SpartiCMSWrapper;