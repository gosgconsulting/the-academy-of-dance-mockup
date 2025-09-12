import { useEffect, useState } from 'react';
import { graphqlClient } from '@/lib/graphql';
import { gql } from 'graphql-request';

// GraphQL query to fetch blog posts for sitemap
const BLOG_POSTS_QUERY = gql`
  query GetBlogPostsForSitemap {
    posts(first: 100) {
      nodes {
        slug
        date
        modified
      }
    }
  }
`;

interface BlogPost {
  slug: string;
  date: string;
  modified: string;
}

interface BlogPostsResponse {
  posts: {
    nodes: BlogPost[];
  };
}

/**
 * Dynamic Sitemap Component
 * Serves sitemap.xml at /sitemap.xml route
 */
export default function Sitemap() {
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateDynamicSitemap();
  }, []);

  const generateDynamicSitemap = async () => {
    try {
      setLoading(true);
      
      // Base URL - should match your production domain
      const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://www.theacademyofdance.sg';
      
      // Static routes
      const staticRoutes = [
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

      // Try to fetch blog posts from GraphQL API
      let blogPosts: BlogPost[] = [];
      try {
        const response = await graphqlClient.request<BlogPostsResponse>(BLOG_POSTS_QUERY);
        blogPosts = response.posts.nodes;
      } catch (error) {
        console.warn('[testing] Could not fetch blog posts from API, using fallback data');
        // Fallback to demo data if API is not available
        blogPosts = [
          {
            slug: 'mastering-ballet-fundamentals',
            date: '2024-01-15T00:00:00',
            modified: '2024-01-15T00:00:00'
          },
          {
            slug: 'hip-hop-evolution',
            date: '2024-01-12T00:00:00',
            modified: '2024-01-12T00:00:00'
          },
          {
            slug: 'contemporary-dance-expression',
            date: '2024-01-10T00:00:00',
            modified: '2024-01-10T00:00:00'
          },
          {
            slug: 'competition-preparation',
            date: '2024-01-08T00:00:00',
            modified: '2024-01-08T00:00:00'
          },
          {
            slug: 'dance-nutrition',
            date: '2024-01-05T00:00:00',
            modified: '2024-01-05T00:00:00'
          }
        ];
      }

      // Blog categories and tags
      const categories = ['Ballet', 'Hip-Hop', 'Contemporary', 'Jazz', 'Competition', 'Health'];
      const tags = ['Beginner', 'Technique', 'Performance', 'Training', 'History', 'Culture', 'Nutrition', 'Mindset', 'Expression', 'Classical'];
      const authors = ['Sarah Chen', 'Marcus Williams', 'Elena Rodriguez', 'David Kim', 'Dr. Amy Thompson'];

      // Generate XML content
      const urls = [];

      // Add static routes
      staticRoutes.forEach(route => {
        urls.push(`
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
      });

      // Add blog posts
      blogPosts.forEach(post => {
        const lastmod = new Date(post.modified || post.date).toISOString().split('T')[0];
        urls.push(`
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
      });

      // Add blog category pages
      categories.forEach(category => {
        urls.push(`
  <url>
    <loc>${BASE_URL}/blog/category/${encodeURIComponent(category.toLowerCase())}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
      });

      // Add blog tag pages
      tags.forEach(tag => {
        urls.push(`
  <url>
    <loc>${BASE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
      });

      // Add blog author pages
      authors.forEach(author => {
        urls.push(`
  <url>
    <loc>${BASE_URL}/blog/author/${encodeURIComponent(author.toLowerCase().replace(/\s+/g, '-'))}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
      });

      const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

      setSitemapContent(sitemapXML);
      
    } catch (error) {
      console.error('[testing] Error generating dynamic sitemap:', error);
      setSitemapContent('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
    } finally {
      setLoading(false);
    }
  };

  // Return XML content with proper headers
  if (typeof window !== 'undefined') {
    // Client-side: set content type and return XML
    useEffect(() => {
      if (sitemapContent && !loading) {
        // Create a blob with the XML content
        const blob = new Blob([sitemapContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Trigger download or display
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sitemap.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, [sitemapContent, loading]);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating sitemap...</p>
        </div>
      </div>
    );
  }

  // For server-side rendering or direct access, return the XML
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Sitemap Generated</h1>
          <p className="text-gray-600 mb-4">
            Your sitemap has been generated with {sitemapContent.split('<url>').length - 1} URLs.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Sitemap Content:</h3>
            <pre className="text-xs overflow-auto max-h-96 whitespace-pre-wrap">
              {sitemapContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
