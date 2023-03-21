import { useContext, useRef, useEffect } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const AddItemForm = () => {
    const { ingName, setIngName, ingAmount, setIngAmount  } = useContext(CreateRecipeFormContext)

    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [inputRef])

    const handleIngNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!ingName.length) setIngName(e.target.value.toUpperCase())
        else if (ingName.charAt(ingName.length - 1) === ' ' && e.target.value.length >= ingName.length) setIngName(e.target.value.substring(0, e.target.value.length - 1).concat(e.target.value.charAt(e.target.value.length - 1).toUpperCase()))
        else setIngName(e.target.value)        
    }

    const className = 'AddItemForm'
    return (
        <form className={className}>
            <h2 className={`${className}_header`}>Add Ingredient</h2>
            <input type="text" name='ingName' id='ingName' placeholder='Ingredient Name' value={ingName} autoComplete='off' maxLength={25} onChange={handleIngNameChange} className={`${className}_nameInput`} ref={inputRef} />
            <input type="text" name='ingAmount' id='ingAmount' placeholder='Amount' value={ingAmount} autoComplete='off' maxLength={9} onChange={e => setIngAmount(e.target.value)} className={`${className}_amountInput`} />
        </form>
    )
}

export default AddItemForm