import { useMutation } from "@apollo/client"
import React, { useState, useContext } from "react"
import { client } from "../.."
import { UserLoggedInContext } from "../../App"
import { AuthRenderContext } from "../../branches/Auth"
import { CreateRecipeRenderContext } from "../../branches/CreateRecipe"
import { RecipesFragment } from "../../graphql/fragments"
import { CREATE_RECIPE } from "../../graphql/mutations"
import { Ingredient, Instruction } from "../../utils/interfaces"
import AddItemFooter from "../AddItemFooter"
import AddStepFooter from "../AddStepFooter"
import CreateRecipeIngredients from "../CreateRecipeIngredients"
import CreateRecipeInstructions from "../CreateRecipeInstructions"
import CreateRecipeNavbar from "../CreateRecipeNavbar"
import CreateRecipeVideoSection from "../CreateRecipeVideoSection"
import RecipeFooter from "../RecipeFooter"
import './styles.css'

export const CreateRecipeFormContext = React.createContext<{
    instructions: Instruction[], setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>,
    ingredients: Ingredient[], setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    ingName: string, setIngName: React.Dispatch<React.SetStateAction<string>>,
    ingAmount: string, setIngAmount: React.Dispatch<React.SetStateAction<string>>,
    addStepActive: boolean, setAddStepActive: React.Dispatch<React.SetStateAction<boolean>>,
    addIngredientActive: boolean, setAddIngredientActive: React.Dispatch<React.SetStateAction<boolean>>,
    action: string, setAction: React.Dispatch<React.SetStateAction<string>>,
    items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>,
    time: string, setTime: React.Dispatch<React.SetStateAction<string>>,
    description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
    ingredientName: string, setIngredientName: React.Dispatch<React.SetStateAction<string>>,
    ingredientAmount: string, setIngredientAmount: React.Dispatch<React.SetStateAction<string>>,
    recipeIngredients: Ingredient[], setRecipeIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}>({
    instructions: [], setInstructions: () => {},
    ingredients: [], setIngredients: () => {},
    ingName: '', setIngName: () => {},
    ingAmount: '', setIngAmount: () => {},
    addStepActive: false, setAddStepActive: () => {},
    addIngredientActive: false, setAddIngredientActive: () => {},
    action: '', setAction: () => {},
    items: [], setItems: () => {},
    time: '', setTime: () => {},
    description: '', setDescription: () => {},
    ingredientName: '', setIngredientName: () => {},
    ingredientAmount: '', setIngredientAmount: () => {},
    recipeIngredients: [], setRecipeIngredients: () => {}
})

const CreateRecipeForm = () => {
    const { videoSelected } = useContext(CreateRecipeRenderContext)
    const { userId } = useContext(UserLoggedInContext)
    const [RENDERS, setRender] = useContext(AuthRenderContext)
    const [createRecipe] = useMutation(CREATE_RECIPE)
    const currentRecipes = client.readFragment({ id: `User:${userId}`, fragment: RecipesFragment })

    const SECTIONS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(SECTIONS[0])
    const [addStepActive, setAddStepActive] = useState(false)
    const [addIngredientActive, setAddIngredientActive] = useState(false)
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState<Instruction[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [ingName, setIngName] = useState('')
    const [ingAmount, setIngAmount] = useState('')
    const [action, setAction] = useState('')
    const [items, setItems] = useState<string[]>([])
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState('')
    const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([])

    const handleCreateRecipe = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(!title || !videoSelected || !instructions.length || !ingredients.length) return
        const newRecipe = {
            title: title,
            video: videoSelected,
            instructions: instructions,
            ingredients: ingredients
        }
        try {            
            const currRecipesFormatted = currentRecipes.recipes.map((recipe: any) => {
                return {
                    title: recipe.title,
                    video: {
                        title: recipe.video.title,
                        thumbnail: recipe.video.thumbnail,
                        channel: recipe.video.channel,
                        videoId: recipe.video.videoId
                    },
                    instructions: recipe.instructions.map((step: any) => {
                        return {
                            summary: {
                                action: step.summary.action,
                                items: step.summary.items
                            },
                            time: step.time,
                            description: step.description,
                            ingredients: step.ingredients.map((item: any) => {
                                return {
                                    name: item.name,
                                    amount: item.amount
                                }
                            })
                        }
                    }),
                    ingredients: recipe.ingredients.map((ing: any) => {
                        return {
                            name: ing.name,
                            amount: ing.amount
                        }
                    })
                }
            })
            const newRecipes = await createRecipe({ variables: { userId, recipes: [...currRecipesFormatted, newRecipe] }})
            if (newRecipes) setRender(RENDERS[0])

        } catch (error) {
            console.log(error)
        }
    }

    const className = 'CreateRecipeForm'
    return (
    <CreateRecipeFormContext.Provider value={{ 
        ingredients, setIngredients, ingName, setIngName, ingAmount, setIngAmount, instructions, setInstructions, addStepActive, setAddStepActive, addIngredientActive, setAddIngredientActive, action, setAction, items, setItems, time, setTime, description, setDescription, ingredientName, setIngredientName, ingredientAmount, setIngredientAmount, recipeIngredients, setRecipeIngredients
    }} >
        <div className={className}>
            <CreateRecipeNavbar handleCreateRecipe={handleCreateRecipe} />
            <div className={`${className}_main`}>
                <CreateRecipeVideoSection title={title} setTitle={setTitle} />
                {{
                    [SECTIONS[0]]: <CreateRecipeInstructions />,
                    [SECTIONS[1]]: <CreateRecipeIngredients />
                }[sectionVisible]}                
            </div>
            {addStepActive ?
                <AddStepFooter />
            :
                addIngredientActive ?
                    <AddItemFooter />
                :

                    <RecipeFooter setSectionVisible={setSectionVisible} /> 
            }
        </div>
    </CreateRecipeFormContext.Provider>
    )
}

export default CreateRecipeForm