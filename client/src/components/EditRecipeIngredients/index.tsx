import { useContext } from 'react'
import EditItemForm from '../EditItemForm'
import { EditRecipeFormContext } from '../EditRecipeForm'
import EditIngredientsTable from '../EditIngredientsTable'
import './styles.css'

const EditRecipeIngredients = () => {
    const { 
        ingredients, 
        setSelectedItem, 
        editIngredientActive, setEditIngredientActive, 
        ingName, setIngName, 
        ingAmount, setIngAmount
    } = useContext(EditRecipeFormContext)

    const handleEditIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setEditIngredientActive(true)
    }

    const className = 'EditRecipeIngredients'
    return (
        <div className={className} >
            { editIngredientActive ?
                <EditItemForm ingName={ingName} setIngName={setIngName} ingAmount={ingAmount} setIngAmount={setIngAmount} />
            :
                <EditIngredientsTable ingredients={ingredients} handleEditIngredient={handleEditIngredient} setEditIngredientActive={setEditIngredientActive} setIngName={setIngName} setIngAmount={setIngAmount} setSelectedItem={setSelectedItem} />
            }
        </div>
    )
}

export default EditRecipeIngredients