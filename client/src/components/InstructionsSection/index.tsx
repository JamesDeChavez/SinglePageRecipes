import { useState } from "react"
import { Instruction } from "../../utils/interfaces"
import InstructionDetails from "../InstructionDetails"
import InstructionsTable from "../InstructionsTable"
import './styles.css'

interface Props {
    instructions: Instruction[]
}

const InstructionsSection: React.FC<Props> = ({ instructions }) => {
    const [detailsActive, setDetailsActive] = useState(false)
    const [selectedStep, setSelectedStep] = useState<Instruction>()

    const className = 'InstructionsSection'
    return (
        <div className={className}>
            
            {detailsActive ?
                <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} instructions={instructions} />
            :
                <InstructionsTable setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} />
            }
        </div>
    )
}

export default InstructionsSection