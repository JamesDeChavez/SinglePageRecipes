import React from "react"
import './styles.css'

interface Props {
    setSectionVisible: React.Dispatch<React.SetStateAction<string>>
}

const RecipeFooter: React.FC<Props> = ({setSectionVisible}) => {
    const className = 'RecipeFooter'
    return (
        <div className={className}>
            <button className={`${className}_button`} 
                onClick={() => setSectionVisible('INSTRUCTIONS')} >Instructions</button>
            <button className={`${className}_button`}
                onClick={() => setSectionVisible('INGREDIENTS')}>Ingredients</button>
        </div>
    )
}

export default RecipeFooter