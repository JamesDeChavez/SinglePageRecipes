const typeDefs = `#graphql
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        recipes: [Recipe]!
        token: String
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

    input RecipeInput {
        title: String!
        video: VideoInput!
        instructions: [InstructionInput]!
        ingredients: [IngredientInput]!
    }

    input VideoInput {
        title: String!
        thumbnail: String!
        channel: String!
        videoId: String!
    }

    input InstructionInput {
        summary: SummaryInput!
        time: String!
        description: String!
        ingredients: [IngredientInput]!
    }

    input SummaryInput {
        action: String!
        items: [String]!
    }

    input IngredientInput {
        name: String!
        amount: String!
    }

    type Query {
        user(id: ID!): User
        login(username: String!, password: String!): User
        returningUser: User
    }

    type Mutation {
        createUser(username: String!, password: String!, email: String!): User
        createRecipe(userId: String!, recipes: [RecipeInput]!): User
        editRecipe(userId: String!, recipes: [RecipeInput]!): User
        deleteUser(id: ID!): User
        deleteRecipe(userId: String!, recipes: [RecipeInput]!): User
    }

`

export default typeDefs