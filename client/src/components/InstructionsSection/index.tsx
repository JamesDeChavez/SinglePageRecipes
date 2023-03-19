import { useEffect, useState } from "react"
import cache from "../../utils/cache"
import { Instruction } from "../../utils/interfaces"
import InstructionDetails from "../InstructionDetails"
import InstructionsTable from "../InstructionsTable"
import './styles.css'

const InstructionsSection = () => {
    const [detailsActive, setDetailsActive] = useState(false)
    const [instructions, setInstructions] = useState<Instruction[]>([])
    const [selectedStep, setSelectedStep] = useState<Instruction>()

    useEffect(() => {
        setInstructions(cache.User.recipes[0].instructions)
    }, [])

    const className = 'InstructionsSection'
    return (
        <div className={className}>
            
            {detailsActive ?
                <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} instructions={instructions} />
            :
                <InstructionsTable detailsActive={detailsActive} setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} />
            }
        </div>
    )
}

export default InstructionsSection