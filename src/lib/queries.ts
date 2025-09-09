import { gql } from 'graphql-request';

// GraphQL query for home page hero data
export const HOME_PAGE_HERO_QUERY = gql`
  query NewQuery {
    pageBy(uri: "/home") {
      uri
      homePageHero {
        fieldGroupName
        heroButton
        heroHeadline
        heroTagline
        heroImages {
          nodes {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
