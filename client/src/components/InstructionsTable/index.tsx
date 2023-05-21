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
    instructions: Instruction[]
}

const InstructionsTable: React.FC<Props> = ({ setDetailsActive, setSelectedStep, instructions }) => {
    const { windowSize } = useContext(UserLoggedInContext)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [numberStepsDisplayed, setNumberStepsDisplayed] = useState(5)
    const [tableLayout, setTableLayout] = useState('repeat(5, 1fr)')
    const [componentLayout, setComponentLayout] = useState('auto 1fr auto')
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const root = useRef(null)

    useEffect(() => {
        if (!windowSize) return
        const numCols = determineCols(windowSize[0])
        const numberItems = determineNumItems_Inst(windowSize[0], windowSize[1], numCols)
        const itemsPerCol = numberItems / numCols
        const newTableLayout = `repeat(${itemsPerCol}, 1fr)`
        const newComponentLayout = `auto 1fr auto`
        setEnd(numberItems)
        setNumberStepsDisplayed(numberItems)
        setComponentLayout(newComponentLayout)
        setTableLayout(newTableLayout)
    }, [windowSize])

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

    const className = 'InstructionsTable'
    return (
        <div className={className} style={{ gridTemplateRows: componentLayout }} ref={root} >
            <h2 className={`${className}_header`}>INSTRUCTIONS</h2>    
            <div className={`${className}_table`} style={{ gridTemplateRows: tableLayout }}>
                {instructions && instructions.slice(start, end).map((step, i) => {
                    return <InstructionItem setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} step={step} index={i + start} key={i} root={root} start={start} />
                })}
            </div>
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

export default InstructionsTable