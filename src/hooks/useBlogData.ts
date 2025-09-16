import { useQuery } from '@tanstack/react-query';
import { graphqlClient, BlogPageData } from '@/lib/graphql';
import { BLOG_PAGE_QUERY } from '@/lib/queries';

interface BlogQueryResponse {
  posts: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      date: string;
      author: {
        node: {
          name: string;
        };
      };
      categories: {
        nodes: Array<{
          name: string;
        }>;
      };
      tags: {
        nodes: Array<{
          name: string;
        }>;
      };
      featuredImage: {
        node: {
          mediaItemUrl: string;
          altText?: string;
        };
      };
    }>;
  };
  categories: {
    nodes: Array<{
      name: string;
      count: number;
    }>;
  };
  tags: {
    nodes: Array<{
      name: string;
      count: number;
    }>;
  };
  users: {
    nodes: Array<{
      name: string;
      posts: {
        nodes: Array<{
          id: string;
        }>;
      };
    }>;
  };
}

export function useBlogData() {
  return useQuery({
    queryKey: ['blogData'],
    queryFn: async (): Promise<BlogPageData | null> => {
      try {
        const data = await graphqlClient.request<BlogQueryResponse>(BLOG_PAGE_QUERY);
        
        // Transform the data to match our interface
        const transformedData: BlogPageData = {
          posts: data.posts.nodes.map(post => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author.node.name,
            date: post.date,
            readTime: '5 min read', // This would need to be calculated or added to GraphQL
            category: post.categories.nodes[0]?.name || 'Uncategorized',
            tags: post.tags.nodes.map(tag => tag.name),
            image: {
              node: {
                mediaItemUrl: post.featuredImage?.node?.mediaItemUrl || '',
                altText: post.featuredImage?.node?.altText || post.title
              }
            }
          })),
          categories: data.categories.nodes.map(cat => ({
            name: cat.name,
            count: cat.count
          })),
          tags: data.tags.nodes.map(tag => ({
            name: tag.name,
            count: tag.count
          })),
          authors: data.users.nodes.map(user => ({
            name: user.name,
            posts: user.posts.nodes.length
          }))
        };

        return transformedData;
      } catch (error) {
        console.error('Error fetching blog data:', error);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
