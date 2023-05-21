import { useContext } from 'react'
import AddItemForm from '../AddItemForm'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import EditItemForm from '../EditItemForm'
import CreateIngredientsTable from '../CreateIngredientsTable'
import './styles.css'

const CreateRecipeIngredients = () => {
    const { ingredients, addIngredientActive, setAddIngredientActive, editIngredientActive, setEditIngredientActive, ingName, setIngName, ingAmount, setIngAmount, setSelectedItem } = useContext(CreateRecipeFormContext)

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddIngredientActive(true)
    }

    const className = 'CreateRecipeIngredients'
    return (
        <div className={className} >

            { addIngredientActive ?
                <AddItemForm 
                    ingName={ingName} setIngName={setIngName} 
                    ingAmount={ingAmount} setIngAmount={setIngAmount}  
                />
            : editIngredientActive ?
                <EditItemForm 
                    ingName={ingName} setIngName={setIngName} 
                    ingAmount={ingAmount} setIngAmount={setIngAmount} 
                />
            :
                <CreateIngredientsTable 
                    ingredients={ingredients} handleAddIngredient={handleAddIngredient} 
                    setEditIngredientActive={setEditIngredientActive} setIngName={setIngName} 
                    setIngAmount={setIngAmount} setSelectedItem={setSelectedItem} 
                />
            }            

        </div>
    )
}

export default CreateRecipeIngredients