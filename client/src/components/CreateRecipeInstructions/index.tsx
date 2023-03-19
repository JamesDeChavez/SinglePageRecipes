import { useContext, useState } from 'react'
import { Instruction } from '../../utils/interfaces'
import AddStepForm from '../AddStepForm'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import InstructionDetails from '../InstructionDetails'
import InstructionsTable from '../InstructionsTable'
import './styles.css'

const CreateRecipeInstructions = () => {
    const { instructions, addStepActive, setAddStepActive } = useContext(CreateRecipeFormContext)
    const [detailsActive, setDetailsActive] = useState(false)
    const [selectedStep, setSelectedStep] = useState<Instruction>()

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
                    <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} instructions={instructions} />
                :
                    <InstructionsTable detailsActive={detailsActive} setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} handleAddStepClick={handleAddStepClick}  />
            }
        </div>
    )
}

export default CreateRecipeInstructions