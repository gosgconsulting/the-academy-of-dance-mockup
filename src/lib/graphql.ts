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
  heroButton: string;
  heroHeadline: string;
  heroTagline: string;
  heroImages: {
    nodes: HeroImage[];
  };
}

export interface TrialClass {
  className: string;
}

export interface TrialStatistics {
  awardsWon: string;
  awardsWonValue: string;
  yearsExperience: string;
  yearsExperienceValue: string;
  successRate: string;
  successRateValue: string;
  studentsTrained: string;
  studentsTrainedValue: string;
}

export interface HomePageTrialSection {
  statistics: TrialStatistics;
  title: string;
  subTitle: string;
  joinLabel: string;
  classes: TrialClass[];
  contactInformation: string;
  contactName: string;
  contactPhone: string;
  contactAddress: string;
}

export interface PageBy {
  uri: string;
  homePageHero: HomePageHero;
  homePageTrialSection: HomePageTrialSection;
}

export interface HomePageQueryResponse {
  pageBy: PageBy;
}
