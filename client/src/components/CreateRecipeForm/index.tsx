import React, { useState, useContext } from "react"
import { CreateRecipeRenderContext } from "../../branches/CreateRecipe"
import { Ingredient, Instruction } from "../../utils/interfaces"
import AddStepFooter from "../AddStepFooter"
import CreateRecipeIngredients from "../CreateRecipeIngredients"
import CreateRecipeInstructions from "../CreateRecipeInstructions"
import CreateRecipeNavbar from "../CreateRecipeNavbar"
import CreateRecipeVideoSection from "../CreateRecipeVideoSection"
import RecipeFooter from "../RecipeFooter"
import './styles.css'

export const CreateRecipeFormContext = React.createContext<{
    instructions: Instruction[],
    setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>,
    ingredients: Ingredient[],
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    addStepActive: boolean,
    setAddStepActive: React.Dispatch<React.SetStateAction<boolean>>
}>({
    instructions: [],
    setInstructions: () => {},
    ingredients: [],
    setIngredients: () => {},
    addStepActive: false,
    setAddStepActive: () => {}
})

const CreateRecipeForm = () => {
    const { videoSelected, setVideoSelected } = useContext(CreateRecipeRenderContext)
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const [addStepActive, setAddStepActive] = useState(false)
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState<Instruction[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    const handleCreateRecipe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newRecipe = {
            video: videoSelected
        }
        console.log(newRecipe)
    }

    const className = 'CreateRecipeForm'
    return (
    <CreateRecipeFormContext.Provider value={{ ingredients, setIngredients, instructions, setInstructions, addStepActive, setAddStepActive }} >
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
                <RecipeFooter setSectionVisible={setSectionVisible} /> 
            }
        </div>
    </CreateRecipeFormContext.Provider>
    )
}

export default CreateRecipeForm