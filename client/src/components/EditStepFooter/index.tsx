import { Ingredient, Instruction } from '../../utils/interfaces'
import './styles.css'

interface Props {
    action: string, setAction: React.Dispatch<React.SetStateAction<string>>,
    items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>, 
    time: string, setTime: React.Dispatch<React.SetStateAction<string>>,
    description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
    recipeIngredients: Ingredient[], setRecipeIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>, 
    instructions: Instruction[], setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>, 
    selectedStep: Instruction | undefined, setSelectedStep: React.Dispatch<React.SetStateAction<Instruction | undefined>>,
    setIngredientName: React.Dispatch<React.SetStateAction<string>>, setIngredientAmount: React.Dispatch<React.SetStateAction<string>>,
    setEditStepActive: React.Dispatch<React.SetStateAction<boolean>>
}

const EditStepFooter: React.FC<Props> = ({
    action, setAction,
    items, setItems, 
    time, setTime,
    description, setDescription,
    recipeIngredients, setRecipeIngredients, 
    setIngredientName, setIngredientAmount,
    instructions, setInstructions, 
    selectedStep, setSelectedStep,
    setEditStepActive 
}) => {

    const handleEditStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!action || !items.length || !time || !description || !recipeIngredients.length ) return
        const newStep = {
            summary: { action: action, items: items },
            time: time,
            description: description,
            ingredients: recipeIngredients
        }
        const indexToChange = instructions.findIndex(instruction => instruction.description === selectedStep?.description )
        const updatedInstructions = [...instructions]
        updatedInstructions[indexToChange] = newStep

        setInstructions(updatedInstructions)
        setSelectedStep(newStep)
        setAction('')
        setItems([])
        setTime('')
        setDescription('')
        setRecipeIngredients([])
        setIngredientName('')
        setIngredientAmount('')
        setEditStepActive(false)
    }

    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAction('')
        setItems([])
        setTime('')
        setDescription('')
        setRecipeIngredients([])
        setIngredientName('')
        setIngredientAmount('')
        setEditStepActive(false)
    }

    const className = 'EditStepFooter'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={handleEditStep}>Edit Step</button>
            <button className={`${className}_button`} onClick={handleCancelClick}>Cancel</button>
        </div>
    )
}

export default EditStepFooter