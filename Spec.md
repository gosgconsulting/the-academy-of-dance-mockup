Title: Spec.md — Project Specification

1. Purpose
   Provide a WordPress admin plugin to list site pages (static list) and allow editing content overrides (text/images) per section (header/page/footer) non-destructively while preserving original structure/CSS/JS.

2. Core Functionality
   - Admin list: static list defined in plugin as items with `title`, `slug`, and `path`.
   - Admin editor: edit overrides per section — `header`, `page`, `footer` — each with `{ text, images }` stored in WordPress (non-destructive). Frontend consumes the merged content.
   - Live preview (Phase 2): iframe loads dev app route with `?editor=1`; admin merges original content from app with overrides; overrides apply live via postMessage.
   - Runtime content consumption (headless): front-end fetches local per-route JSON (if available) before initial render, then fetches public JSON overrides from WP REST and applies them to DOM via `[data-key]` when not in editor mode. The WP response includes `content` (merged header+page+footer) for simple consumption.

3. Architecture Overview
   - WordPress plugin: `wordpress-content/plugins/aod-pages-editor/aod-pages-editor.php`.
   - Page list: static array returned by `list_pages()` with `[ { title, slug, path } ]`.
   - Storage: per-page JSON overrides stored in WordPress options `aod_page_content_{slug}` in structure `{ header:{text,images}, page:{text,images}, footer:{text,images} }` (legacy `{text,images}` still accepted and mapped to `page`).
   - Docker (docker-compose):
     - WordPress: official `wordpress:latest` image.
     - Database: `mariadb:10.11` with healthcheck.
     - Mounts: `./wordpress-content` -> `/var/www/html/wp-content`, `./src` -> `/var/www/html/src:ro`.
     - Startup: WordPress `depends_on` the DB with `condition: service_healthy`.
     - WP DB env: `WORDPRESS_DB_HOST=db:3306`, `WORDPRESS_DB_USER=wp`, `WORDPRESS_DB_PASSWORD=wp`, `WORDPRESS_DB_NAME=wordpress`.
   - Phase 2 Live Editing:
     - Admin loads iframe pointing to `devUrl + route + '?editor=1'`.
     - Front-end `editorBridge.ts` (loaded conditionally in `src/main.tsx`) scans DOM for `[data-key]` and posts map `{ text, images }` to parent.
     - Admin receives `AOD_ORIGINAL_CONTENT`, sets as base defaults, renders union list of keys (base ∪ overrides), and sends `AOD_APPLY_OVERRIDES` with current overrides to iframe for live DOM updates.
     - Security: admin filters messages by `event.origin === new URL(devUrl).origin`. Child currently posts with `'*'` (tighten later via handshake if needed).
   - Local JSON Preload:
     - `src/main.tsx` maps current route to slug and prefetches `/content/{slug}.json` before rendering. The result is placed at `window.AOD_LOCAL_CONTENT`.
   - Runtime Content Bridge:
     - `src/contentBridge.ts` loads when not in editor mode.
     - Detects current route and maps it to a page slug.
     - Applies any preloaded local content from `window.AOD_LOCAL_CONTENT`.
     - Fetches local JSON `/content/{slug}.json` and applies it.
     - Fetches `GET /wp-json/aod/v1/pages/{slug}` (public) from configurable base `VITE_AOD_API_BASE` (falls back to `/wp-json/aod/v1`) and applies it last.
     - WordPress endpoint returns saved content if present; otherwise falls back to plugin defaults copied from `public/content/*.json`.
     - Applies overrides to DOM using `[data-key]` for text and `img[data-key]` for images.
   - CORS: plugin adds `rest_send_cors_headers` to allow cross-origin reads for the REST namespace. Frontend prefers `/?rest_route=/aod/v1` base to avoid rewrite issues.

4. Input / Output Contracts
   | Input | Format | Source |
   |-------|--------|--------|
   | pages listing | static array of { title, slug, path } | plugin `list_pages()` |
   | page content overrides | JSON object per section: `{ header:{text,images}, page:{text,images}, footer:{text,images} }` (legacy `{text,images}` accepted) | WordPress admin form / REST POST |

   Output Format Destination
   - GET /wp-json/aod/v1/pages -> JSON array [{ title, slug, path }] (admin-only list; returns JSON error if forbidden)
   - GET /wp-json/aod/v1/pages/{slug} -> JSON object { slug, title, content, header, page, footer } (public)
     - `content` is merged: `header ∪ page ∪ footer` by key (later sections override earlier on conflicts)
     - If no saved content, `page` is sourced from plugin defaults (`wordpress-content/plugins/aod-pages-editor/defaults/{slug}.json`).
   - POST /wp-json/aod/v1/pages/{slug} -> accepts either `{ header,page,footer }` or legacy `{ text, images }`; persists normalized structure; returns `{ success: true }`
   - Local JSON (static): `/content/{slug}.json` -> JSON object
     - Structure: either `{ content: { text: Record<string,string>, images: Record<string,string> } }` or plain `{ text, images }`
   - postMessage (iframe <-> admin):
     - From child to parent: `{ type: 'AOD_ORIGINAL_CONTENT', payload: { text: Record<string,string>, images: Record<string,string> } }`
     - From parent to child: `{ type: 'AOD_APPLY_OVERRIDES', payload: { text?: Record<string,string>, images?: Record<string,string> } }`

5. Constraints / Edge Cases
   - TSX parsing for titles is not implemented; title derived from slug (Title Case). Can extend to read metadata if provided.
   - If `src/pages` is not mounted inside the container, listing will be empty; requires Docker mount.
   - JSON validation required before save; invalid JSON rejected.
   - For live editing, React pages must mark editable nodes with `data-key` on text elements and `img[data-key]` for images.
   - Slug-to-route mapping (admin iframe): explicit map handles `/`, `/blog`, `/blog/:slug`, `/blog/category/:category`, `/blog/tag/:tag`, `/blog/author/:author`, `/terms-conditions`, `/privacy-policy`.
   - Route-to-slug mapping (runtime bridge): uses regex to derive slug from current pathname; ensure new routes are added to `contentBridge.ts`.
   - For cross-origin dev, set `VITE_AOD_API_BASE` to the WP host (e.g., `http://localhost:PORT/wp-json/aod/v1`); CORS headers are sent by the plugin.

6. File Map
   - `wordpress-content/plugins/aod-pages-editor/aod-pages-editor.php`: main plugin file (admin UI + REST routes + page scanner).
   - `wordpress-content/plugins/aod-pages-editor/admin/editor.js`: admin editor logic for sectioned editing (header/page/footer) + (Phase 2 iframe/merge/postMessage).
   - `wordpress-content/plugins/aod-pages-editor/admin/editor.css`: admin editor styling.
   - `src/main.tsx`: conditionally loads `editorBridge` when `?editor=1`.
   - `src/editorBridge.ts`: front-end bridge for posting originals and applying overrides.
   - `src/contentBridge.ts`: runtime content loader that applies local JSON (preloaded or fetched) and WP overrides client-side when not in editor mode.
   - `public/content/{slug}.json`: per-route static JSON content seeds (e.g., `index.json`).
   - `wordpress-content/plugins/aod-pages-editor/defaults/{slug}.json`: plugin fallback defaults copied from `public/content`.
   - `Spec.md`: this specification document.

7. Open Questions
   - Where should edited content be persisted long-term? Options:
     1) WordPress options (current), 2) JSON files in repo (e.g., `src/pages/_content/{slug}.json`), 3) Supabase (project already uses it).
   - What keys/fields are expected for text/images? Should we standardize `data-key` mapping?
   - Origin/auth hardening for postMessage: add handshake and restrict child->parent target origin.

8. Last Updated
   2025-09-03 — Cascade (Sectioned header/page/footer overrides; static pages list; merged content in REST)
