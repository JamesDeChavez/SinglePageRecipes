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
    include?: boolean
}