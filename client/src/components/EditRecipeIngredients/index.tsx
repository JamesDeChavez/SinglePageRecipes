import { useContext } from 'react'
import AddItemForm from '../AddItemForm'
import EditItemForm from '../EditItemForm'
import { EditRecipeFormContext } from '../EditRecipeForm'
import IngredientsTable from '../IngredientsTable'
import './styles.css'

const EditRecipeIngredients = () => {
    const { ingredients, addIngredientActive, setAddIngredientActive, editIngredientActive, setEditIngredientActive, ingName, setIngName, ingAmount, setIngAmount, setSelectedItem } = useContext(EditRecipeFormContext)

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddIngredientActive(true)
    }

    const className = 'EditRecipeIngredients'
    return (
        <div className={className} >

            { addIngredientActive ?
                <AddItemForm ingName={ingName} setIngName={setIngName} ingAmount={ingAmount} setIngAmount={setIngAmount} />
            : editIngredientActive ?
                <EditItemForm ingName={ingName} setIngName={setIngName} ingAmount={ingAmount} setIngAmount={setIngAmount} />
            :
                <IngredientsTable ingredients={ingredients} handleAddIngredient={handleAddIngredient} setEditIngredientActive={setEditIngredientActive} setIngName={setIngName} setIngAmount={setIngAmount} setSelectedItem={setSelectedItem} />
            }            

        </div>
    )
}

export default EditRecipeIngredients