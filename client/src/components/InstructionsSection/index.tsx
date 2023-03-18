import { useEffect, useState } from "react"
import cache from "../../utils/cache"
import { Instruction } from "../../utils/interfaces"
import InstructionDetails from "../InstructionDetails"
import InstructionItem from "../InstructionItem"
import './styles.css'

const InstructionsSection = () => {
    const [detailsActive, setDetailsActive] = useState(false)
    const [instructions, setInstructions] = useState<Instruction[]>([])
    const [selectedStep, setSelectedStep] = useState<Instruction>()
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [numberStepsDisplayed, setNumberStepsDisplayed] = useState(5)

    useEffect(() => {
        setInstructions(cache.User.recipes[0].instructions)
    }, [])

    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(false)
    }

    const handleNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (end >= instructions.length - 1) return

        const endCheck = end + numberStepsDisplayed >= instructions.length
        const newStart = start + numberStepsDisplayed
        const newEnd = endCheck ? instructions.length : end + numberStepsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (start === 0) return

        const begCheck = start - numberStepsDisplayed < 0
        const newStart = begCheck ? 0 : start - numberStepsDisplayed
        const newEnd = newStart + numberStepsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const className = 'InstructionsSection'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>Instructions (Click step for more details)</h2>
            {detailsActive ?
                <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} />
            :
                <div className={`${className}_table`}>
                    {instructions && instructions.slice(start, end).map((step, i) => {
                        return <InstructionItem setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} step={step} index={i + start} key={i} />
                    })}
                </div>
            }
            <div className={`${className}_buttonsContainer`}>
                {!detailsActive ?
                <>
                    <button className={`${className}_button`} onClick={handlePrevClick} >Prev</button>
                    <button className={`${className}_button`} onClick={handleNextClick}>Next</button>
                    <p className={`${className}_resultsTest`}>{`Steps ${start + 1} - ${end} (Total Steps ${instructions.length})`}</p>
                </>
                :
                    <button className={`${className}_button`} onClick={handleReturnClick}>Return to Table</button>
                }
            </div>
        </div>
    )
}

export default InstructionsSection