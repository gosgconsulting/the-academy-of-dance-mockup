import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseAuthProvider } from '../providers/SupabaseAuthProvider';
import { TenantProvider } from '../providers/TenantProvider';
import { CMSSettingsProvider } from '../context/CMSSettingsContext';
import AuthPage from './auth/SupabaseAuthPage';
import ProtectedRoute from './auth/SupabaseProtectedRoute';
import CMSDashboard from './admin/CMSDashboard';
import ComponentLibrary from './ComponentLibrary';

export const SpartiCMS: React.FC = () => {
  return (
    <SupabaseAuthProvider>
      <TenantProvider>
        <CMSSettingsProvider>
          <Routes>
            {/* Auth route - shows login if not authenticated */}
            <Route path="/" element={<AuthPage />} />
            
            {/* Protected admin routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <CMSDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/components" element={
              <ProtectedRoute>
                <ComponentLibrary />
              </ProtectedRoute>
            } />
            
            {/* Default redirect to dashboard for authenticated users */}
            <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </CMSSettingsProvider>
      </TenantProvider>
    </SupabaseAuthProvider>
  );
};

export default SpartiCMS;