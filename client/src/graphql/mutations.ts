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
        }
    }
`