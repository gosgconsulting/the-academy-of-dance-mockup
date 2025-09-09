import { useQuery } from '@tanstack/react-query';
import { graphqlClient, HomePageQueryResponse } from '@/lib/graphql';
import { HOME_PAGE_HERO_QUERY } from '@/lib/queries';

/**
 * Custom hook to fetch hero data from WordPress GraphQL API
 * @returns Query result with hero data, loading state, and error handling
 */
export const useHeroData = () => {
  return useQuery({
    queryKey: ['homePageHero'],
    queryFn: async (): Promise<HomePageQueryResponse> => {
      const data = await graphqlClient.request(HOME_PAGE_HERO_QUERY);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
