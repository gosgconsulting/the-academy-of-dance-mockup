## Content-only CMS blueprint for fixed-layout React apps

This document summarizes the approach we implemented so future automation can reproduce it reliably.

### Prerequisites
- Dependencies:
  - App: `react-hook-form`, `@hookform/resolvers`, `zod`, `@supabase/supabase-js`
  - Optional UI: Tailwind or your design system
- Env (.env):
  - `VITE_SUPABASE_URL=...`
  - `VITE_SUPABASE_ANON_KEY=...`
  - `VITE_CMS_TOKEN=some-strong-token`
  - `VITE_CMS_CLIENT_ID=default` (multi-tenant scoping for pages)

### Supabase schema and RLS
- Table: `public.pages`
  - `id uuid primary key default gen_random_uuid()`
  - `slug text unique not null`
  - `data jsonb not null`
  - `updated_at timestamptz not null default now()`
- RLS Policies:
  - Public read: `for select to anon, authenticated using (true)`
  - Authenticated write:
    - `for insert to authenticated with check (auth.role() = 'authenticated')`
    - `for update to authenticated using (auth.role() = 'authenticated')`

### Auth + token gate
- `src/cms/supabaseClient.ts`: singleton Supabase client (from env)
- `src/cms/auth/supabaseAuth.tsx`: session provider and hooks
- `src/cms/auth/auth.tsx`: token provider; compares against `VITE_CMS_TOKEN`
- `src/cms/auth/ProtectedRoute.tsx`: requires both Supabase session and token

### Content storage and access
- Hook: `src/cms/usePageContent.ts`
  - `usePageContent<T>(slug, defaults, clientId?)` returns `{ data, save, exists, loading, error }`
  - Reads `pages` by `slug` and `client_id` from `clientId` param or `VITE_CMS_CLIENT_ID` (default "default"); falls back to `defaults`
  - `save` upserts `{ slug, client_id, data }` and flips `exists` true

### Content schemas and registry
- Zod schemas + defaults under `src/content/schemas/*.ts` (one per page/section)
- Registry `src/content/registry.ts` maps `slug → { title, schema, defaults }`
  - Include page slugs (e.g., `homepage`, `pricing`, `gallery`, `blog`) and layout slugs (`header`, `footer`)

### Generic content editor
- `src/pages/cms/ContentEditor.tsx`
  - Renders form dynamically from zod schema
  - Supports Object, Array (add/remove items), String/Number/Boolean/Enum
  - Heuristic for image objects `{ src, alt }` (URL + ALT + live preview)
  - Shows “Create/Update” depending on `exists`
- `src/pages/cms/AdminIndex.tsx`: lists all registry entries and links to `/admin/:slug`

### Routing
- In `src/App.tsx`:
  - Wrap with `SupabaseAuthProvider` and `AuthProvider`
  - Public: `/login`, `/signup`
  - Protected (via `ProtectedRoute`): `/admin` and `/admin/:slug`

### Update pages to be data-driven
- Replace hardcoded content with `usePageContent(slug, defaults)`:
  - Example: `const { data } = usePageContent<HomepageContent>('homepage', homepageDefaults)`
  - Wire `data.*` fields into the existing JSX (layout stays in code)
- Header/Footer read from `header` and `footer` slugs

### Image handling
- Prefer public URLs (CDN, Supabase Storage, or `/public/cms/*`)
- Optional: add upload to Storage in the editor to mint URLs

### Seeding content
- Since defaults mirror the current hardcoded content:
  - Open `/admin/<slug>` and press Save to create rows; or
  - Run a one-off script to upsert `{ slug, data: defaults }` for all entries in `registry`

### Files to copy into another project
- `src/cms/supabaseClient.ts`
- `src/cms/auth/{supabaseAuth.tsx, auth.tsx, ProtectedRoute.tsx}`
- `src/cms/usePageContent.ts`
- `src/cms/content/schemas/*.ts` (your page schemas and defaults)
- `src/cms/content/registry.ts`
- `src/cms/pages/{AdminIndex.tsx, ContentEditor.tsx, Login.tsx, Signup.tsx}`
- Update routes in `src/App.tsx` and swap pages to `usePageContent`

### Notes & rationale
- Fixed layouts stay in code for consistency
- Editors only manage text/images via JSON in `pages.data`
- RLS + token gate provide acceptable baseline protection (replace token gate with roles later if needed)


