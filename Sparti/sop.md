# Sparti CMS - Standard Operating Procedures (SOP)

## Overview

This document provides step-by-step procedures for setting up, configuring, and managing the Sparti CMS visual editor system. Follow these procedures in order for successful implementation.

---

## SOP-001: Initial System Setup

### Prerequisites
- [ ] Supabase project created and configured
- [ ] Environment variables available
- [ ] Database access confirmed
- [ ] Admin user account ready

### Procedure

#### Step 1: Environment Configuration
1. Navigate to `Sparti/lib/supabase-client.ts`
2. Verify environment variables are set:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Test connection by running: `npm run dev`
4. Confirm no connection errors in browser console

#### Step 2: Database Migration
1. Navigate to `supabase/migrations/` directory
2. Apply core CMS migrations in order:
   ```bash
   # Apply migrations (if using Supabase CLI)
   supabase db push
   
   # Or apply manually via Supabase Dashboard SQL Editor
   ```
3. Verify tables created:
   - `cms_schemas`
   - `cms_schema_sections`
   - `user_profiles`
   - `tenant_memberships`

#### Step 3: RLS Verification
1. Test RLS functions in Supabase SQL Editor:
   ```sql
   SELECT get_current_tenant_id();
   SELECT user_has_role('admin');
   ```
2. Confirm functions return expected values
3. Verify RLS policies are active on all CMS tables

#### Step 4: First Admin User
1. Sign up first user via authentication
2. Verify auto-elevation to admin role (check `user_profiles` table)
3. Test admin access to CMS tables

**Success Criteria:**
- [ ] Environment variables configured
- [ ] Database tables created with RLS
- [ ] Helper functions working
- [ ] First admin user created and verified

---

## SOP-002: Schema Creation and Configuration

### Purpose
Create new content types (schemas) and define their structure in the database.

### Procedure

#### Step 1: Define Schema in Config
1. Open `Sparti/sparti.config.ts`
2. Add schema key to appropriate UI group:
   ```typescript
   ui: {
     navigation: {
       '{{UI_GROUP}}': ['{{SCHEMA_NAME}}', 'existing-schema'],
       // other groups...
     }
   }
   ```
3. Add to collections or singletons section:
   ```typescript
   singletons: {
     '{{SCHEMA_NAME}}': {
       // Will be populated from database at runtime
     }
   }
   ```

#### Step 2: Create Schema Migration
1. Create new migration file: `supabase/migrations/create_{{SCHEMA_NAME}}_schema.sql`
2. Insert schema record:
   ```sql
   /*
     # Create {{SCHEMA_NAME}} Schema
     
     1. New Schema
        - `{{SCHEMA_NAME}}` ({{SCHEMA_TYPE}})
        - Label: {{SCHEMA_LABEL}}
        - Group: {{UI_GROUP}}
     
     2. Sections
        - {{SECTION_NAME}}: {{SECTION_DESCRIPTION}}
     
     3. Security
        - RLS enabled with tenant isolation
        - Admin-only write access
   */
   
   INSERT INTO cms_schemas (
     schema_type,
     schema_name,
     schema_definition,
     ui_config,
     is_active
   ) VALUES (
     '{{SCHEMA_TYPE}}',
     '{{SCHEMA_NAME}}',
     '{
       "label": "{{SCHEMA_LABEL}}",
       "description": "{{SCHEMA_DESCRIPTION}}",
       "fields": {}
     }'::jsonb,
     '{
       "group": "{{UI_GROUP}}",
       "icon": "{{ICON_NAME}}",
       "order": {{GROUP_ORDER}}
     }'::jsonb,
     true
   );
   ```

#### Step 3: Create Schema Sections
1. In same migration, add sections:
   ```sql
   -- Get the schema ID for sections
   WITH schema_ref AS (
     SELECT id FROM cms_schemas 
     WHERE schema_name = '{{SCHEMA_NAME}}' 
     AND tenant_id = get_current_tenant_id()
   )
   INSERT INTO cms_schema_sections (
     schema_id,
     section_name,
     section_type,
     section_definition,
     display_order,
     is_editable
   ) 
   SELECT 
     schema_ref.id,
     '{{SECTION_NAME}}',
     '{{SECTION_TYPE}}', -- 'object' | 'array' | 'field'
     '{
       "label": "{{SECTION_LABEL}}",
       "description": "{{SECTION_DESCRIPTION}}",
       "fields": {
         "{{FIELD_KEY}}": {
           "type": "{{FIELD_TYPE}}",
           "label": "{{FIELD_LABEL}}",
           "required": {{IS_REQUIRED}}
         }
       }
     }'::jsonb,
     {{DISPLAY_ORDER}},
     true
   FROM schema_ref;
   ```

#### Step 4: Apply Migration
1. Apply migration to database
2. Verify schema appears in `cms_schemas` table
3. Verify sections appear in `cms_schema_sections` table
4. Test admin UI navigation shows new schema

**Success Criteria:**
- [ ] Schema key added to config navigation
- [ ] Migration applied successfully
- [ ] Schema record created in database
- [ ] Sections created and linked to schema
- [ ] Schema appears in admin UI navigation

---

## SOP-003: Section Management

### Purpose
Add, modify, or remove sections within existing schemas.

### Procedure

#### Step 1: Adding New Section
1. Create migration: `add_{{SECTION_NAME}}_to_{{SCHEMA_NAME}}.sql`
2. Insert section record:
   ```sql
   /*
     # Add {{SECTION_NAME}} Section to {{SCHEMA_NAME}}
     
     1. New Section
        - Name: {{SECTION_NAME}}
        - Type: {{SECTION_TYPE}}
        - Fields: {{FIELD_LIST}}
     
     2. Display Order
        - Order: {{DISPLAY_ORDER}}
        - Editable: true
   */
   
   WITH schema_ref AS (
     SELECT id FROM cms_schemas 
     WHERE schema_name = '{{SCHEMA_NAME}}'
     AND tenant_id = get_current_tenant_id()
   )
   INSERT INTO cms_schema_sections (
     schema_id,
     section_name,
     section_type,
     section_definition,
     display_order,
     is_editable
   )
   SELECT 
     schema_ref.id,
     '{{SECTION_NAME}}',
     '{{SECTION_TYPE}}',
     '{{SECTION_DEFINITION}}'::jsonb,
     {{DISPLAY_ORDER}},
     true
   FROM schema_ref;
   ```

#### Step 2: Modifying Existing Section
1. Create migration: `update_{{SECTION_NAME}}_section.sql`
2. Update section definition:
   ```sql
   /*
     # Update {{SECTION_NAME}} Section
     
     1. Changes
        - {{CHANGE_DESCRIPTION}}
     
     2. Fields Modified
        - {{FIELD_CHANGES}}
   */
   
   UPDATE cms_schema_sections 
   SET 
     section_definition = '{{NEW_SECTION_DEFINITION}}'::jsonb,
     updated_at = now()
   WHERE section_name = '{{SECTION_NAME}}'
   AND schema_id IN (
     SELECT id FROM cms_schemas 
     WHERE schema_name = '{{SCHEMA_NAME}}'
     AND tenant_id = get_current_tenant_id()
   );
   ```

#### Step 3: Reordering Sections
1. Create migration: `reorder_{{SCHEMA_NAME}}_sections.sql`
2. Update display orders:
   ```sql
   /*
     # Reorder {{SCHEMA_NAME}} Sections
     
     1. New Order
        - {{SECTION_1}}: order 1
        - {{SECTION_2}}: order 2
        - {{SECTION_3}}: order 3
   */
   
   WITH section_orders AS (
     SELECT unnest(ARRAY['{{SECTION_1}}', '{{SECTION_2}}', '{{SECTION_3}}']) as section_name,
            unnest(ARRAY[1, 2, 3]) as new_order
   )
   UPDATE cms_schema_sections 
   SET 
     display_order = section_orders.new_order,
     updated_at = now()
   FROM section_orders
   WHERE cms_schema_sections.section_name = section_orders.section_name
   AND schema_id IN (
     SELECT id FROM cms_schemas 
     WHERE schema_name = '{{SCHEMA_NAME}}'
     AND tenant_id = get_current_tenant_id()
   );
   ```

**Success Criteria:**
- [ ] Section appears in schema modal
- [ ] Section displays in correct order
- [ ] Section fields render properly
- [ ] Section is editable (if `is_editable = true`)

---

## SOP-004: Content Table Integration

### Purpose
Connect CMS schemas to actual content storage tables for data persistence.

### Procedure

#### Step 1: Create Content Tables
1. For singletons, create global content table:
   ```sql
   /*
     # Create Global Content Table for Singletons
     
     1. Table Structure
        - Stores content for singleton schemas
        - Keyed by schema_name + section_name
        - JSONB content storage
     
     2. Security
        - RLS enabled with tenant isolation
        - Admin/editor write access
   */
   
   CREATE TABLE IF NOT EXISTS cms_global_content (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     tenant_id uuid DEFAULT get_current_tenant_id(),
     schema_name text NOT NULL,
     section_name text NOT NULL,
     content_data jsonb NOT NULL DEFAULT '{}',
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now(),
     UNIQUE(tenant_id, schema_name, section_name)
   );
   
   ALTER TABLE cms_global_content ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can read own tenant content"
     ON cms_global_content
     FOR SELECT
     TO authenticated
     USING (tenant_id = get_current_tenant_id());
   
   CREATE POLICY "Admins can manage content"
     ON cms_global_content
     FOR ALL
     TO authenticated
     USING (tenant_id = get_current_tenant_id() AND user_has_role('admin'))
     WITH CHECK (tenant_id = get_current_tenant_id() AND user_has_role('admin'));
   ```

2. For collections, create specific content tables:
   ```sql
   /*
     # Create {{COLLECTION_NAME}} Content Table
     
     1. Collection Structure
        - Individual items with unique IDs
        - Schema sections as JSONB columns
        - Metadata and timestamps
     
     2. Security
        - RLS with tenant isolation
        - Role-based access control
   */
   
   CREATE TABLE IF NOT EXISTS {{COLLECTION_NAME}}_content (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     tenant_id uuid DEFAULT get_current_tenant_id(),
     slug text NOT NULL,
     title text NOT NULL,
     status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
     -- Section content as JSONB columns
     {{SECTION_NAME}}_content jsonb DEFAULT '{}',
     -- Add more section columns as needed
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now(),
     published_at timestamptz,
     UNIQUE(tenant_id, slug)
   );
   
   ALTER TABLE {{COLLECTION_NAME}}_content ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can read published content"
     ON {{COLLECTION_NAME}}_content
     FOR SELECT
     TO authenticated
     USING (tenant_id = get_current_tenant_id() AND status = 'published');
   
   CREATE POLICY "Admins can manage all content"
     ON {{COLLECTION_NAME}}_content
     FOR ALL
     TO authenticated
     USING (tenant_id = get_current_tenant_id() AND user_has_role('admin'))
     WITH CHECK (tenant_id = get_current_tenant_id() AND user_has_role('admin'));
   ```

#### Step 2: Update CMS Service
1. Add content operations to `cms-service.ts`:
   ```typescript
   // For singletons
   async getSingletonContent(schemaName: string, sectionName: string) {
     const { data, error } = await supabase
       .from('cms_global_content')
       .select('content_data')
       .eq('schema_name', schemaName)
       .eq('section_name', sectionName)
       .single();
     
     return data?.content_data || {};
   }
   
   async saveSingletonContent(schemaName: string, sectionName: string, content: any) {
     const { data, error } = await supabase
       .from('cms_global_content')
       .upsert({
         schema_name: schemaName,
         section_name: sectionName,
         content_data: content
       }, { onConflict: 'tenant_id,schema_name,section_name' })
       .select()
       .single();
     
     return data;
   }
   ```

#### Step 3: Frontend Integration
1. Create content hooks in `Sparti/hooks/`:
   ```typescript
   export const useSchemaContent = (schemaName: string) => {
     // Hook to load and save content for a schema
   };
   ```

2. Update components to use content hooks
3. Test content loading and saving

**Success Criteria:**
- [ ] Content tables created with proper RLS
- [ ] CMS service can read/write content
- [ ] Frontend can load and display content
- [ ] Content persists correctly across sessions

---

## SOP-005: Schema Deployment Workflow

### Purpose
Deploy new schemas from development to production environments.

### Procedure

#### Step 1: Development Testing
1. Create and test schema in development environment
2. Verify all sections load correctly in SchemaModal
3. Test content creation and editing
4. Validate field types and validation rules

#### Step 2: Migration Preparation
1. Export schema definition from development database:
   ```sql
   SELECT 
     schema_type,
     schema_name,
     schema_definition,
     ui_config
   FROM cms_schemas 
   WHERE schema_name = '{{SCHEMA_NAME}}';
   
   SELECT 
     section_name,
     section_type,
     section_definition,
     display_order,
     is_editable
   FROM cms_schema_sections s
   JOIN cms_schemas sc ON s.schema_id = sc.id
   WHERE sc.schema_name = '{{SCHEMA_NAME}}'
   ORDER BY display_order;
   ```

2. Create production migration file with exported data
3. Include any required content table changes

#### Step 3: Production Deployment
1. Apply migration to production database
2. Update production config file if needed
3. Verify schema appears in production admin UI
4. Test content editing functionality

#### Step 4: Rollback Plan
1. Document rollback steps in migration comments
2. Create rollback migration if needed:
   ```sql
   /*
     # Rollback {{SCHEMA_NAME}} Schema
     
     1. Remove Schema
        - Delete from cms_schema_sections
        - Delete from cms_schemas
     
     2. Content Handling
        - Archive existing content
        - Do not delete content data
   */
   
   -- Disable schema instead of deleting
   UPDATE cms_schemas 
   SET is_active = false 
   WHERE schema_name = '{{SCHEMA_NAME}}';
   ```

**Success Criteria:**
- [ ] Schema deployed to production
- [ ] Admin UI shows new schema
- [ ] Content editing works in production
- [ ] Rollback plan documented and tested

---

## SOP-006: Content Management Operations

### Purpose
Day-to-day content management procedures for editors and admins.

### Procedure

#### Step 1: Accessing Content Editor
1. Navigate to admin interface
2. Authenticate with editor/admin credentials
3. Select schema from navigation groups
4. SchemaModal opens with section list

#### Step 2: Editing Section Content
1. Click on section in SchemaModal
2. Section editor opens with current content
3. Modify fields according to field type:
   - Text fields: Direct text input
   - Rich text: WYSIWYG editor
   - Images: Upload or URL input
   - Arrays: Add/remove/reorder items
4. Save changes using save button
5. Verify changes persist on page refresh

#### Step 3: Content Validation
1. Required fields must be completed
2. Field types validated (email, URL, etc.)
3. Image uploads checked for file type/size
4. Array items validated individually

#### Step 4: Publishing Workflow
1. For collections with draft/published status:
   - Edit content in draft mode
   - Preview changes if available
   - Publish when ready
2. For singletons:
   - Changes are immediately live
   - Use caution when editing live content

**Success Criteria:**
- [ ] Content loads correctly in editor
- [ ] Changes save successfully
- [ ] Validation works as expected
- [ ] Published content appears on frontend

---

## SOP-007: User and Permission Management

### Purpose
Manage user access and roles within the CMS system.

### Procedure

#### Step 1: Adding New Users
1. Users sign up via authentication system
2. Admin assigns role in `user_profiles` table:
   ```sql
   UPDATE user_profiles 
   SET role = '{{USER_ROLE}}' -- 'admin' | 'editor' | 'viewer'
   WHERE user_id = '{{USER_ID}}'
   AND tenant_id = get_current_tenant_id();
   ```
3. Verify user can access appropriate content

#### Step 2: Role Permissions
- **Admin**: Full access to schemas, sections, and content
- **Editor**: Can edit content, cannot modify schemas
- **Viewer**: Read-only access to content

#### Step 3: Tenant Management
1. Each tenant is isolated via RLS
2. Users belong to one tenant
3. Cross-tenant access is impossible at database level

**Success Criteria:**
- [ ] New users can be added and assigned roles
- [ ] Role permissions work as expected
- [ ] Tenant isolation is maintained
- [ ] No unauthorized access possible

---

## SOP-008: Troubleshooting Common Issues

### Issue: Schema Not Appearing in Navigation

**Symptoms:**
- Schema exists in database but not in admin UI
- Navigation group is empty

**Resolution Steps:**
1. Check `sparti.config.ts` includes schema key:
   ```typescript
   navigation: {
     '{{UI_GROUP}}': ['{{SCHEMA_NAME}}'] // Must include your schema
   }
   ```
2. Verify schema is active in database:
   ```sql
   SELECT * FROM cms_schemas 
   WHERE schema_name = '{{SCHEMA_NAME}}'
   AND is_active = true;
   ```
3. Check user has read access to tenant
4. Restart development server to reload config

### Issue: Modal Not Loading Sections

**Symptoms:**
- SchemaModal opens but shows no sections
- Loading state persists

**Resolution Steps:**
1. Verify sections exist and are editable:
   ```sql
   SELECT s.*, sc.schema_name
   FROM cms_schema_sections s
   JOIN cms_schemas sc ON s.schema_id = sc.id
   WHERE sc.schema_name = '{{SCHEMA_NAME}}'
   AND s.is_editable = true
   ORDER BY s.display_order;
   ```
2. Check foreign key relationship between tables
3. Verify RLS policies allow section reads
4. Check browser console for API errors

### Issue: Content Not Saving

**Symptoms:**
- Save button doesn't work
- Changes don't persist

**Resolution Steps:**
1. Check user has write permissions:
   ```sql
   SELECT user_has_role('admin') OR user_has_role('editor');
   ```
2. Verify content table exists and has RLS policies
3. Check network tab for failed API requests
4. Validate content against schema field definitions

### Issue: Permission Denied Errors

**Symptoms:**
- 403 errors when accessing content
- RLS policy violations

**Resolution Steps:**
1. Verify user authentication status
2. Check user role assignment:
   ```sql
   SELECT role FROM user_profiles 
   WHERE user_id = auth.uid();
   ```
3. Confirm tenant membership:
   ```sql
   SELECT tenant_id FROM user_profiles 
   WHERE user_id = auth.uid();
   ```
4. Test RLS helper functions manually

**Success Criteria:**
- [ ] Issues identified and resolved
- [ ] Root cause documented
- [ ] Prevention measures implemented
- [ ] User can access content normally

---

## SOP-009: Backup and Recovery

### Purpose
Ensure CMS data is backed up and can be recovered in case of issues.

### Procedure

#### Step 1: Regular Backups
1. Supabase automatically backs up database
2. Export schema definitions monthly:
   ```sql
   -- Export all schemas
   SELECT * FROM cms_schemas WHERE is_active = true;
   
   -- Export all sections
   SELECT s.*, sc.schema_name
   FROM cms_schema_sections s
   JOIN cms_schemas sc ON s.schema_id = sc.id
   WHERE sc.is_active = true
   ORDER BY sc.schema_name, s.display_order;
   ```
3. Store exports in version control
4. Document any custom migrations

#### Step 2: Content Backup
1. Export content tables regularly
2. Include media files in backup strategy
3. Test restore procedures in staging environment

#### Step 3: Recovery Testing
1. Monthly recovery tests in staging
2. Verify all schemas load correctly
3. Test content editing functionality
4. Validate user permissions

**Success Criteria:**
- [ ] Backup procedures documented and automated
- [ ] Recovery procedures tested and verified
- [ ] Data integrity maintained
- [ ] Minimal downtime in case of issues

---

## SOP-010: Performance Monitoring

### Purpose
Monitor and optimize CMS performance for optimal user experience.

### Procedure

#### Step 1: Database Performance
1. Monitor query performance in Supabase dashboard
2. Check for slow queries on CMS tables
3. Verify indexes are being used effectively
4. Monitor connection pool usage

#### Step 2: Frontend Performance
1. Monitor modal load times
2. Check for memory leaks in long editing sessions
3. Verify image optimization is working
4. Test on various devices and browsers

#### Step 3: Optimization Actions
1. Add database indexes for frequently queried fields
2. Implement caching for schema definitions
3. Optimize image loading and resizing
4. Minimize bundle size for admin components

**Success Criteria:**
- [ ] Modal loads within 2 seconds
- [ ] Content saves within 1 second
- [ ] No memory leaks during extended use
- [ ] Good performance on mobile devices

---

## Emergency Procedures

### Critical System Failure
1. **Immediate Actions:**
   - Check Supabase status page
   - Verify environment variables
   - Test database connectivity
   - Check authentication service

2. **Communication:**
   - Notify stakeholders of issue
   - Provide estimated resolution time
   - Document steps taken

3. **Resolution:**
   - Apply emergency fixes if available
   - Escalate to Supabase support if needed
   - Implement temporary workarounds
   - Post-incident review and documentation

### Data Corruption
1. **Assessment:**
   - Identify scope of corruption
   - Check backup availability
   - Determine recovery options

2. **Recovery:**
   - Restore from most recent clean backup
   - Replay transactions if possible
   - Validate data integrity post-recovery

3. **Prevention:**
   - Review what caused corruption
   - Implement additional safeguards
   - Update backup procedures if needed

---

## Maintenance Schedule

### Daily
- [ ] Monitor system health
- [ ] Check for failed operations
- [ ] Review error logs

### Weekly
- [ ] Review performance metrics
- [ ] Check backup integrity
- [ ] Update documentation if needed

### Monthly
- [ ] Export schema definitions
- [ ] Test recovery procedures
- [ ] Review and update user permissions
- [ ] Performance optimization review

### Quarterly
- [ ] Full system audit
- [ ] Security review
- [ ] Update procedures based on lessons learned
- [ ] Plan for upcoming features or changes

---

## Contact and Escalation

### Internal Team
- **CMS Administrator**: Primary contact for schema management
- **Database Administrator**: Database issues and performance
- **Frontend Developer**: UI/UX issues and component problems

### External Support
- **Supabase Support**: Database and authentication issues
- **Hosting Provider**: Infrastructure and deployment issues

### Escalation Matrix
1. **Level 1**: Internal team resolution (0-4 hours)
2. **Level 2**: External support engagement (4-24 hours)
3. **Level 3**: Emergency vendor support (immediate)

---

*This SOP document should be reviewed and updated quarterly or when significant system changes are made.*