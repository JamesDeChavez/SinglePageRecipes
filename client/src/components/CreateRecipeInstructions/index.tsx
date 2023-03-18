import { useState } from 'react'
import InstructionDetails from '../InstructionDetails'
import InstructionItem from '../InstructionItem'
import './styles.css'

const CreateRecipeInstructions = () => {
    const [detailsActive, setDetailsActive] = useState(false)

    const handleReturnToTableClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(false)
    }

    const className = 'CreateRecipeInstructions'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>Instructions (Click step for more details)</h2>

            {detailsActive ?
                <></>
            :    
                <div className={`${className}_instructionsTable`}>
                </div>
            }

            <button className={`${className}_addStepButton`}>Add Step</button>
            <div className={`${className}_pageButtonsContainer`}>
                {detailsActive ?
                    <button className={`${className}_pageButton`} onClick={handleReturnToTableClick}>Return to table</button>
                :
                <>    
                    <button className={`${className}_pageButton`}>Prev</button>
                    <button className={`${className}_pageButton`}>Next</button>
                </>
                }
            </div>
        </div>
    )
}

export default CreateRecipeInstructions