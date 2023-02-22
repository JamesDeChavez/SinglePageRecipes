import { useState } from "react"
import InstructionDetails from "./InstructionDetails"
import InstructionItem from "./InstructionItem"

const InstructionsSection = () => {
    const [detailsActive, setDetailsActive] = useState(false)
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
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                    <InstructionItem setDetailsActive={setDetailsActive}/>
                </div>
            }
            <div className={`${className}_buttonsContainer`}>
                <div className={`${className}_button`}>Prev</div>
                <div className={`${className}_button`}>Next</div>
            </div>
        </div>
    )
}

export default InstructionsSection