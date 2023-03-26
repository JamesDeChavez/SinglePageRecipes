import { useContext, useState } from 'react'
import AddStepForm from '../AddStepForm'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import EditStepForm from '../EditStepForm'
import InstructionDetails from '../InstructionDetails'
import InstructionsTable from '../InstructionsTable'
import './styles.css'

const CreateRecipeInstructions = () => {
    const { instructions, setInstructions, addStepActive, setAddStepActive, editStepActive, setEditStepActive, selectedStep, setSelectedStep } = useContext(CreateRecipeFormContext)
    const [detailsActive, setDetailsActive] = useState(false)

    const handleAddStepClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddStepActive(true)
    }

    const className = 'CreateRecipeInstructions'
    return (
        <div className={className}>
            {addStepActive ?
                <AddStepForm/>
            :
            detailsActive ? 
                editStepActive ?
                    <EditStepForm />
                :
                    <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} instructions={instructions} setInstructions={setInstructions} setEditStepActive={setEditStepActive} />
            :
                <InstructionsTable setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} handleAddStepClick={handleAddStepClick}  />
            }
        </div>
    )
}

export default CreateRecipeInstructions