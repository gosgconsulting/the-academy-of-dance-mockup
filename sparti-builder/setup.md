# Sparti CMS Setup Guide

This guide provides step-by-step instructions for integrating and activating the Sparti CMS in your React application.

## Prerequisites

- React 18+ application
- TypeScript support
- React Router v7
- Tailwind CSS

## Installation Steps

### 1. Install Required Dependencies

Add the following dependencies to your project:

```bash
npm install react-router-dom@7 @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-tabs @radix-ui/react-toast lucide-react tailwind-merge class-variance-authority clsx
```

### 2. Copy Sparti Builder Module

Copy the entire `sparti-builder` folder to your project's source directory.

### 3. Configure Tailwind CSS

Ensure your `tailwind.config.js` or `tailwind.config.ts` includes the paths to the Sparti Builder components:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./sparti-builder/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  // rest of your config...
}
```

## Integration Steps

### 1. Set Up Router with Admin Routes

In your main application file (e.g., `App.tsx`), set up React Router with Sparti CMS routes:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpartiCMS, SpartiCMSWrapper } from './sparti-builder';
import YourHomePage from './pages/YourHomePage';
import YourOtherPages from './pages/YourOtherPages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Sparti CMS Admin Routes */}
        <Route path="/admin/*" element={<SpartiCMS />} />
        
        {/* Your website routes wrapped with SpartiCMSWrapper */}
        <Route path="/" element={
          <SpartiCMSWrapper>
            <YourHomePage />
          </SpartiCMSWrapper>
        } />
        
        <Route path="/other-page" element={
          <SpartiCMSWrapper>
            <YourOtherPages />
          </SpartiCMSWrapper>
        } />
      </Routes>
    </Router>
  );
}

export default App;
```

### 2. Activate Click-to-Edit Functionality

To make your components editable with Sparti CMS, follow these guidelines:

#### HTML Element Structure

Ensure your components use semantic HTML elements with proper attributes:

```tsx
// Good example - will be detected by Sparti CMS
function MyComponent() {
  return (
    <div className="my-section" id="about-section">
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-4">This is our story...</p>
      <img src="/path/to/image.jpg" alt="Team photo" className="mt-6" />
    </div>
  );
}
```

#### Add Data Attributes for Enhanced Detection

For better element detection, add data attributes to your components:

```tsx
<h1 data-sparti-editable="true" data-sparti-type="heading">
  Welcome to Our Website
</h1>

<p data-sparti-editable="true" data-sparti-type="text">
  This is an editable paragraph.
</p>

<img 
  src="/path/to/image.jpg" 
  alt="Description" 
  data-sparti-editable="true" 
  data-sparti-type="image"
/>

<button 
  data-sparti-editable="true" 
  data-sparti-type="button"
  className="btn btn-primary"
>
  Click Me
</button>
```

### 3. Accessing the Admin Interface

1. Navigate to `/admin` in your browser
2. The simplified authentication is in place for future Supabase integration
3. You can access the admin dashboard directly without credentials in this version

### 4. Using the Click-to-Edit Feature

1. While logged in as admin, navigate to any page of your website
2. You'll see a floating toolbar at the bottom of the screen
3. Click on any editable element on the page
4. A modal popup will appear with editing options:
   - Text elements: Rich text editor
   - Images: Image URL, upload, and alt text options
   - Buttons: Text and link editing
   - Containers: Style and layout options

## Component Compatibility Guidelines

For optimal compatibility with Sparti CMS, follow these guidelines:

### 1. Use Semantic HTML

Use proper HTML elements for their intended purpose:
- `<h1>`, `<h2>`, etc. for headings
- `<p>` for paragraphs
- `<img>` for images
- `<button>` for buttons
- `<a>` for links

### 2. Add Unique IDs

Add unique IDs to important sections and elements:

```html
<section id="hero-section">...</section>
<div id="about-us">...</div>
<footer id="main-footer">...</footer>
```

### 3. Use Consistent Class Names

Use consistent class names for similar elements:

```html
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
```

### 4. Keep DOM Structure Clean

Avoid deeply nested elements when possible. Simpler DOM structures are easier to edit.

### 5. Avoid Dynamic Content Generation in useEffect

If you generate content dynamically in useEffect hooks, Sparti CMS may have trouble detecting changes. Prefer rendering content directly in your component's return statement.

## Troubleshooting

### Element Not Detected for Editing

If elements aren't being detected for editing:

1. Check that the element has proper HTML semantics
2. Add data-sparti-editable="true" to the element
3. Ensure the element is not being dynamically added after initial render
4. Check that the element is not inside a portal or other React feature that moves DOM nodes

### Modal Popup Not Appearing

If the editing modal doesn't appear:

1. Check browser console for errors
2. Ensure you're accessing the site through the SpartiCMSWrapper
3. Try clicking different elements - some may not be configured for editing

## Next Steps for Future Integration

For future Supabase integration:

1. Set up a Supabase project
2. Implement authentication using Supabase Auth
3. Replace the simplified useDatabase hook with actual Supabase queries
4. Update the AuthProvider to use Supabase authentication

## Support and Resources

For additional help, refer to:
- The specs.md file in the sparti-builder directory
- React Router documentation: https://reactrouter.com/
- Radix UI documentation: https://www.radix-ui.com/
