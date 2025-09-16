import { useQuery } from '@tanstack/react-query';
import { graphqlClient, BlogPost } from '@/lib/graphql';
import { BLOG_POST_QUERY } from '@/lib/queries';

interface BlogPostQueryResponse {
  postBy: {
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
  } | null;
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async (): Promise<BlogPost | null> => {
      try {
        const data = await graphqlClient.request<BlogPostQueryResponse>(BLOG_POST_QUERY, { slug });
        
        if (!data.postBy) {
          return null;
        }

        // Transform the data to match our BlogPost interface
        const transformedPost: BlogPost = {
          id: data.postBy.id,
          slug: data.postBy.slug,
          title: data.postBy.title,
          excerpt: data.postBy.excerpt,
          content: data.postBy.content,
          author: data.postBy.author.node.name,
          date: data.postBy.date,
          readTime: '5 min read', // This would need to be calculated or added to GraphQL
          category: data.postBy.categories.nodes[0]?.name || 'Uncategorized',
          tags: data.postBy.tags.nodes.map(tag => tag.name),
          image: {
            node: {
              mediaItemUrl: data.postBy.featuredImage?.node?.mediaItemUrl || '',
              altText: data.postBy.featuredImage?.node?.altText || data.postBy.title
            }
          }
        };

        return transformedPost;
      } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
      }
    },
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
