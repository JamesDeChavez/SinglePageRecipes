import { useContext, useState } from 'react'
import AddItemForm from '../AddItemForm'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import IngredientsTable from '../IngredientsTable'
import './styles.css'

const CreateRecipeIngredients = () => {
    const { ingredients, setIngredients, addIngredientActive, setAddIngredientActive } = useContext(CreateRecipeFormContext)

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddIngredientActive(true)
    }

    const className = 'CreateRecipeIngredients'
    return (
        <div className={className}>

            {addIngredientActive ?
                <AddItemForm />
            :
                <IngredientsTable ingredients={ingredients} handleAddIngredient={handleAddIngredient} />
            }            

        </div>
    )
}

export default CreateRecipeIngredients