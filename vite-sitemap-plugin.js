/**
 * Vite Plugin for Sitemap Generation
 * Automatically generates sitemap during build process
 */

import { generateSitemap } from './scripts/generate-sitemap.js';

export function sitemapPlugin() {
  return {
    name: 'sitemap-plugin',
    buildStart() {
      console.log('[testing] Generating sitemap...');
      generateSitemap();
    },
    generateBundle() {
      console.log('[testing] Sitemap generation completed');
    }
  };
}
