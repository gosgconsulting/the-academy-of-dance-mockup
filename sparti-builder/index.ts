// Main Sparti Builder exports
export { SpartiBuilder } from './components/SpartiBuilder';
export { SpartiBuilderProvider, useSpartiBuilder } from './components/SpartiBuilderProvider';
export { SpartiToolbar } from './components/SpartiToolbar';
export { ContentEditPanel } from './components/ContentEditPanel';

// Component Editor exports
export { SliderEditor } from './components/editors/SliderEditor';
export { SliderComponent } from './components/SliderComponent';
export { SpartiCMS } from './components/SpartiCMS';
export { SpartiCMSWrapper } from './components/SpartiCMSWrapper';
export { default as ComponentLibrary } from './components/ComponentLibrary';
export { AuthProvider, useAuth } from './components/auth/AuthProvider';
export { default as ProtectedRoute } from './components/auth/ProtectedRoute';
export { CMSSettingsProvider, useCMSSettings } from './context/CMSSettingsContext';
export type { CMSSettings, TypographySettings, ColorSettings, LogoSettings, MediaItem } from './context/CMSSettingsContext';

// Core functionality
export { UniversalElementDetector } from './core/universal-detector';
export * from './types';

// Component Registry
export { componentRegistry, ComponentRegistry } from './registry';
export type { ComponentDefinition, ComponentProperty } from './registry/types';

// Database API
// Database API removed for demo

// Hooks
export { default as useDatabase } from './hooks/useDatabase';
export { useSpartiEditor } from './hooks/useSpartiEditor';

// Utilities
export * from './utils/component-detector';