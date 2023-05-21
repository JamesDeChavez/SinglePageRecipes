import { useContext, useState } from 'react'
import AddStepForm from '../AddStepForm'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import EditStepForm from '../EditStepForm'
import InstructionDetails from '../InstructionDetails'
import CreateInstructionsTable from '../CreateInstructionsTable'
import './styles.css'

const CreateRecipeInstructions = () => {
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
    } = useContext(CreateRecipeFormContext)
    const [detailsActive, setDetailsActive] = useState(false)

    const handleAddStepClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddStepActive(true)
    }

    const className = 'CreateRecipeInstructions'
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
                <CreateInstructionsTable setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} handleAddStepClick={handleAddStepClick}  />
            }
        </div>
    )
}

export default CreateRecipeInstructions