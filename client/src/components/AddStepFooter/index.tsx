import { Ingredient, Instruction } from '../../utils/interfaces'
import './styles.css'

interface Props {
    action: string, setAction: React.Dispatch<React.SetStateAction<string>>,
    items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>,
    time: string, setTime: React.Dispatch<React.SetStateAction<string>>,
    description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
    ingredientName: string, setIngredientName: React.Dispatch<React.SetStateAction<string>>,
    ingredientAmount: string, setIngredientAmount: React.Dispatch<React.SetStateAction<string>>,
    recipeIngredients: Ingredient[], setRecipeIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>, setAddStepActive: React.Dispatch<React.SetStateAction<boolean>> 

}

const AddStepFooter: React.FC<Props> = ({
    action, setAction,
    items, setItems,
    time, setTime,
    description, setDescription,
    recipeIngredients, setRecipeIngredients,
    setIngredientName, setIngredientAmount,
    setInstructions, setAddStepActive 
}) => {
   

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