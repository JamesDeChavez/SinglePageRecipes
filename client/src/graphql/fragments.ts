import { gql } from "@apollo/client"

export const RecipesFragment = gql`
    fragment Recipes on User {
        recipes {
            title
            video {
              title
              thumbnail
              channel
              videoId
            }
            instructions {
              summary {
                action
                items
              }
              time
              description
              ingredients {
                name
                amount
              }
            }
            ingredients {
              name
              amount
            }
        }
    }
`

export const ProfileFragment = gql`
    fragment Profile on User {
      username
      email
      recipes {
        title
      }
    }
`