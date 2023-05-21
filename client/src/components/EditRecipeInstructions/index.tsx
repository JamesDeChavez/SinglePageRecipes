import { useContext, useState } from 'react'
import AddStepForm from '../AddStepForm'
import { EditRecipeFormContext } from '../EditRecipeForm'
import EditStepForm from '../EditStepForm'
import InstructionDetails from '../InstructionDetails'
import EditInstructionsTable from '../EditInstructionsTable'
import './styles.css'

const EditRecipeInstructions = () => {
    const { 
        instructions, setInstructions, 
        addStepActive, setAddStepActive, 
        editStepActive, setEditStepActive, 
        selectedStep, setSelectedStep, 
        action, setAction,
        items, setItems,
        time, setTime,
        description, setDescription,
        ingredientName, setIngredientName,
        ingredientAmount, setIngredientAmount,
        recipeIngredients, setRecipeIngredients 
    } = useContext(EditRecipeFormContext)
    const [detailsActive, setDetailsActive] = useState(false)

    const handleEditStepClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddStepActive(true)
    }

    const className = 'EditRecipeInstructions'
    return (
        <div className={className}>
            {addStepActive ?
                <AddStepForm
                    action={action} setAction={setAction}
                    items={items} setItems={setItems}
                    time={time} setTime={setTime}
                    description={description} setDescription={setDescription}
                    ingredientName={ingredientName} setIngredientName={setIngredientName}
                    ingredientAmount={ingredientAmount} setIngredientAmount={setIngredientAmount}
                    recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients}
                />
            :
            detailsActive ? 
                editStepActive ?
                    <EditStepForm 
                        action={action} setAction={setAction}
                        items={items} setItems={setItems}
                        time={time} setTime={setTime}
                        description={description} setDescription={setDescription}
                        ingredientName={ingredientName} setIngredientName={setIngredientName}
                        ingredientAmount={ingredientAmount} setIngredientAmount={setIngredientAmount}
                        recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients}
                    />
                :
                    <InstructionDetails 
                        instructions={instructions} setInstructions={setInstructions} setEditStepActive={setEditStepActive} setRecipeIngredients={setRecipeIngredients} 
                        setAction={setAction} setItems={setItems}
                        setTime={setTime} setDescription={setDescription} 
                        setDetailsActive={setDetailsActive} selectedStep={selectedStep} 
                    />
            :
                <EditInstructionsTable setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} handleEditStepClick={handleEditStepClick}  />
            }
        </div>
    )
}

export default EditRecipeInstructions