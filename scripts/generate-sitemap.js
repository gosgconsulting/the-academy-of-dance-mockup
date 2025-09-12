#!/usr/bin/env node

/**
 * Sitemap Generator for The Academy of Dance
 * Generates both static and dynamic sitemap entries
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL - should be set via environment variable
const BASE_URL = process.env.VITE_SITE_URL || 'https://www.theacademyofdance.sg';

// Static routes from your App.tsx
const STATIC_ROUTES = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/blog',
    changefreq: 'daily',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/terms-conditions',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/privacy-policy',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Blog categories and tags (from your blog data)
const BLOG_CATEGORIES = [
  'Ballet', 'Hip-Hop', 'Contemporary', 'Jazz', 'Competition', 'Health'
];

const BLOG_TAGS = [
  'Beginner', 'Technique', 'Performance', 'Training', 'History', 
  'Culture', 'Nutrition', 'Mindset', 'Expression', 'Classical'
];

const BLOG_AUTHORS = [
  'Sarah Chen', 'Marcus Williams', 'Elena Rodriguez', 'David Kim', 'Dr. Amy Thompson'
];

// Demo blog posts (in production, this would come from your GraphQL API)
const BLOG_POSTS = [
  {
    slug: 'mastering-ballet-fundamentals',
    lastmod: '2024-01-15',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    slug: 'hip-hop-evolution',
    lastmod: '2024-01-12',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    slug: 'contemporary-dance-expression',
    lastmod: '2024-01-10',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    slug: 'competition-preparation',
    lastmod: '2024-01-08',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    slug: 'dance-nutrition',
    lastmod: '2024-01-05',
    changefreq: 'monthly',
    priority: '0.8'
  }
];

/**
 * Generate XML sitemap content
 */
function generateSitemapXML() {
  const urls = [];

  // Add static routes
  STATIC_ROUTES.forEach(route => {
    urls.push(`
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
  });

  // Add blog posts
  BLOG_POSTS.forEach(post => {
    urls.push(`
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`);
  });

  // Add blog category pages
  BLOG_CATEGORIES.forEach(category => {
    urls.push(`
  <url>
    <loc>${BASE_URL}/blog/category/${encodeURIComponent(category.toLowerCase())}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  // Add blog tag pages
  BLOG_TAGS.forEach(tag => {
    urls.push(`
  <url>
    <loc>${BASE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
  });

  // Add blog author pages
  BLOG_AUTHORS.forEach(author => {
    urls.push(`
  <url>
    <loc>${BASE_URL}/blog/author/${encodeURIComponent(author.toLowerCase().replace(/\s+/g, '-'))}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;
}

/**
 * Generate sitemap index for multiple sitemaps (if needed)
 */
function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Main function to generate sitemap files
 */
async function generateSitemap() {
  try {
    console.log('[testing] Generating sitemap for:', BASE_URL);
    
    const publicDir = path.join(__dirname, '..', 'public');
    const sitemapXML = generateSitemapXML();
    const sitemapIndexXML = generateSitemapIndex();

    // Write main sitemap
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML);
    console.log('[testing] Generated sitemap.xml');

    // Write sitemap index
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXML);
    console.log('[testing] Generated sitemap-index.xml');

    // Write robots.txt with sitemap reference
    const robotsContent = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-index.xml`;

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
    console.log('[testing] Updated robots.txt with sitemap references');

    console.log('[testing] Sitemap generation completed successfully!');
    
  } catch (error) {
    console.error('[testing] Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap, generateSitemapXML, generateSitemapIndex };
