import { useQuery } from '@tanstack/react-query';
import { graphqlClient, TermsConditions } from '@/lib/graphql';

const TERMS_CONDITIONS_QUERY = `
  query GetTermsConditionsPage {
    pageBy(uri: "/terms-conditions") {
      title
      modified
      termsCondition {
        sections {
          title
          content
        }
      }
    }
  }
`;

interface TermsConditionsQueryResponse {
  pageBy: {
    title: string;
    modified: string;
    termsCondition: TermsConditions;
  };
}

export const useTermsConditions = () => {
  return useQuery({
    queryKey: ['termsConditionsPage'],
    queryFn: async (): Promise<{ pageData: TermsConditions; title: string; lastUpdated: string } | null> => {
      try {
        const data = await graphqlClient.request<TermsConditionsQueryResponse>(TERMS_CONDITIONS_QUERY);
        if (!data.pageBy?.termsCondition) return null;
        
        return {
          pageData: data.pageBy.termsCondition,
          title: data.pageBy.title,
          lastUpdated: new Date(data.pageBy.modified).toLocaleDateString()
        };
      } catch (error) {
        console.error('Error fetching terms conditions page:', error);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
