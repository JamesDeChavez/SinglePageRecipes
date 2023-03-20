import React from "react"
import { Instruction } from "../../utils/interfaces"
import './styles.css'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    selectedStep: Instruction | undefined,
    instructions: Instruction[]
    setInstructions?: React.Dispatch<React.SetStateAction<Instruction[]>>
}

const InstructionDetails: React.FC<Props> = ({ setDetailsActive, selectedStep, instructions, setInstructions }) => {
    
    const handleReturnToTableClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(false)
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!setInstructions) return
        const index = instructions.findIndex(step => step.description === selectedStep?.description)
        const newInstructions = [...instructions.slice(0, index), ...instructions.slice(index + 1)]
        setInstructions(newInstructions)
        setDetailsActive(false)
    }

    const className = 'InstructionDetails'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>{`Step ${instructions.findIndex(step => step.description === selectedStep?.description) + 1} Details`}</h2>
            {selectedStep ?
            <>
                <div className={`${className}_topRow`}>
                    
                    <div className={`${className}_summaryContainer`}>
                        <p>[ ]</p>
                        <p className={`${className}_summary`}>
                            {`${selectedStep.summary.action}: ${selectedStep.summary.items.map(item => item).join(', ')}`}
                        </p>
                    </div>
                    <div className={`${className}_timeContainer`}>
                        <p>[ ]</p>
                        <p className={`${className}_time`}>{`${selectedStep.time}`}</p>
                    </div>
                </div>
                <div className={`${className}_descriptionContainer`}>
                    <p>[  ]</p>
                    <p className={`${className}_description`}>{selectedStep.description}</p>
                </div>
                <div className={`${className}_ingredientsContainer`}>
                    <p>[  ]</p>
                    <div className={`${className}_itemsContainer`}>
                        {selectedStep.ingredients.map(item => 
                            <p className={`${className}_item`}>
                                {`${item.name} - ${item.amount}`}
                            </p>
                        )}
                    </div>
                </div>
            </>
            :
                <></>
            }
            <div className={`${className}_pageButtonsContainer`}>
                <button className={`${className}_pageButton`} onClick={handleReturnToTableClick}>
                    {`< `}<span style={{textDecoration: 'underline'}}>Return to table</span>
                </button>
                <button className={`${className}_deleteButton`} onClick={handleDeleteClick} style={{ display: setInstructions ? 'block' : 'none'}}>X Delete Step</button>
            </div>
        </div>
    )
}

export default InstructionDetails