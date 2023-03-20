import { useContext } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const AddStepFooter = () => {
    const { action, setAction,
            items, setItems, 
            time, setTime,
            description, setDescription,
            recipeIngredients, setRecipeIngredients,
            setItem, setIngredientName, setIngredientAmount,
            setInstructions, setAddStepActive } = useContext(CreateRecipeFormContext)

    const handleAddStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!action || !items.length || !time || !description || !recipeIngredients.length ) return
        const newStep = {
            summary: { action: action, items: items },
            time: time,
            description: description,
            ingredients: recipeIngredients
        }
        setInstructions(prevState => [...prevState, newStep])
        setAction('')
        setItems([])
        setTime('')
        setDescription('')
        setRecipeIngredients([])
        setItem('')
        setIngredientName('')
        setIngredientAmount('')
        setAddStepActive(false)
    }

    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAction('')
        setItems([])
        setTime('')
        setDescription('')
        setRecipeIngredients([])
        setItem('')
        setIngredientName('')
        setIngredientAmount('')
        setAddStepActive(false)
    }

    const className = 'AddStepFooter'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={handleAddStep}>Add Step</button>
            <button className={`${className}_button`} onClick={handleCancelClick}>Cancel</button>
        </div>
    )
}

export default AddStepFooter