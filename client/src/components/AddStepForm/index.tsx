import { useState } from 'react'
import { Ingredient } from '../../utils/interfaces'
import './styles.css'

const AddStepForm = () => {
    const [action, setAction] = useState('')
    const [item, setItem] = useState('')
    const [items, setItems] = useState<string[]>([])
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    const handleAddItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!item) return
        setItems(prevState => [...prevState, item])
        setItem('')
    }

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!ingredientName || !ingredientAmount) return
        setIngredients(prevState => [...prevState, {name: ingredientName, amount: ingredientAmount }])
        setIngredientName('')
        setIngredientAmount('')
    }

    const className = 'AddStepForm'
    return (
        <form className={className}>
            <h2 className={`${className}_header`}>Create Step</h2>
            <div className={`${className}_summaryContainer`}>
                <input type="text" name="action" id="action" placeholder='Action' value={action} maxLength={5} onChange={e => setAction(e.target.value.toUpperCase())} className={`${className}_actionInput`} />
                <p className={`${className}_text`}>
                    { items.length ? items.map((itm, idx) => idx !== items.length - 1 ? `${itm}, ` : itm ) : '[No Items Added]' }
                </p>
            </div>
            <div className={`${className}_itemContainer`}>
                <input type="text" name='item' id='item' placeholder='item' value={item} maxLength={20} onChange={e => setItem(e.target.value)} className={`${className}_itemInput`}  />
                <button className={`${className}_addItemButton`} onClick={handleAddItem}>Add</button>
            </div>
            <input type="text" name='time' id='time' placeholder='time' value={time} maxLength={6} onChange={e => setTime(e.target.value)} className={`${className}_timeInput`} />
            <textarea name="description" id="description" placeholder='description' value={description} maxLength={170} onChange={e => setDescription(e.target.value)} className={`${className}_descriptionInput`} ></textarea>
            <div className={`${className}_ingredientInputContainer`}>
                <input type="text" name='ingredientName' id='ingredientName' placeholder='Ingredient Name' value={ingredientName} maxLength={20} onChange={e => setIngredientName(e.target.value)} className={`${className}_ingredientNameInput`} />
                <input type="text" name='ingredientAmount' id='ingredientAmount' placeholder='Amount' value={ingredientAmount} maxLength={8} onChange={e => setIngredientAmount(e.target.value)} className={`${className}_ingredientAmountInput`} />
                <button className={`${className}_addIngredientButton`} onClick={handleAddIngredient} >Add</button>
            </div>
            <div className={`${className}_ingredientsContainer`}>
                {ingredients.length ? 
                    ingredients.map(ing => {
                        return <p className={`${className}_text`}>{`${ing.name} - ${ing.amount}`}</p>
                    })
                :
                    <p className={`${className}_text`}>[No Ingredients Added]</p>
                }
            </div>

        </form>
    )
}

export default AddStepForm