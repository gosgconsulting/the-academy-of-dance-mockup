# Sparti Builder - Direct Source Code Saving System

## Overview

Sparti Builder now supports direct saving of modifications to React source code files. When you edit text or images in the visual editor, the changes are tracked and can be saved directly to your component files.

## Features Implemented

### 1. Core Services

- **ReactCodeGenerator**: Converts DOM modifications to React JSX code
- **FileSaveService**: Handles file saving with backup creation
- **ContentExtractor**: Tracks and extracts content changes
- **SectionMapping**: Maps page sections to component files

### 2. Enhanced Toolbar

- **Real Save Functionality**: The Save button now captures all modifications and saves them to source files
- **Save Status Messages**: Visual feedback for save operations
- **Loading States**: Proper loading indicators during save operations

### 3. Change Tracking

- **Text Editor**: Automatically tracks text content changes
- **Image Editor**: Tracks image uploads, URL changes, and attribute modifications
- **Section Mapping**: Associates changes with specific component files

### 4. File Management

- **Automatic Backups**: Creates backups before modifying files
- **Browser File System API**: Uses modern file APIs when available
- **Fallback Downloads**: Downloads files as fallback when direct saving isn't supported

## Usage

### 1. Enable SpartiBuilder

Wrap your application with SpartiBuilder:

```tsx
import { SpartiBuilder } from './sparti-builder';

function App() {
  return (
    <SpartiBuilder config={{ enabled: true, toolbar: true }}>
      <YourMainComponent />
    </SpartiBuilder>
  );
}
```

### 2. Mark Editable Elements

Add `data-sparti-editable` and `data-sparti-component` attributes to elements:

```tsx
<h1 
  data-sparti-editable="true"
  data-sparti-component="hero-title"
  className="text-4xl font-bold"
>
  Your Title Here
</h1>
```

### 3. Edit and Save

1. Click "Edit with Sparti Builder" in the toolbar
2. Click on any editable element to modify it
3. Make your changes in the editor panel
4. Click "Save" in the toolbar to save changes to source files

## Section Mappings

The system maps sections to specific component files:

- `hero-section` → `src/components/HeroSection.tsx`
- `about-section` → `src/components/sections/AboutUsSection.tsx`
- `trials-section` → `src/components/TrialsSection.tsx`
- And more...

## File Structure

```
sparti-builder/
├── services/
│   ├── ReactCodeGenerator.ts     # JSX code generation
│   ├── FileSaveService.ts        # File saving operations
│   └── ContentExtractor.ts       # Change tracking
├── config/
│   └── SectionMapping.ts         # Section to file mappings
├── components/
│   ├── SpartiToolbar.tsx         # Enhanced with real save
│   ├── ContentEditPanel.tsx      # Integrated change tracking
│   └── editors/
│       ├── TextEditor.tsx        # Tracks text changes
│       └── ImageEditor.tsx       # Tracks image changes
└── styles/
    └── sparti-toolbar-styles.css # New styling for save features
```

## How It Works

1. **Change Detection**: When you edit content, changes are tracked with element IDs and component mappings
2. **Code Generation**: Modified content is converted to proper React JSX syntax
3. **File Mapping**: Changes are grouped by the component files they belong to
4. **Save Process**: Each modified component file is regenerated and saved with backups

## Browser Compatibility

- **Modern Browsers**: Uses File System Access API for direct file saving
- **Fallback**: Downloads modified files for browsers without API support
- **Local Storage**: Images are stored locally for demo purposes

## Security & Limitations

- File saving requires user permission in modern browsers
- Backups are created automatically before any modifications
- Changes are only applied to components with proper data attributes
- The system works best with structured React components

## Development

To extend the system:

1. Add new section mappings in `SectionMapping.ts`
2. Extend change tracking in `ContentExtractor.ts`
3. Add new code generation patterns in `ReactCodeGenerator.ts`

The system is designed to be extensible and can handle various React component structures and patterns.