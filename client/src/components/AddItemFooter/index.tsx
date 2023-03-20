import { useContext } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const AddItemFooter = () => {
    const { ingName, setIngName, ingAmount, setIngAmount, setIngredients, setAddIngredientActive } = useContext(CreateRecipeFormContext)

    const handleAddStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!ingName || !ingAmount  ) return
        const newItem = {
            name: ingName,
            amount: ingAmount
        }
        setIngredients(prevState => [...prevState, newItem])
        setIngName('')
        setIngAmount('')
        setAddIngredientActive(false)
    }

    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIngName('')
        setIngAmount('')
        setAddIngredientActive(false)
    }

    const className = 'AddItemFooter'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={handleAddStep}>Add Step</button>
            <button className={`${className}_button`} onClick={handleCancelClick}>Cancel</button>
        </div>
    )
}

export default AddItemFooter