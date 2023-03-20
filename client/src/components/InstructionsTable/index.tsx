import { useState, useEffect } from 'react'
import { Instruction } from '../../utils/interfaces'
import InstructionItem from '../InstructionItem'
import './styles.css'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedStep: React.Dispatch<React.SetStateAction<Instruction | undefined>>
    instructions: Instruction[],
    handleAddStepClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const InstructionsTable: React.FC<Props> = ({ setDetailsActive, setSelectedStep, instructions, handleAddStepClick }) => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(handleAddStepClick ? 4 : 5)
    const [numberStepsDisplayed, setNumberStepsDisplayed] = useState(handleAddStepClick ? 4 : 5)
    
    const handleNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (end >= instructions.length) return
        e.preventDefault()
        const endCheck = end + numberStepsDisplayed >= instructions.length
        const newStart = start + numberStepsDisplayed
        const newEnd = endCheck ? instructions.length : end + numberStepsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (start === 0) return
        e.preventDefault()
        const begCheck = start - numberStepsDisplayed < 0
        const newStart = begCheck ? 0 : start - numberStepsDisplayed
        const newEnd = newStart + numberStepsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const className = 'InstructionsTable'
    return (
        <div className={className} style={{ gridTemplateRows: handleAddStepClick ? 'auto 5fr 1fr auto' : 'auto 1fr auto' }}>
            <h2 className={`${className}_header`}>Instructions (Click step for more details)</h2>    
            <div className={`${className}_table`} style={{ gridTemplateRows: handleAddStepClick ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)' }}>
                {instructions && instructions.slice(start, end).map((step, i) => {
                    return <InstructionItem setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} step={step} index={i + start} key={i} />
                })}
            </div>
        
            <button className={`${className}_addStepButton`} onClick={handleAddStepClick}style={{ display: handleAddStepClick ? 'block' : 'none' }}>Add Step</button>

            <div className={`${className}_pageButtonsContainer`}> 
                <button className={`${className}_pageButton`} onClick={handlePrevClick}>Prev</button>
                <button className={`${className}_pageButton`} onClick={handleNextClick}>Next</button>
                <p className={`${className}_resultsText`}>
                    {`Steps ${!instructions.length ? 0 : start + 1} - ${Math.min(instructions.length, end)} (Total Steps ${instructions.length})`}
                </p>
            </div>
        </div>
    )
}

export default InstructionsTable