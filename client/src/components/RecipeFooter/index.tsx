import React from "react"
import './styles.css'

interface Props {
    sectionVisible: React.Dispatch<React.SetStateAction<string>>
}

const RecipeFooter: React.FC<Props> = ({sectionVisible}) => {
    const className = 'RecipeFooter'
    return (
        <div className={className}>
            <div className={`${className}_button`} 
                onClick={() => sectionVisible('INSTRUCTIONS')} >Instructions</div>
            <div className={`${className}_button`}
                onClick={() => sectionVisible('INGREDIENTS')}>Ingredients</div>
        </div>
    )
}

export default RecipeFooter