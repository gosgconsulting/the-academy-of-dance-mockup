import { gql } from 'graphql-request';

// GraphQL query for home page data
export const HOME_PAGE_QUERY = gql`
  query NewQuery {
    pageBy(uri: "/home") {
      homePageHero {
        heroButton
        heroHeadline
        heroTagline
        heroImages {
          nodes {
            mediaItemUrl
          }
        }
      }
      trialSection {
        statistics {
          awardsWon
          awardsWonValue
          yearsExperience
          yearsExperienceValue
          successRate
          successRateValue
          studentsTrained
          studentsTrainedValue
        }
        title
        subTitle
        joinLabel
        classes {
          className
        }
        contactInformation
        contactName
        contactPhone
        contactAddress
      }
    }
  }
`;
