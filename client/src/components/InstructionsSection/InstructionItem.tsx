import React from 'react'

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const InstructionItem: React.FC<Props> = ({setDetailsActive}) => {

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(prevState => !prevState)
    }

    const className = 'InstructionItem'
    return (
        <div className={className} onClick={handleClick} >
            <span>1.</span>
            <span>PREPARE</span>
            <span>Chicken, Eggs, Flour</span>
            <span>3 min</span>
        </div>
    )
}

export default InstructionItem