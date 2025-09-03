Title: Spec.md — Project Specification

1. Purpose
   Provide a WordPress admin plugin to list pages found in the Vite/React project under `src/pages/` and allow editing page content (text/images) non-destructively while preserving original structure/CSS/JS.

2. Core Functionality
   - Admin list: derive pages from `src/pages/*.tsx`, show id (slug) and title.
   - Admin editor: edit content per page as JSON overrides stored in WordPress (non-destructive).
   - REST API: list pages and get/update a page's stored content.

3. Architecture Overview
   - WordPress plugin: `wordpress-content/plugins/aod-pages-editor/aod-pages-editor.php`.
   - Source pages location inside container: `/var/www/html/src/pages` (computed via `ABSPATH . 'src/pages'`).
   - Storage: per-page JSON overrides stored in WordPress options `aod_page_content_{slug}` (subject to change if alternative storage is chosen).
   - Docker (docker-compose):
     - WordPress: official `wordpress:latest` image.
     - Database: `mariadb:10.11` with healthcheck.
     - Mounts: `./wordpress-content` -> `/var/www/html/wp-content`, `./src` -> `/var/www/html/src:ro`.
     - Startup: WordPress `depends_on` the DB with `condition: service_healthy`.
     - WP DB env: `WORDPRESS_DB_HOST=db:3306`, `WORDPRESS_DB_USER=wp`, `WORDPRESS_DB_PASSWORD=wp`, `WORDPRESS_DB_NAME=wordpress`.

4. Input / Output Contracts
   | Input | Format | Source |
   |-------|--------|--------|
   | pages listing | auto-detected from filesystem | `src/pages/*.tsx` |
   | page content overrides | JSON object (e.g., {"text": {...}, "images": {...}}) | WordPress admin form / REST POST |

   Output Format Destination
   - GET /wp-json/aod/v1/pages -> JSON array [{ slug, title }]
   - GET /wp-json/aod/v1/pages/{slug} -> JSON object { slug, title, content }
   - POST /wp-json/aod/v1/pages/{slug} -> { success: true }

5. Constraints / Edge Cases
   - TSX parsing for titles is not implemented; title derived from slug (Title Case). Can extend to read metadata if provided.
   - If `src/pages` is not mounted inside the container, listing will be empty; requires Docker mount.
   - JSON validation required before save; invalid JSON rejected.

6. File Map
   - `wordpress-content/plugins/aod-pages-editor/aod-pages-editor.php`: main plugin file (admin UI + REST routes + page scanner).
   - `Spec.md`: this specification document.

7. Open Questions
   - Where should edited content be persisted long-term? Options:
     1) WordPress options (current), 2) JSON files in repo (e.g., `src/pages/_content/{slug}.json`), 3) Supabase (project already uses it).
   - What keys/fields are expected for text/images? Should we standardize `data-key` mapping?
   - None regarding base images: using official WordPress and MariaDB for local dev.

8. Last Updated
   2025-09-03 — Cascade
