import gsap from 'gsap'
import { useContext, useRef, useEffect, useLayoutEffect } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const AddStepForm = () => {
    const { action, setAction,
            items, setItems,
            time, setTime,
            description, setDescription,
            ingredientName, setIngredientName,
            ingredientAmount, setIngredientAmount,
            recipeIngredients, setRecipeIngredients,
            setAddStepActive, setInstructions
    } = useContext(CreateRecipeFormContext)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const root = useRef(null)
    
    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [inputRef])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_actionInput`, { x: 1000 }, { duration: 0.5, x: 0})
            gsap.fromTo(`.${className}_text`, { x: 1000 }, { duration: 0.5, x: 0})
            gsap.fromTo(`.${className}_ingredientInputContainer`, { x: 1000 }, { duration: 0.5, x: 0})
            gsap.fromTo(`.${className}_textAreaContainer`, { x: 1000 }, { duration: 0.5, x: 0})
            gsap.fromTo(`.${className}_timeInput`, { x: 1000 }, { duration: 0.5, x: 0})
            return () => gsapContext.revert()
        }, root)
    }, [])

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

    const handleAddClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    

    const handleCancelClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

    const className = 'AddStepForm'
    return (
        <form className={className} ref={root} >
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
            <div className={`${className}_buttonsContainer`}>
                <button className={`${className}_button`} onClick={handleAddClick}>Add</button>
                <button className={`${className}_button`} onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    )
}

export default AddStepForm