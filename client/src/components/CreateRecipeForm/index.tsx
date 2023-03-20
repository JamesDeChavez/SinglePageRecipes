import React, { useState, useContext } from "react"
import { CreateRecipeRenderContext } from "../../branches/CreateRecipe"
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
    item: string, setItem: React.Dispatch<React.SetStateAction<string>>,
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
    item: '', setItem: () => {},
    items: [], setItems: () => {},
    time: '', setTime: () => {},
    description: '', setDescription: () => {},
    ingredientName: '', setIngredientName: () => {},
    ingredientAmount: '', setIngredientAmount: () => {},
    recipeIngredients: [], setRecipeIngredients: () => {}
})

const CreateRecipeForm = () => {
    const { videoSelected, setVideoSelected } = useContext(CreateRecipeRenderContext)
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const [addStepActive, setAddStepActive] = useState(false)
    const [addIngredientActive, setAddIngredientActive] = useState(false)
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState<Instruction[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [ingName, setIngName] = useState('')
    const [ingAmount, setIngAmount] = useState('')
    const [action, setAction] = useState('')
    const [item, setItem] = useState('')
    const [items, setItems] = useState<string[]>([])
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState('')
    const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([])

    const handleCreateRecipe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(!title || !videoSelected || !instructions.length || !ingredients.length) return
        const newRecipe = {
            title: title,
            video: videoSelected,
            instructions: instructions,
            ingredients: ingredients
        }
        console.log(newRecipe)
    }

    const className = 'CreateRecipeForm'
    return (
    <CreateRecipeFormContext.Provider value={{ 
        ingredients, setIngredients, ingName, setIngName, ingAmount, setIngAmount, instructions, setInstructions, addStepActive, setAddStepActive, addIngredientActive, setAddIngredientActive, action, setAction, item, setItem, items, setItems, time, setTime, description, setDescription, ingredientName, setIngredientName, ingredientAmount, setIngredientAmount, recipeIngredients, setRecipeIngredients
    }} >
        <div className={className}>
            <CreateRecipeNavbar handleCreateRecipe={handleCreateRecipe} />
            <div className={`${className}_main`}>
                <CreateRecipeVideoSection title={title} setTitle={setTitle} />
                {{
                    [RENDERS[0]]: <CreateRecipeInstructions />,
                    [RENDERS[1]]: <CreateRecipeIngredients />
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