import React, { ReactNode } from 'react';
import { SupabaseAuthProvider, useSupabaseAuth } from '../providers/SupabaseAuthProvider';
import { TenantProvider } from '../providers/TenantProvider';
import { CMSSettingsProvider } from '../context/CMSSettingsContext';
import { SpartiBuilder } from './SpartiBuilder';

interface SpartiCMSWrapperProps {
  children: ReactNode;
}

const SpartiCMSWrapperContent: React.FC<SpartiCMSWrapperProps> = ({ children }) => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <SpartiBuilder config={{ enabled: true, toolbar: true, autoDetect: true }}>
        {children}
      </SpartiBuilder>
    );
  }

  return <>{children}</>;
};

export const SpartiCMSWrapper: React.FC<SpartiCMSWrapperProps> = ({ children }) => {
  return (
    <SupabaseAuthProvider>
      <TenantProvider>
        <CMSSettingsProvider>
          <SpartiCMSWrapperContent>
            {children}
          </SpartiCMSWrapperContent>
        </CMSSettingsProvider>
      </TenantProvider>
    </SupabaseAuthProvider>
  );
};

export default SpartiCMSWrapper;