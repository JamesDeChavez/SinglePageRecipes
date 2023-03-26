import { useState } from "react"
import { Instruction } from "../../utils/interfaces"
import EditStepForm from "../EditStepForm"
import InstructionDetails from "../InstructionDetails"
import InstructionsTable from "../InstructionsTable"
import './styles.css'

interface Props {
    instructions: Instruction[]
}

const InstructionsSection: React.FC<Props> = ({ instructions }) => {
    const [detailsActive, setDetailsActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [selectedStep, setSelectedStep] = useState<Instruction>()

    const className = 'InstructionsSection'
    return (
        <div className={className}>
            
            {!detailsActive ?
                <InstructionsTable setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} />
            :
                !editActive ?
                        <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} instructions={instructions} />
                    :
                        <EditStepForm />
            }
        </div>
    )
}

export default InstructionsSection