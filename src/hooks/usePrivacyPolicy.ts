import { useQuery } from '@tanstack/react-query';
import { graphqlClient, PrivacyPolicy } from '@/lib/graphql';

const PRIVACY_POLICY_QUERY = `
  query GetPrivacyPolicyPage {
    pageBy(uri: "/privacy-policy") {
      title
      modified
      privacyPolicy {
        sections {
          title
          content
        }
      }
    }
  }
`;

interface PrivacyPolicyQueryResponse {
  pageBy: {
    title: string;
    modified: string;
    privacyPolicy: PrivacyPolicy;
  };
}

export const usePrivacyPolicy = () => {
  return useQuery({
    queryKey: ['privacyPolicyPage'],
    queryFn: async (): Promise<{ pageData: PrivacyPolicy; title: string; lastUpdated: string } | null> => {
      try {
        const data = await graphqlClient.request<PrivacyPolicyQueryResponse>(PRIVACY_POLICY_QUERY);
        if (!data.pageBy?.privacyPolicy) return null;
        
        return {
          pageData: data.pageBy.privacyPolicy,
          title: data.pageBy.title,
          lastUpdated: new Date(data.pageBy.modified).toLocaleDateString()
        };
      } catch (error) {
        console.error('Error fetching privacy policy page:', error);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
