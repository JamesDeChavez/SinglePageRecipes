const typeDefs = `#graphql
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        recipes:[Recipe]!
    }

    type Recipe {
        title: String!
        video: Video!
        instructions: [Instruction]!
        ingredients: [Ingredient]!
    }

    type Video {
        title: String!
        thumbnail: String!
        channel: String!
        videoId: String!
    }

    type Instruction {
        summary: Summary!
        time: String!
        description: String!
        ingredients: [Ingredient]!
    }

    type Summary {
        action: String!
        items: [String]!
    }

    type Ingredient {
        name: String!
        amount: String!
    }

    type Query {
        user(id: ID): User
    }

    type Mutation {
        createUser(username: String!, password: String!, email: String!): User
    }

`

export default typeDefs