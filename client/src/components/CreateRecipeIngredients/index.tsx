import { useContext } from 'react'
import AddItemForm from '../AddItemForm'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import EditItemForm from '../EditItemForm'
import IngredientsTable from '../IngredientsTable'
import './styles.css'

const CreateRecipeIngredients = () => {
    const { ingredients, addIngredientActive, setAddIngredientActive, editIngredientActive, setEditIngredientActive } = useContext(CreateRecipeFormContext)

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddIngredientActive(true)
    }

    const className = 'CreateRecipeIngredients'
    return (
        <div className={className} >

            { addIngredientActive ?
                <AddItemForm />
            : editIngredientActive ?
                <EditItemForm />
            :
                <IngredientsTable ingredients={ingredients} handleAddIngredient={handleAddIngredient} setEditIngredientActive={setEditIngredientActive} />
            }            

        </div>
    )
}

export default CreateRecipeIngredients