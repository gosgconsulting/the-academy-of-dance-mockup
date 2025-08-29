# Sparti Builder Content Management System

## Overview
A JSON file-based content management system for Sparti Builder that allows you to save and restore complete page content with version history.

## Features
- ✅ Complete page serialization to JSON schema
- ✅ Version history with automatic backups
- ✅ Express.js server for file operations
- ✅ Live content editing and saving
- ✅ No external dependencies (no Supabase required)
- ✅ Production-ready with error handling

## Architecture

### Frontend Components
- **PageSchemaGenerator**: Serializes DOM to structured JSON
- **PageSchemaLoader**: Restores DOM from JSON schema
- **ContentAPI**: API client for save/load operations
- **Enhanced SpartiToolbar**: Save button with status feedback

### Backend Server
- **Express.js server** at `server/content-server.js`
- **JSON file storage** in `public/content/`
- **Version management** with automatic backups
- **RESTful API** endpoints for content operations

## Quick Start

### 1. Start the Content Server
```bash
node server/content-server.js
```
Server runs on port 3001 by default.

### 2. Enable Content API in SpartiBuilder
```typescript
<SpartiBuilder config={{ 
  enabled: true, 
  toolbar: true, 
  contentAPI: true 
}}>
  <YourContent />
</SpartiBuilder>
```

### 3. Use the Save Feature
1. Click "Edit with Sparti Builder"
2. Make your content changes
3. Click "Save" button
4. Content is automatically saved with version history

## File Structure
```
public/content/
├── home.json              # Homepage content
├── about.json             # About page content
└── versions/
    ├── home.json          # Homepage version history
    └── about.json         # About page version history
```

## API Endpoints

### Save Page Content
```
POST /api/content/save
Body: { schema: PageSchema, comment?: string }
Response: { success: boolean, version: number, timestamp: string }
```

### Load Page Content
```
GET /api/content/load?route=/
Response: { success: boolean, schema: PageSchema }
```

### Get Version History
```
GET /api/content/versions?route=/
Response: PageVersion[]
```

### Load Specific Version
```
GET /api/content/version?route=/&version=2
Response: { success: boolean, schema: PageSchema }
```

## Content Schema Structure
```typescript
interface PageSchema {
  id: string;
  route: string;
  title: string;
  version: number;
  sections: SectionSchema[];
  metadata: PageMetadata;
}
```

Each page is broken down into:
- **Sections**: Main content areas (header, hero, about, etc.)
- **Elements**: Individual components (text, images, buttons, sliders)
- **Metadata**: Creation time, author, description
- **Version Info**: Version number, timestamps, change comments

## Production Deployment

### Server Setup
```bash
# Install dependencies
npm install express cors

# Start production server
NODE_ENV=production node server/content-server.js
```

### Environment Variables
```bash
PORT=3001                    # Server port
CONTENT_DIR=./public/content # Content storage directory
```

### Nginx Configuration (optional)
```nginx
location /api/content {
    proxy_pass http://localhost:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## Version History
- Automatic backups on every save
- Keeps last 10 versions per page
- Rollback functionality
- Change comments and timestamps

## Security Considerations
- Content files stored locally on server
- No external database dependencies
- File-based permissions apply
- Consider backup strategies for production

## Troubleshooting

### Server Issues
```bash
# Check if server is running
curl http://localhost:3001/api/health

# View server logs
node server/content-server.js
```

### Content Not Saving
1. Verify `contentAPI: true` in config
2. Check browser console for errors
3. Ensure content server is running
4. Check file permissions on content directory

### Version History Missing
- Versions are stored in `public/content/versions/`
- Each page has its own version file
- Limited to 10 versions per page (configurable)

## Examples

### Basic Usage
```typescript
import { SpartiBuilder } from 'sparti-builder';

function App() {
  return (
    <SpartiBuilder config={{ contentAPI: true }}>
      <main>
        <section>
          <h1>Welcome</h1>
          <p>Edit this content and save it!</p>
        </section>
      </main>
    </SpartiBuilder>
  );
}
```

### Manual Content Loading
```typescript
import { ContentAPI, PageSchemaLoader } from 'sparti-builder';

async function loadPageContent(route: string) {
  const result = await ContentAPI.loadPage(route);
  if (result.success && result.schema) {
    await PageSchemaLoader.loadPageSchema(result.schema);
  }
}
```

This system provides a complete, production-ready content management solution with zero external dependencies!