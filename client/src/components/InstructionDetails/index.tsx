import React from "react"
import { Instruction } from "../../utils/interfaces"
import './styles.css'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    selectedStep: Instruction | undefined
}

const InstructionDetails: React.FC<Props> = ({ setDetailsActive, selectedStep }) => {

    const className = 'InstructionDetails'
    return (
        <div className={className}>
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
        </div>
    )
}

export default InstructionDetails