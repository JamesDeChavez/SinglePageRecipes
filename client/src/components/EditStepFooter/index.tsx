import { useContext } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const EditStepFooter = () => {
    const { action, setAction,
            items, setItems, 
            time, setTime,
            description, setDescription,
            recipeIngredients, setRecipeIngredients, 
            setIngredientName, setIngredientAmount,
            instructions, setInstructions, 
            selectedStep, setSelectedStep,
            setEditStepActive 
    } = useContext(CreateRecipeFormContext)

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