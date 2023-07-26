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
    amount: string,
    brand?: string,
    include?: boolean
}

export interface Video {
    title: string,
    thumbnail: string,
    channel: string,
    videoId: string
}

export interface Recipe {
    _id?: string,
    title: string,
    video: Video,
    instructions: Instruction[],
    ingredients: Ingredient[]
}