import React from "react"

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const InstructionDetails: React.FC<Props> = ({setDetailsActive}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(prevState => !prevState)
    }

    const className = 'InstructionDetails'
    return (
        <div className={className}>
            <button onClick={handleClick}>{`< Back`}</button>
            <div className={`${className}_topRow`}>
                <span>Prepare: Onion</span>
                <span>3 min</span>
            </div>
            <div className={`${className}_descriptionContainer`}>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</span>
            </div>
            <div className={`${className}_ingredientsContainer`}>
                <span>Onion</span>
                <span>Oil</span>
                <span>Salt</span>
                <span>Pepper</span>
            </div>
        </div>
    )
}

export default InstructionDetails