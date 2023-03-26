import { useContext } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const EditItemFooter = () => {
    const { ingName, setIngName, ingAmount, setIngAmount, ingredients, setIngredients, setEditIngredientActive, selectedItem } = useContext(CreateRecipeFormContext)

    const handleEditStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!ingName || !ingAmount || !selectedItem ) return
        const newItem = {
            name: ingName,
            amount: ingAmount
        }
        const indexToChange = ingredients.findIndex(item => item.name === selectedItem.name)
        const updatedIngredients = [...ingredients]
        updatedIngredients[indexToChange] = newItem
        setIngredients(updatedIngredients)
        setIngName('')
        setIngAmount('')
        setEditIngredientActive(false)
    }

    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIngName('')
        setIngAmount('')
        setEditIngredientActive(false)
    }

    const className = 'EditItemFooter'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={handleEditStep}>Edit Step</button>
            <button className={`${className}_button`} onClick={handleCancelClick}>Cancel</button>
        </div>
    )
}

export default EditItemFooter