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

export interface AboutUsPoint {
  icon: string[];
  label: string;
  value: string;
}

export interface HomePageAboutUs {
  title: string;
  label: string;
  content: string;
  points: AboutUsPoint[];
}

export interface VisionMissionItem {
  title: string;
  description: string;
}

export interface HomePageVisionMission {
  items: VisionMissionItem[];
}

export interface ProgrammeImage {
  node: {
    mediaItemUrl: string;
  };
}

export interface Programme {
  title: string;
  description: string;
  image: ProgrammeImage;
}

export interface ExamFeature {
  featureName: string;
}

export interface ExamImage {
  nodes: {
    mediaItemUrl: string;
    altText: string;
  }[];
}

export interface Exam {
  title: string;
  description: string;
  features: ExamFeature[];
  images: ExamImage;
}

export interface HomePageProgrammesAndExams {
  title: string;
  subtitle: string;
  programmesTabLabel: string;
  examinationsTabLabel: string;
  programmes: Programme[];
  examinations: Exam[];
}

export interface CompetitionImage {
  mediaItemUrl: string;
  altText: string;
}

export interface CompetitionProgram {
  title: string;
  description: string;
  images: {
    nodes: CompetitionImage[];
  };
}

export interface HomePageCompetitionExcellence {
  title: string;
  subtitle: string;
  items: CompetitionProgram[];
}

export interface EventImage {
  mediaItemUrl: string;
  altText: string;
}

export interface Event {
  title: string;
  subtitle: string;
  description: string;
  isUpcomingEvent: boolean; // Boolean field to determine if event is upcoming
  images: {
    nodes: EventImage[];
  };
}

export interface HomePageEvents {
  title: string;
  subtitle: string;
  pastEventsLabel: string;
  upcomingEventsLabel: string;
  events: Event[]; // Single events array to be filtered by date
}

export interface EventItem {
  title: string;
  subtitle: string;
  description: string;
  isUpcomingEvent: boolean;
  images: {
    edges: {
      node: {
        mediaItemUrl: string;
      };
    }[];
  };
}

export interface EventsOptions {
  events: {
    eventItems: EventItem[];
  };
}

export interface AchievementItem {
  icon: string;
  title: string;
  results: AchievementResult[];
}

export interface AchievementsOptions {
  achievements: {
    achievementItems: AchievementItem[];
  };
}

export interface Teacher {
  name: string;
  specialty: string;
  credentials: string;
  experience: string;
  image: {
    node: {
      mediaItemUrl: string;
      altText?: string;
    };
  };
  isFounder?: boolean;
}

export interface HomePageTeachers {
  title: string;
  subtitle: string;
  teachers: Teacher[];
}

export interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface HomePageReviews {
  title: string;
  subtitle: string;
  reviews: Review[];
}

export interface AchievementResult {
  name: string;
  placement: string;
  category: string;
}

export interface Achievement {
  title: string;
  icon: string; // Icon name for dynamic icon selection
  results: AchievementResult[];
}

export interface HomePageAchievements {
  title: string;
  subtitle: string;
  achievementItems: Achievement[];
}

export interface PageBy {
  uri: string;
  homePageHero: HomePageHero;
  homePageTrialSection: HomePageTrialSection;
  homePageAboutUs: HomePageAboutUs;
  homePageVisionMission: HomePageVisionMission;
  homePageProgrammesAndExams: HomePageProgrammesAndExams;
  homePageCompetitionExcellence: HomePageCompetitionExcellence;
  homePageEvents: HomePageEvents;
  homePageAchievements: HomePageAchievements;
  homePageTeachers: HomePageTeachers;
  homePageReviews: HomePageReviews;
}

export interface HomePageQueryResponse {
  pageBy: PageBy;
  eventsOptions: EventsOptions;
  achievementsOptions: AchievementsOptions;
}
