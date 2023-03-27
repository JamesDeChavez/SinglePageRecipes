import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!) {
        createUser(username: $username, password: $password, email: $email) {
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

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($recipes: [RecipeInput]!, $userId: String!) {
    createRecipe(recipes: $recipes, userId: $userId) {
      _id
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
  }
`

export const EDIT_RECIPE = gql`
  mutation EditRecipe($recipes: [RecipeInput]!, $userId: String!) {
    editRecipe(recipes: $recipes, userId: $userId) {
      _id
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
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
    }
  }
`

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($userId: String!, $recipes: [RecipeInput]!) {
    deleteRecipe(userId: $userId, recipes: $recipes) {
      _id
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
  }
`