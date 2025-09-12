# Sitemap Implementation for The Academy of Dance

This project implements a comprehensive sitemap solution for SEO optimization with both static and dynamic generation capabilities.

## Features

### 1. Static Sitemap Generation (Build-time)
- **File**: `scripts/generate-sitemap.js`
- **Purpose**: Generates sitemap during build process
- **Benefits**: Fast loading, SEO-friendly, includes all known routes

### 2. Dynamic Sitemap Route (Runtime)
- **File**: `src/pages/Sitemap.tsx`
- **Route**: `/sitemap.xml`
- **Purpose**: Serves real-time sitemap with fresh content from GraphQL API
- **Benefits**: Always up-to-date, includes new blog posts automatically

## Implementation Details

### Static Routes Included
- `/` (Homepage) - Priority: 1.0
- `/blog` - Priority: 0.9
- `/terms-conditions` - Priority: 0.3
- `/privacy-policy` - Priority: 0.3

### Dynamic Routes Included
- `/blog/{slug}` - Individual blog posts (Priority: 0.8)
- `/blog/category/{category}` - Blog categories (Priority: 0.6)
- `/blog/tag/{tag}` - Blog tags (Priority: 0.5)
- `/blog/author/{author}` - Author pages (Priority: 0.5)

### Blog Data Sources
- **Primary**: GraphQL API (`BLOG_POSTS_QUERY`)
- **Fallback**: Demo data from component files
- **Categories**: Ballet, Hip-Hop, Contemporary, Jazz, Competition, Health
- **Tags**: Beginner, Technique, Performance, Training, History, Culture, Nutrition, Mindset, Expression, Classical

## Usage

### 1. Environment Setup
Create a `.env` file with your site URL:
```bash
VITE_SITE_URL=https://www.theacademyofdance.sg
```

### 2. Build Process
The sitemap is automatically generated during build:
```bash
npm run build
```

### 3. Manual Generation
Generate sitemap manually:
```bash
npm run generate:sitemap
```

### 4. Access Dynamic Sitemap
Visit `/sitemap.xml` in your browser to see the real-time sitemap.

## Files Generated

### Build-time Files (in `public/` directory)
- `sitemap.xml` - Main sitemap file
- `sitemap-index.xml` - Sitemap index (for multiple sitemaps)
- `robots.txt` - Updated with sitemap references

### Runtime Files
- `/sitemap.xml` - Dynamic sitemap served by React Router

## SEO Benefits

1. **Search Engine Discovery**: Helps search engines find all your pages
2. **Fresh Content**: Dynamic sitemap ensures new blog posts are indexed quickly
3. **Priority Signals**: Tells search engines which pages are most important
4. **Change Frequency**: Indicates how often pages are updated
5. **Last Modified**: Shows when content was last updated

## Configuration

### Customizing Routes
Edit `scripts/generate-sitemap.js` to modify:
- Static routes and their priorities
- Blog categories and tags
- Change frequencies
- Last modified dates

### Customizing Dynamic Content
Edit `src/pages/Sitemap.tsx` to modify:
- GraphQL queries for blog posts
- Fallback data structure
- URL generation logic

## Production Deployment

1. Set `VITE_SITE_URL` to your production domain
2. Ensure your GraphQL API is accessible
3. Run `npm run build` to generate static sitemap
4. Deploy with both static and dynamic sitemap capabilities

## Monitoring

- Check `/sitemap.xml` regularly to ensure it's working
- Monitor Google Search Console for sitemap submission status
- Verify all important pages are included in the sitemap

## Troubleshooting

### Common Issues
1. **GraphQL API not accessible**: Falls back to demo data
2. **Missing environment variables**: Uses default values
3. **Build errors**: Check Node.js version and dependencies

### Debug Mode
All sitemap generation includes `[testing]` prefixed logs for easy filtering.

## Future Enhancements

1. **Image Sitemaps**: Add image sitemaps for blog post images
2. **News Sitemaps**: For time-sensitive content
3. **Video Sitemaps**: If video content is added
4. **Multi-language Support**: For international versions
5. **Sitemap Compression**: Gzip compression for large sitemaps
