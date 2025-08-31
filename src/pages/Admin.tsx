import React from 'react';
import { Navigate } from 'react-router-dom';
import { CMSDashboard } from '../../sparti-builder/components/admin/CMSDashboard';
import { AuthProvider, useAuth } from '../../sparti-builder/components/auth/AuthProvider';
import { CMSSettingsProvider } from '../../sparti-builder/context/CMSSettingsContext';

const AdminContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <CMSDashboard />
    </div>
  );
};

const Admin: React.FC = () => {
  return (
    <AuthProvider>
      <CMSSettingsProvider>
        <AdminContent />
      </CMSSettingsProvider>
    </AuthProvider>
  );
};

export default Admin;