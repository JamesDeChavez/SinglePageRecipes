import { gql } from "@apollo/client"

export const LOGIN = gql`
query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      email
      password
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
      token
    }
  }
`

export const RETURNING_USER = gql`
  query ReturningUser {
    returningUser {
      _id
      username
      email
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
      token
    }
  }
`