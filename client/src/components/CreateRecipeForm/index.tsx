import React, { useState, useContext, useRef } from "react"
import { useMutation } from "@apollo/client"
import { client } from "../../index"
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
import CreateRecipeActions from "../CreateRecipeActions"
import EditStepFooter from "../EditStepFooter"
import EditItemFooter from "../EditItemFooter"
import './styles.css'

export const CreateRecipeFormContext = React.createContext<{
    instructions: Instruction[], setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>,
    ingredients: Ingredient[], setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    ingName: string, setIngName: React.Dispatch<React.SetStateAction<string>>,
    ingAmount: string, setIngAmount: React.Dispatch<React.SetStateAction<string>>,
    addStepActive: boolean, setAddStepActive: React.Dispatch<React.SetStateAction<boolean>>,
    editStepActive: boolean, setEditStepActive: React.Dispatch<React.SetStateAction<boolean>>,
    addIngredientActive: boolean, setAddIngredientActive: React.Dispatch<React.SetStateAction<boolean>>,
    editIngredientActive: boolean, setEditIngredientActive: React.Dispatch<React.SetStateAction<boolean>>,
    action: string, setAction: React.Dispatch<React.SetStateAction<string>>,
    items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>,
    time: string, setTime: React.Dispatch<React.SetStateAction<string>>,
    description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
    ingredientName: string, setIngredientName: React.Dispatch<React.SetStateAction<string>>,
    ingredientAmount: string, setIngredientAmount: React.Dispatch<React.SetStateAction<string>>,
    recipeIngredients: Ingredient[], setRecipeIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    selectedStep: Instruction | undefined, setSelectedStep: React.Dispatch<React.SetStateAction<Instruction | undefined>>,
    selectedItem: Ingredient | undefined, setSelectedItem: React.Dispatch<React.SetStateAction<Ingredient | undefined>>
}>({
    instructions: [], setInstructions: () => {},
    ingredients: [], setIngredients: () => {},
    ingName: '', setIngName: () => {},
    ingAmount: '', setIngAmount: () => {},
    addStepActive: false, setAddStepActive: () => {},
    editStepActive: false, setEditStepActive: () => {},
    addIngredientActive: false, setAddIngredientActive: () => {},
    editIngredientActive: false, setEditIngredientActive: () => {},
    action: '', setAction: () => {},
    items: [], setItems: () => {},
    time: '', setTime: () => {},
    description: '', setDescription: () => {},
    ingredientName: '', setIngredientName: () => {},
    ingredientAmount: '', setIngredientAmount: () => {},
    recipeIngredients: [], setRecipeIngredients: () => {},
    selectedStep: undefined, setSelectedStep: () => {},
    selectedItem: undefined, setSelectedItem: () => {}
})

const CreateRecipeForm = () => {
    const { videoSelected } = useContext(CreateRecipeRenderContext)
    const { userId } = useContext(UserLoggedInContext)
    const [RENDERS, setRender] = useContext(AuthRenderContext)
    const [createRecipe, { loading }] = useMutation(CREATE_RECIPE)
    const currentRecipes = client.readFragment({ id: `User:${userId}`, fragment: RecipesFragment })

    const SECTIONS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(SECTIONS[0])
    const [addStepActive, setAddStepActive] = useState(false)
    const [editStepActive, setEditStepActive] = useState(false)
    const [addIngredientActive, setAddIngredientActive] = useState(false)
    const [editIngredientActive, setEditIngredientActive] = useState(false)
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
    const [selectedStep, setSelectedStep] = useState<Instruction>()
    const [selectedItem, setSelectedItem] = useState<Ingredient>()
    const root = useRef(null)

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
        ingredients, setIngredients, ingName, setIngName, ingAmount, setIngAmount, instructions, setInstructions, addStepActive, setAddStepActive, editStepActive, setEditStepActive, addIngredientActive, setAddIngredientActive, editIngredientActive, setEditIngredientActive, action, setAction, items, setItems, time, setTime, description, setDescription, ingredientName, setIngredientName, ingredientAmount, setIngredientAmount, recipeIngredients, setRecipeIngredients, selectedStep, setSelectedStep, selectedItem, setSelectedItem
    }} >
        <div className={className} ref={root} >
            <CreateRecipeNavbar handleCreateRecipe={handleCreateRecipe} loading={loading} />
            <div className={`${className}_midSection`}>
                <CreateRecipeVideoSection title={title} setTitle={setTitle} />
                <CreateRecipeActions handleCreateRecipe={handleCreateRecipe} root={root} loading={loading} />
                <div className={`${className}_main`}>
                    {{
                        [SECTIONS[0]]: <CreateRecipeInstructions />,
                        [SECTIONS[1]]: <CreateRecipeIngredients />
                    }[sectionVisible]}
                </div>
                <div className={`${className}_mainWide`}>
                    <CreateRecipeInstructions />
                    <CreateRecipeIngredients />
                </div>                   
            </div>
            { addStepActive ?
                <AddStepFooter 
                    action={action} setAction={setAction}
                    items={items} setItems={setItems}
                    time={time} setTime={setTime}
                    description={description} setDescription={setDescription}
                    setIngredientName={setIngredientName} setIngredientAmount={setIngredientAmount}
                    recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients}
                    setInstructions={setInstructions} setAddStepActive={setAddStepActive}
                />
            : editStepActive ?
                <EditStepFooter 
                    action={action} setAction={setAction}
                    items={items} setItems={setItems}
                    time={time} setTime={setTime}
                    description={description} setDescription={setDescription}
                    recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients}
                    setIngredientName={setIngredientName} setIngredientAmount={setIngredientAmount}
                    instructions={instructions} setInstructions={setInstructions}
                    selectedStep={selectedStep} setSelectedStep={setSelectedStep}
                    setEditStepActive={setEditStepActive}
                />
            : addIngredientActive ?
                <AddItemFooter 
                    ingName={ingName} setIngName={setIngName} 
                    ingAmount={ingAmount} setIngAmount={setIngAmount} setIngredients={setIngredients} setAddIngredientActive={setAddIngredientActive}  
                />
            : editIngredientActive ?
                <EditItemFooter 
                    ingName={ingName} setIngName={setIngName} 
                    ingAmount={ingAmount} setIngAmount={setIngAmount} 
                    ingredients={ingredients} setIngredients={setIngredients} 
                    setEditIngredientActive={setEditIngredientActive} selectedItem={selectedItem} 
                />
            :
                <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={ setSectionVisible } /> 
            }
        </div>
    </CreateRecipeFormContext.Provider>
    )
}

export default CreateRecipeForm