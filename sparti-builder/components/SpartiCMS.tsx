import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { CMSSettingsProvider } from '../context/CMSSettingsContext';
import AuthPage from './auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import CMSDashboard from './admin/CMSDashboard';

// Import from the main app for component library (temporary until moved)
import ComponentLibrary from '../../src/pages/ComponentLibrary';

export const SpartiCMS: React.FC = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default SpartiCMS;