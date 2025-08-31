import React from 'react';
import { useContentLoader } from '../hooks/useContentLoader';

interface ContentLoaderProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that loads content from Supabase and makes it available to child components
 */
export const ContentLoader: React.FC<ContentLoaderProps> = ({ children }) => {
  const { isLoading, error } = useContentLoader('index');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading content: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};