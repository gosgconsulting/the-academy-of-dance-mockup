import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { CMSSettingsProvider } from '../context/CMSSettingsContext';
import AuthPage from './auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import CMSDashboard from './admin/CMSDashboard';
import ComponentLibrary from './ComponentLibrary';
import PageEditor from './cms/PageEditor';

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
          
          <Route path="/pages/edit/:id" element={
            <ProtectedRoute>
              <PageEditor />
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