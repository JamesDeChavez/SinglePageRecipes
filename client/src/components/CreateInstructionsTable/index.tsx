import { useState, useRef, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { Instruction } from '../../utils/interfaces'
import InstructionItem from '../InstructionItem'
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left-solid.svg'
import { ReactComponent as ArrowRight } from '../../assets/arrow-right-solid.svg'
import { determineCols, determineNumItems_Inst } from '../../utils/functions'
import './styles.css'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedStep: React.Dispatch<React.SetStateAction<Instruction | undefined>>
    instructions: Instruction[],
    handleAddStepClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CreateInstructionsTable: React.FC<Props> = ({ setDetailsActive, setSelectedStep, instructions, handleAddStepClick }) => {
    const { windowSize } = useContext(UserLoggedInContext)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
    const [numberStepsDisplayed, setNumberStepsDisplayed] = useState(4)
    const [tableLayout, setTableLayout] = useState('repeat(4, 1fr)')
    const [componentLayout, setComponentLayout] = useState('auto 5fr 1fr auto')
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const root = useRef(null)

    useEffect(() => {
        if (!windowSize) return
        const numCols = determineCols(windowSize[0])
        const numberItems = determineNumItems_Inst(windowSize[0], windowSize[1], numCols)
        const itemsPerCol = windowSize[0] < 850 ? numberItems / numCols - 1 : numberItems / numCols 
        const newTableLayout = `repeat(${itemsPerCol}, 1fr)`
        const newComponentLayout = windowSize[0] < 850
            ? `auto ${itemsPerCol - 1}fr 1fr auto`
            : `auto 1fr auto`
        setEnd(numberItems)
        setNumberStepsDisplayed(numberItems)
        setTableLayout(newTableLayout)
        setComponentLayout(newComponentLayout)
    }, [windowSize, handleAddStepClick])

    useEffect(() => {
        buttonRef.current && buttonRef.current.focus()
    }, [buttonRef])
    
    const handleNextClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        if (end >= instructions.length) return
        e.preventDefault()
        const endCheck = end + numberStepsDisplayed >= instructions.length
        const newStart = start + numberStepsDisplayed
        const newEnd = endCheck ? instructions.length : end + numberStepsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const handlePrevClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        if (start === 0) return
        e.preventDefault()
        const begCheck = start - numberStepsDisplayed < 0
        const newStart = begCheck ? 0 : start - numberStepsDisplayed
        const newEnd = newStart + numberStepsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const className = 'CreateInstructionsTable'
    return (
        <div className={className} style={{ gridTemplateRows: componentLayout }} ref={root} >
            <h2 className={`${className}_header`}>INSTRUCTIONS</h2>    
            <div className={`${className}_table`} style={{ gridTemplateRows: tableLayout }}>
                {instructions && instructions.slice(start, end).map((step, i) => {
                    return <InstructionItem setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} step={step} index={i + start} key={i} root={root} start={start} />
                })}
            </div>        
            <button className={`${className}_addStepButton`} onClick={handleAddStepClick} ref={buttonRef} >Add Step</button>
            <div className={`${className}_pageButtonsContainer`}>
                <ArrowLeft className={`${className}_pageButton`} onClick={handlePrevClick} />
                <ArrowRight className={`${className}_pageButton`} onClick={handleNextClick} />
                <p className={`${className}_resultsText`}>
                    {`Steps ${!instructions.length ? 0 : start + 1} - ${Math.min(instructions.length, end)} (Total Steps ${instructions.length})`}
                </p>
            </div>
        </div>
    )
}

export default CreateInstructionsTable