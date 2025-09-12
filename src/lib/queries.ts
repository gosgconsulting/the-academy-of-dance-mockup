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
      homePageTrialSection {
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
      homePageAboutUs {
        title
        label
        content
        points {
          icon
          label
          value
        }
      }
      homePageVisionMission {
        items {
          title
          description
        }
      }
      homePageProgrammesAndExams {
        title
        subtitle
        programmesTabLabel
        examinationsTabLabel
        programmes {
          title
          description
          image {
            node {
              mediaItemUrl
            }
          }
        }
        examinations {
          title
          description
          features {
            featureName
          }
          images {
            nodes {
              mediaItemUrl
              altText
            }
          }
        }
      }
      homePageCompetitionExcellence {
        title
        subtitle
        items {
          title
          description
          images {
            nodes {
              mediaItemUrl
              altText
            }
          }
        }
      }
      homePageEvents {
        title
        subtitle
        pastEventsLabel
        upcomingEventsLabel
      }
      homePageAchievements {
        title
        subtitle
      }
       homePageTeachers {
         title
         subtitle
         teachers {
           name
           specialty
           credentials
           experience
           image {
             node {
               mediaItemUrl
               altText
             }
           }
           isFounder
         }
       }
       homePageReviews {
         title
         subtitle
         reviews {
           name
           role
           content
           rating
         }
       }
       homePageLocations {
         title
         subtitle
         locations {
           name
           address
           unit
           postalCode
           phone
           googleMapsUrl
           image {
             node {
               mediaItemUrl
               altText
             }
           }
         }
       }
       homePageGallery {
         title
         subtitle
         galleryItems {
           title
           image {
             node {
               mediaItemUrl
               altText
             }
           }
         }
       }
    }
    eventsOptions {
      events {
        eventItems {
          title
          subtitle
          description
          images {
            edges {
              node {
                mediaItemUrl
              }
            }
          }
          isUpcomingEvent
        }
      }
    }
    achievementsOptions {
      achievements {
        achievementItems {
          icon
          title
          results {
            name
            placement
            category
          }
        }
      }
    }
  }
`;
