import { useContext, useRef, useEffect } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const AddStepForm = () => {
    const { action, setAction,
            items, setItems,
            time, setTime,
            description, setDescription,
            ingredientName, setIngredientName,
            ingredientAmount, setIngredientAmount,
            recipeIngredients, setRecipeIngredients 
    } = useContext(CreateRecipeFormContext)

    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [inputRef])

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!ingredientName || !ingredientAmount) return
        setItems(prevState => [...prevState, ingredientName])
        setRecipeIngredients(prevState => [...prevState, {name: ingredientName, amount: ingredientAmount }])
        setIngredientName('')
        setIngredientAmount('')
    }

    const handleIngredientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!ingredientName.length) setIngredientName(e.target.value.toUpperCase())
        else if (ingredientName.charAt(ingredientName.length - 1) === ' ' && e.target.value.length >= ingredientName.length) setIngredientName(e.target.value.substring(0, e.target.value.length - 1).concat(e.target.value.charAt(e.target.value.length - 1).toUpperCase()))
        else setIngredientName(e.target.value)        
    }

    const className = 'AddStepForm'
    return (
        <form className={className}>
            <h2 className={`${className}_header`}>Create Step</h2>
            <div className={`${className}_summaryContainer`}>
                <input 
                    type="text" name="action" id="action" placeholder='Action' value={action} autoComplete='off' maxLength={5} onChange={e => setAction(e.target.value.toUpperCase())} className={`${className}_actionInput`} ref={inputRef}
                />
                <p className={`${className}_text`}>
                    { items.length ? items.map((itm, idx) => idx !== items.length - 1 ? `${itm}, ` : itm ) : '[No Ingredients Added]' }
                </p>
            </div>
            <div className={`${className}_ingredientInputContainer`}>
                <input 
                    type="text" name='ingredientName' id='ingredientName' placeholder='Ingredient Name' value={ingredientName} autoComplete='off' maxLength={25} onChange={handleIngredientNameChange} className={`${className}_ingredientNameInput`} 
                />
                <input 
                    type="text" name='ingredientAmount' id='ingredientAmount' placeholder='Amount' value={ingredientAmount} autoComplete='off' maxLength={9} onChange={e => setIngredientAmount(e.target.value)} className={`${className}_ingredientAmountInput`} 
                />
                <button className={`${className}_addIngredientButton`} onClick={handleAddIngredient} >Add</button>
            </div>
            <div className={`${className}_textAreaContainer`}>
                <textarea 
                    name="description" id="description" placeholder='Description' value={description} autoComplete='off' maxLength={170} onChange={e => setDescription(e.target.value)} className={`${className}_descriptionInput`} >
                </textarea>
                <span className={`${className}_charLimit`}>{`${description.length} / 170`}</span>
            </div>
            <input 
                type="text" name='time' id='time' placeholder='Time' value={time} autoComplete='off' maxLength={6} onChange={e => setTime(e.target.value)} className={`${className}_timeInput`} 
            />
            <div className={`${className}_ingredientsContainer`}>
                {recipeIngredients.length ? 
                    recipeIngredients.map((ing, i) => {
                        return <p className={`${className}_text`} key={i}>{`${ing.name} - ${ing.amount}`}</p>
                    })
                :
                    <p className={`${className}_text`}>[No Ingredients Added]</p>
                }
            </div>

        </form>
    )
}

export default AddStepForm