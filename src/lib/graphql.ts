import { GraphQLClient } from 'graphql-request';

// GraphQL endpoint from environment variables
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

// Create GraphQL client
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for the home page hero data
export interface HeroImage {
  mediaItemUrl: string;
}

export interface HomePageHero {
  fieldGroupName: string;
  heroButton: string;
  heroHeadline: string;
  heroTagline: string;
  heroImages: {
    nodes: HeroImage[];
  };
}

export interface PageBy {
  uri: string;
  homePageHero: HomePageHero;
}

export interface HomePageQueryResponse {
  pageBy: PageBy;
}
