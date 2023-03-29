export interface Context {
    authScope: string | undefined
}

export interface LoginInputs {
    username: string,
    password: string
}

export interface RegisterInputs {
    username: string,
    password: string,
    email: string
}

export interface RecipeInputs {
    userId: string,
    recipes: Recipe[]
}

export interface Recipe {
    title: string,
    video: {
        title: string,
        thumbnail: string,
        channel: string,
        videoId: string
    },
    instructions: Instruction[],
    ingredients: Ingredient[]
}

export interface Instruction {
    summary: {
        action: string,
        items: string[]
    },
    time: string,
    description: string,
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string,
    amount: string
}