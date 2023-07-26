import { useState, useRef, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { Instruction } from '../../utils/interfaces'
import InstructionItem from '../InstructionItem'
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left-solid.svg'
import { ReactComponent as ArrowRight } from '../../assets/arrow-right-solid.svg'
import { determineCols, determineNumItems_Inst } from '../../utils/functions'
import './styles.css'
import classNames from 'classnames'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedStep: React.Dispatch<React.SetStateAction<Instruction | undefined>>
    instructions: Instruction[],
    currentView: string
}

const InstructionsTable: React.FC<Props> = ({ setDetailsActive, setSelectedStep, instructions, currentView }) => {
    const { windowSize } = useContext(UserLoggedInContext)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [numberStepsDisplayed, setNumberStepsDisplayed] = useState(5)
    const [tableLayout, setTableLayout] = useState('repeat(5, 1fr)')
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const root = useRef(null)

    useEffect(() => {
        if (!windowSize) return
        const numCols = determineCols(windowSize[0], currentView)
        const numberItems = determineNumItems_Inst(windowSize[0], windowSize[1], numCols, currentView)
        const itemsPerCol = numberItems / numCols
        const newTableLayout = `repeat(${itemsPerCol}, 1fr)`
        setStart(0)
        setEnd(numberItems)
        setNumberStepsDisplayed(numberItems)
        setTableLayout(newTableLayout)
    }, [windowSize])

    useEffect(() => {
        if (!windowSize) return
        const numCols = determineCols(windowSize[0], currentView)
        const numberItems = determineNumItems_Inst(windowSize[0], windowSize[1], numCols, currentView)
        const itemsPerCol = numberItems / numCols
        const newTableLayout = `repeat(${itemsPerCol}, 1fr)`
        setStart(0)
        setEnd(numberItems)
        setNumberStepsDisplayed(numberItems)
        setTableLayout(newTableLayout)
    }, [currentView])

    useEffect(() => {
        buttonRef.current && buttonRef.current.focus()
    }, [buttonRef])
    
    const handleNextClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        if (end >= instructions.length) return
        e.preventDefault()
        const endCheck = end + numberStepsDisplayed >= instructions.length
        const newStart = start + numberStepsDisplayed
        const newEnd = endCheck ? instructions.length : end + numberStepsDisplayed
        console.log(start, end, numberStepsDisplayed, endCheck, newStart, newEnd)
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
        <div className={className} ref={root} >
            <h2 className={`${className}_header`}>INSTRUCTIONS</h2>    
            <div className={classNames(
                `${className}_table`,
                {[`${className}_table_hideView`]: currentView === 'HIDE'},
                {[`${className}_table_largeView`]: currentView === 'LARGE'},
            )} style={{ gridTemplateRows: tableLayout }}>
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