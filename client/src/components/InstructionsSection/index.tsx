import { useState } from "react"
import InstructionDetails from "./InstructionDetails"
import InstructionItem from "./InstructionItem"
import './styles.css'

const InstructionsSection = () => {
    const [detailsActive, setDetailsActive] = useState(false)

    const handleReturnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(false)
    }

    const className = 'InstructionsSection'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>Instructions (Click step for more details)</h2>
            {detailsActive ?
                <InstructionDetails setDetailsActive={setDetailsActive}/>
            :
                <div className={`${className}_table`}>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                </div>
            }
            <div className={`${className}_buttonsContainer`}>
                {!detailsActive ?
                <>
                    <div className={`${className}_button`}>Prev</div>
                    <div className={`${className}_button`}>Next</div>
                </>
                :
                    <div className={`${className}_button`} onClick={handleReturnClick}>Return to Table</div>
                }
            </div>
        </div>
    )
}

export default InstructionsSection