import { useContext } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'

const AddItemForm = () => {
    const { ingName, setIngName, ingAmount, setIngAmount  } = useContext(CreateRecipeFormContext)

    const className = 'AddItemForm'
    return (
        <form className={className}>
            <h2 className={`${className}_header`}>Add Ingredient</h2>
            <input type="text" name='ingName' id='ingName' placeholder='Ingredient Name' value={ingName} autoComplete='off' maxLength={25} onChange={e => setIngName(e.target.value)} className={`${className}_nameInput`} />
            <input type="text" name='ingAmount' id='ingAmount' placeholder='Amount' value={ingAmount} autoComplete='off' maxLength={9} onChange={e => setIngAmount(e.target.value)} className={`${className}_amountInput`} />
        </form>
    )
}

export default AddItemForm