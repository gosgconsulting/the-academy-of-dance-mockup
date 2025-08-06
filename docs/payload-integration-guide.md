# Payload CMS Integration Guide for Academy of Dance (Lovable)

## Project Analysis - COMPLETE ✅

**Current Setup:**
- **Framework**: Vite + React + TypeScript  
- **UI**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Content**: Static/hardcoded in components
- **Status**: READY FOR PAYLOAD INTEGRATION

## Step 1: Install Payload Dependencies

```bash
# Install Payload CMS with PostgreSQL support
npm install payload @payloadcms/db-postgres @payloadcms/richtext-lexical express cors dotenv
npm install -D @types/express @types/cors nodemon concurrently ts-node

# Optional: Add file storage and plugins
npm install @payloadcms/plugin-cloud-storage @payloadcms/plugin-form-builder
```

## Step 2: Project Structure Setup

```bash
# Create Payload server structure
mkdir server
mkdir server/collections
mkdir server/globals
mkdir server/media
touch server/server.ts
touch server/payload.config.ts
touch .env
```

## Step 3: Payload Configuration (Before Database Connection)

Create `server/payload.config.ts`:
```typescript
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

// Import collections (we'll create these next)
import { Users } from './collections/Users'
import { Media } from './collections/Media'
// We'll add more collections later

export default buildConfig({
  admin: {
    user: 'users',
    bundler: 'webpack',
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Media,
    // Start with basic collections, add more later
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  cors: [
    'http://localhost:8080', // Vite dev server
    'http://localhost:3000', // Payload admin
  ],
})
```

## Step 4: Create Essential Collections

Create `server/collections/Users.ts`:
```typescript
import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
    },
  ],
}
```

Create `server/collections/Media.ts`:
```typescript
import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
```

## Step 5: Express Server Setup

Create `server/server.ts`:
```typescript
import express from 'express'
import payload from 'payload'
import path from 'path'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Serve static files from Vite build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
}

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Payload admin routes are automatically added by payload.init()
  // Admin will be available at /admin

  // API routes for frontend
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // In production, serve React app for all non-API routes
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'))
    })
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Payload Admin: http://localhost:${PORT}/admin`)
  })
}

start()
```

## Step 6: Update Package.json Scripts

Update `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:payload\" \"npm run dev:vite\"",
    "dev:vite": "vite",
    "dev:payload": "nodemon server/server.ts",
    "build": "npm run build:payload && npm run build:vite",
    "build:payload": "tsc server/server.ts --outDir dist/server",
    "build:vite": "vite build",
    "payload": "payload",
    "generate:types": "payload generate:types",
    "start": "node dist/server/server.js"
  }
}
```

## Step 7: Environment Configuration (Link to Railway Database)

Create `.env` file with your **existing Railway database**:
```env
# Railway PostgreSQL Database (existing)
DATABASE_URI=postgresql://postgres:SeNzBtJybWSSGeeYpVaWTPFnIwHNHypZ@${RAILWAY_PRIVATE_DOMAIN}:5432/railway

# Payload Configuration
PAYLOAD_SECRET=academy-dance-super-secret-key-2025
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Development
NODE_ENV=development
PORT=3000
VITE_API_URL=http://localhost:3000

# Railway Variables (for reference)
RAILWAY_PRIVATE_DOMAIN=${RAILWAY_PRIVATE_DOMAIN}
POSTGRES_DB=railway
POSTGRES_USER=postgres
POSTGRES_PASSWORD=SeNzBtJybWSSGeeYpVaWTPFnIwHNHypZ
```

## Step 8: Database Connection & Migration

**Now we link Payload to your Railway database:**

```bash
# Test database connection first
npm install pg @types/pg

# Run Payload migrations to create database schema
npm run payload migrate

# Create your first admin user
npm run payload create-first-user
```

**If you get connection errors, verify your Railway domain:**
```bash
# Check Railway environment variables
echo $RAILWAY_PRIVATE_DOMAIN

# Test connection manually
node -e "
const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres:SeNzBtJybWSSGeeYpVaWTPFnIwHNHypZ@[YOUR_RAILWAY_DOMAIN]:5432/railway'
});
client.connect().then(() => {
  console.log('✅ Database connected successfully');
  client.end();
}).catch(err => {
  console.error('❌ Connection failed:', err.message);
});
"
```

## Step 9: Test Payload Setup

**Start the Payload server:**
```bash
# Start Payload development server
npm run dev:payload

# You should see:
# ✅ Payload Admin URL: http://localhost:3000/admin
# ✅ Server running on http://localhost:3000
```

**Access the admin interface:**
1. Open `http://localhost:3000/admin`
2. Create your first admin user account
3. Verify you can access the CMS interface

## Step 10: Add More Collections (After Basic Setup Works)

Once basic setup is working, add content collections:

Create `server/collections/Teachers.ts`:
```typescript
import { CollectionConfig } from 'payload/types'

export const Teachers: CollectionConfig = {
  slug: 'teachers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty', 'order', 'updatedAt'],
  },
  access: {
    read: () => true, // Public
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'specialty',
      type: 'text',
      required: true,
    },
    {
      name: 'credentials',
      type: 'text',
    },
    {
      name: 'experience',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order for display (lower numbers first)',
      },
    },
  ],
}
```

**Then update `payload.config.ts` to include the new collection:**
```typescript
import { Teachers } from './collections/Teachers'

export default buildConfig({
  // ... existing config
  collections: [
    Users,
    Media,
    Teachers, // Add this
  ],
  // ... rest of config
})
```

## Step 6: Express Server Setup

Create `server/server.ts`:
```typescript
import express from 'express'
import payload from 'payload'
import path from 'path'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Serve static files from Vite build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
}

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Payload admin routes are automatically added by payload.init()
  // Admin will be available at /admin

  // API routes for frontend
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // In production, serve React app for all non-API routes
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'))
    })
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Payload Admin: http://localhost:${PORT}/admin`)
  })
}

start()
```

## Step 7: Update Package.json Scripts

Update `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:payload\" \"npm run dev:vite\"",
    "dev:vite": "vite",
    "dev:payload": "nodemon server/server.ts",
    "build": "npm run build:payload && npm run build:vite",
    "build:payload": "tsc server/server.ts --outDir dist/server",
    "build:vite": "vite build",
    "payload": "payload",
    "generate:types": "payload generate:types",
    "start": "node dist/server/server.js"
  }
}
```

## Step 8: Create Payload Collections

We'll create collections matching your current content structure. Starting with Pages collection:

Create `server/collections/Pages.ts`:
```typescript
import { CollectionConfig } from 'payload/types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true, // Public pages
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for the page (e.g., "about-us")',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            { name: 'ctaText', type: 'text' },
            { name: 'ctaUrl', type: 'text' },
          ],
        },
        {
          slug: 'content',
          fields: [
            { name: 'content', type: 'richText', required: true },
          ],
        },
        {
          slug: 'programmes',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'programmes', type: 'relationship', relationTo: 'programmes', hasMany: true },
          ],
        },
        // Add more section types as needed
      ],
    },
    {
      name: 'seoTitle',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
```

## Step 9: Update Vite Configuration

Update `vite.config.ts` to proxy API calls to Payload:
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API calls to Payload server
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

## Step 10: Frontend Integration Utilities

Create `src/lib/payload.ts`:
```typescript
// Payload API utilities for frontend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const payloadAPI = {
  // Get all pages
  async getPages(): Promise<PayloadResponse<any>> {
    const response = await fetch(`${API_URL}/api/pages?where[status][equals]=published`)
    return response.json()
  },

  // Get page by slug
  async getPageBySlug(slug: string): Promise<any> {
    const response = await fetch(`${API_URL}/api/pages?where[slug][equals]=${slug}&limit=1`)
    const data = await response.json()
    return data.docs[0] || null
  },

  // Get blog posts
  async getBlogPosts(): Promise<PayloadResponse<any>> {
    const response = await fetch(`${API_URL}/api/blog-posts?where[status][equals]=published&sort=-publishedDate`)
    return response.json()
  },

  // Get teachers
  async getTeachers(): Promise<PayloadResponse<any>> {
    const response = await fetch(`${API_URL}/api/teachers?sort=order`)
    return response.json()
  },

  // Get programmes
  async getProgrammes(): Promise<PayloadResponse<any>> {
    const response = await fetch(`${API_URL}/api/programmes?sort=order`)
    return response.json()
  },
}
```

## Step 11: Content Creation Strategy (CMS-First Approach)

### ✅ **RECOMMENDED: Create Content via Payload Admin**

**Why CMS-First is Better:**
- ✅ Visual interface for content creation
- ✅ Built-in validation and rich text editing
- ✅ Media management and relationships
- ✅ Preview and draft functionality
- ✅ No manual SQL or JSON editing needed

### **Phase 1: Setup & Initial Content (30 mins)**
1. **Install dependencies & run migrations**
2. **Create admin user account**
3. **Access admin at `http://localhost:3000/admin`**
4. **Create 1-2 sample entries** to test collections

### **Phase 2: Content Migration (1-2 hours)**
5. **Teachers Collection**: Add all your instructors via admin
6. **Programmes Collection**: Add dance classes and descriptions
7. **Media Collection**: Upload existing images from `/public/lovable-uploads/`
8. **Pages Collection**: Create main pages (About, Contact, etc.)

### **Phase 3: Bulk Import (Optional)**
For faster content creation, create import scripts:

```javascript
// scripts/import-teachers.js
const payload = require('payload');

const teachers = [
  {
    name: "Ms June Lee",
    specialty: "Principal & Founder",
    credentials: "30+ years experience, RAD certified",
    experience: "Ms. June Lee is the heart and soul of The Academy of Dance...",
    image: "/lovable-uploads/996fb449-b3aa-4ec3-acca-2dad9c8a5ac4.png",
    order: 1
  },
  // ... add all teachers
];

async function importTeachers() {
  await payload.init({ secret: process.env.PAYLOAD_SECRET });
  
  for (const teacher of teachers) {
    await payload.create({
      collection: 'teachers',
      data: teacher
    });
  }
  
  console.log(`Imported ${teachers.length} teachers`);
}

importTeachers();
```

### **Phase 4: Content Organization**
9. **Review and organize** content via admin interface
10. **Set up relationships** between content types
11. **Configure SEO fields** and meta descriptions
12. **Test content publishing** workflow

## READY TO START? 

**Next Steps:**
1. Install dependencies ✅
2. Set up database ✅  
3. Configure Payload ✅
4. Create first collection ✅
5. Test admin access ✅

Let me know when you're ready to begin the implementation!

## Step 6: Data Mapping Strategy

### Map Existing Tables to Payload Collections
```typescript
// Example: Existing 'articles' table -> Payload collection
{
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Map existing columns
  ],
  // Use existing table name
  tableName: 'articles',
}
```

## Step 7: Migration Strategy

### Safe Migration Approach
1. **Backup existing database**
2. **Create Payload tables alongside existing ones**
3. **Gradually migrate data**
4. **Test thoroughly**

### Migration Commands
```bash
# Create initial Payload migration
npx payload migrate:create --name initial-payload-setup

# Run migrations (creates Payload tables)
npx payload migrate

# Verify migration
npx payload migrate:status
```

## Step 8: Integration Patterns

### Pattern A: API-Only Payload
Use Payload as headless CMS, keep existing frontend:
```typescript
// server.ts
import payload from 'payload'
import express from 'express'

const app = express()

// Existing routes
app.use('/api/v1', existingApiRoutes)

// Payload admin + API
await payload.init({
  secret: process.env.PAYLOAD_SECRET,
  express: app,
})

// Existing frontend routes
app.use('/', existingFrontendRoutes)
```

### Pattern B: Gradual Migration
Migrate content types one by one:
1. Start with simple content (pages, posts)
2. Move complex relationships later
3. Maintain backward compatibility

## Step 9: Testing Strategy

### Integration Tests
```bash
# Test database connection
node -e "require('./payload.config.js')"

# Test API endpoints
curl http://localhost:3000/api/collections

# Test admin interface
open http://localhost:3000/admin
```

### Data Validation
```sql
-- Verify data integrity
SELECT COUNT(*) FROM existing_table;
SELECT COUNT(*) FROM payload_mapped_table;
```

## Step 10: Production Deployment

### Environment Setup
```bash
# Production environment
NODE_ENV=production
DATABASE_URL=production_database_url
PAYLOAD_SECRET=strong-production-secret
```

### Deployment Checklist
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] SSL certificates configured
- [ ] Backup strategy in place
- [ ] Monitoring setup

## Common Pitfalls and Solutions

### Issue: Table Name Conflicts
**Solution**: Use `tableName` field in collection config
```typescript
{
  slug: 'posts',
  tableName: 'blog_posts', // Maps to existing table
}
```

### Issue: Field Type Mismatches
**Solution**: Use field hooks to transform data
```typescript
{
  name: 'legacy_field',
  type: 'text',
  hooks: {
    beforeChange: [({ value }) => transformLegacyData(value)],
  },
}
```

### Issue: Authentication Integration
**Solution**: Custom authentication strategy
```typescript
// payload.config.ts
auth: {
  strategies: [
    {
      name: 'existing-auth',
      authenticate: async (credentials) => {
        // Integrate with existing auth system
        return await validateExistingUser(credentials)
      },
    },
  ],
},
```

## Next Steps

1. Run the audit script
2. Identify database type and schema
3. Choose integration pattern
4. Create backup of existing data
5. Install Payload dependencies
6. Configure database connection
7. Create initial collections
8. Test integration
9. Migrate data gradually
10. Deploy to production

## Support Resources

- Payload Documentation: https://payloadcms.com/docs
- Database Migration Guide: https://payloadcms.com/docs/database/migrations
- Custom Fields: https://payloadcms.com/docs/fields/overview
