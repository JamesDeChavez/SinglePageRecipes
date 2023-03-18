import React from 'react'
import { Instruction } from '../../utils/interfaces'
import './styles.css'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedStep: React.Dispatch<React.SetStateAction<Instruction | undefined>>,
    step: Instruction,
    index: number
}

const InstructionItem: React.FC<Props> = ({ setDetailsActive, setSelectedStep, step, index }) => {

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setSelectedStep(step)
        setDetailsActive(prevState => !prevState)
    }

    const className = 'InstructionItem'
    return (
        <div className={className} onClick={handleClick} >
            <p className={`${className}_number`}>{`${index + 1}.`}</p>
            <p className={`${className}_action`}>{step.summary.action}</p>
            <p className={`${className}_items`}>
                {step.summary.items.map((item, i) => {
                    if (i !== step.summary.items.length - 1) {
                        return `${item}, `
                    } else {
                        return `${item} `
                    }
                })}
            </p>
            <p className={`${className}_time`}>{step.time}</p>
        </div>
    )
}

export default InstructionItem