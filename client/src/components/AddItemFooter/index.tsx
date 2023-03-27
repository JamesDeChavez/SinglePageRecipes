import { Ingredient } from '../../utils/interfaces'
import './styles.css'

interface Props {
    ingName: string, setIngName: React.Dispatch<React.SetStateAction<string>>, 
    ingAmount: string, setIngAmount: React.Dispatch<React.SetStateAction<string>>
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>, setAddIngredientActive: React.Dispatch<React.SetStateAction<boolean>>
}

const AddItemFooter: React.FC<Props> = ({ 
    ingName, setIngName, 
    ingAmount, setIngAmount,
    setIngredients, setAddIngredientActive 
}) => {

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