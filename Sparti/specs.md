# Sparti CMS - Visual Editor Specifications

## Overview

Sparti CMS is a database-driven visual content management system that provides a modal-based editing interface for managing website content. The system uses a flexible schema-driven approach where content structures are defined in the database and rendered dynamically in the admin interface.

## Core Architecture

### 1. Schema-Driven Content Management

The CMS operates on a two-tier schema system:

- **Schemas**: Top-level content types (pages, components, etc.)
- **Sections**: Subdivisions within schemas that group related fields

### 2. Database-First Approach

All content structure definitions are stored in Supabase tables:
- `cms_schemas`: Defines content types and their overall structure
- `cms_schema_sections`: Defines sections within schemas with field definitions

### 3. Multi-Tenant Architecture

Every piece of content is scoped to a tenant using RLS (Row Level Security):
- `tenant_id` column on all tables
- RLS helpers: `get_current_tenant_id()`, `user_has_role(text)`
- Admin access controlled via role-based permissions

## Configuration System

### App Configuration (`sparti.config.ts`)

The configuration file defines what appears in the admin UI navigation:

```typescript
export default config({
  ui: {
    navigation: {
      'Content': ['homepage', 'about-page'],
      'Blog': ['blog-posts', 'blog-categories'],
      'Settings': ['site-config', 'navigation-menu']
    },
  },
  collections: {
    // Dynamic - loaded from database at runtime
  },
  singletons: {
    // Dynamic - loaded from database at runtime
  },
})
```

**Key Principles:**
- Navigation groups organize schemas in the admin UI
- Schema keys must match `schema_name` in the database
- Collections and singletons are loaded dynamically from the database
- Configuration only defines UI organization, not content structure

## Database Schema

### Core Tables

#### `cms_schemas`
Stores top-level content type definitions:

```sql
CREATE TABLE cms_schemas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid DEFAULT get_current_tenant_id(),
  schema_type text NOT NULL CHECK (schema_type IN ('singleton', 'collection')),
  schema_name text NOT NULL,
  schema_definition jsonb NOT NULL,
  ui_config jsonb NOT NULL,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, schema_name)
);
```

#### `cms_schema_sections`
Stores section definitions within schemas:

```sql
CREATE TABLE cms_schema_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_id uuid REFERENCES cms_schemas(id) ON DELETE CASCADE,
  tenant_id uuid DEFAULT get_current_tenant_id(),
  section_name text NOT NULL,
  section_type text NOT NULL CHECK (section_type IN ('object', 'array', 'field')),
  section_definition jsonb NOT NULL,
  display_order integer DEFAULT 0,
  is_editable boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(schema_id, section_name)
);
```

### RLS Policies

- **Read Access**: Users can read schemas within their tenant
- **Write Access**: Only users with 'admin' role can modify schemas
- **Tenant Isolation**: All queries automatically filter by tenant_id

## Content Structure Definitions

### Schema Definition Format

```json
{
  "label": "Homepage",
  "description": "Main landing page content",
  "fields": {
    "hero": {"type": "object", "label": "Hero Section"},
    "features": {"type": "array", "label": "Feature List"}
  }
}
```

### Section Definition Format

```json
{
  "label": "Hero Section",
  "description": "Main hero area with title and CTA",
  "fields": {
    "title": {"type": "text", "label": "Hero Title"},
    "subtitle": {"type": "text", "label": "Hero Subtitle"},
    "cta_text": {"type": "text", "label": "CTA Button Text"},
    "background_image": {"type": "image", "label": "Background Image"}
  }
}
```

### UI Configuration Format

```json
{
  "group": "Content",
  "icon": "home",
  "order": 1,
  "color": "#3b82f6"
}
```

## Visual Editor Workflow

### 1. Schema Registration

Schemas are registered in the database, not in code:

```sql
-- Example: Register a homepage schema
INSERT INTO cms_schemas (
  schema_type,
  schema_name,
  schema_definition,
  ui_config,
  is_active
) VALUES (
  'singleton',
  'homepage',
  '{"label": "Homepage", "description": "Main landing page", "fields": {}}'::jsonb,
  '{"group": "Content", "icon": "home", "order": 1}'::jsonb,
  true
);
```

### 2. Section Creation

Sections are added to schemas with specific field definitions:

```sql
-- Example: Add hero section to homepage
INSERT INTO cms_schema_sections (
  schema_id,
  section_name,
  section_type,
  section_definition,
  display_order,
  is_editable
) VALUES (
  '{{SCHEMA_ID}}',
  'hero',
  'object',
  '{"label": "Hero Section", "fields": {"title": {"type": "text", "label": "Title"}}}'::jsonb,
  1,
  true
);
```

### 3. Runtime Loading

The editor loads schemas dynamically:

1. **Navigation**: Built from `sparti.config.ts` navigation groups
2. **Schema Details**: Fetched from `cms_schemas` table by `schema_name`
3. **Sections**: Loaded from `cms_schema_sections` where `is_editable = true`
4. **Ordering**: Sections displayed by `display_order` ascending

### 4. Modal-Based Editing

- **Selection Model**: Users select schemas, not individual components
- **Modal Interface**: Clicking a schema opens `SchemaModal.tsx`
- **Section Listing**: Modal displays all editable sections for the schema
- **No Sidebar**: All editing happens in centered modals

## File Organization

```
Sparti/
├── specs.md                    # This file
├── sparti.config.ts           # UI navigation configuration
├── lib/
│   ├── supabase-client.ts     # Supabase client setup
│   └── rls-helpers.ts         # Multi-tenant helper functions
├── services/
│   └── cms-service.ts         # Database operations
├── components/
│   ├── SchemaModal.tsx        # Main editing modal
│   ├── SectionList.tsx        # Section listing component
│   └── AdminNavigation.tsx    # Admin UI navigation
├── types/
│   └── cms-types.ts           # TypeScript definitions
└── migrations/
    ├── create-cms-tables.sql  # Core CMS tables
    └── setup-rls-helpers.sql  # RLS functions and policies
```

## Data Flow

### 1. Admin UI Navigation
1. Load `sparti.config.ts` navigation groups
2. For each schema key, fetch basic info from `cms_schemas`
3. Render navigation grouped by UI groups

### 2. Schema Editing
1. User clicks schema in navigation
2. `SchemaModal` opens with `itemType` and `itemName`
3. Load full schema definition from database
4. Load all editable sections ordered by `display_order`
5. Render modal with schema info and section list

### 3. Content Persistence
1. Section edits are saved to content tables (separate from schema tables)
2. Content keyed by `tenant_id + schema_name + section_name`
3. Schema structure remains in CMS tables, content in dedicated tables

## Security Model

### Multi-Tenant Isolation
- All tables include `tenant_id` with RLS policies
- `get_current_tenant_id()` automatically scopes queries
- Cross-tenant access is impossible at the database level

### Role-Based Access
- Schema management requires 'admin' role
- Content editing may have different permission levels
- First user auto-elevated to admin (migration trigger)

### Data Validation
- Schema definitions validated against JSON schema
- Section types restricted to: 'object', 'array', 'field'
- Field types validated in application layer

## Integration Points

### 1. Frontend Integration
- Schemas define content structure
- Frontend components read from content tables
- No direct coupling between CMS and frontend components

### 2. API Layer
- `cms-service.ts` provides all database operations
- Type-safe operations with TypeScript definitions
- Automatic tenant scoping via RLS

### 3. Migration Strategy
- Schema changes via database migrations
- Content migrations separate from schema migrations
- Version tracking for schema evolution

## Development Workflow

### Adding New Content Types

1. **Define Schema**: Insert into `cms_schemas` table
2. **Add Sections**: Insert into `cms_schema_sections` table  
3. **Update Config**: Add schema key to appropriate UI group in `sparti.config.ts`
4. **Test**: Verify schema appears in admin navigation and modal works

### Modifying Existing Schemas

1. **Update Database**: Modify schema/section definitions in database
2. **Version Control**: Increment version number for tracking
3. **Migration**: Create migration for structural changes
4. **Validation**: Ensure existing content remains compatible

### Content Management

1. **Structure**: Defined in CMS tables (schemas/sections)
2. **Content**: Stored in separate content tables
3. **Editing**: Via modal interface with section-based organization
4. **Publishing**: Content changes are immediate (no draft/publish workflow)

## Error Handling

### Schema Loading Errors
- Graceful degradation if schema not found
- Error boundaries around modal components
- Fallback to basic editing interface

### Database Connection Issues
- Retry logic for transient failures
- Offline mode indicators
- Local storage for draft changes

### Validation Errors
- Field-level validation based on schema definitions
- User-friendly error messages
- Prevention of invalid data persistence

## Performance Considerations

### Caching Strategy
- Schema definitions cached in memory
- Section lists cached per schema
- Content cached with invalidation on updates

### Lazy Loading
- Schemas loaded on-demand when navigation item clicked
- Sections loaded when modal opens
- Large content paginated in collections

### Database Optimization
- Indexes on tenant_id, schema_name, section_name
- JSONB indexes on frequently queried fields
- Connection pooling for concurrent users

## Future Extensions

### Planned Features
- Visual drag-and-drop section reordering
- Schema versioning and rollback
- Content preview and staging
- Bulk content operations
- Import/export functionality

### Integration Possibilities
- Webhook system for content changes
- API endpoints for headless usage
- Third-party service integrations
- Advanced permission granularity

## Troubleshooting

### Common Issues

**Schema Not Appearing in Navigation**
- Check `sparti.config.ts` includes schema key in navigation groups
- Verify `is_active = true` in `cms_schemas` table
- Confirm user has read access to tenant

**Modal Not Loading Sections**
- Verify sections exist in `cms_schema_sections` table
- Check `is_editable = true` for sections
- Confirm `schema_id` foreign key relationship

**Permission Denied Errors**
- Verify user has appropriate role for operation
- Check RLS policies are correctly applied
- Confirm tenant_id matches current user's tenant

### Debug Tools
- Database query logging in development
- Schema validation in browser console
- RLS policy testing utilities
- Content audit trails

---

This specification provides the foundation for a flexible, database-driven CMS that can evolve with your content needs while maintaining security and performance.