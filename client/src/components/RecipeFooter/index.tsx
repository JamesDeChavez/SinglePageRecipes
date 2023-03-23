import classNames from "classnames"
import React from "react"
import './styles.css'

interface Props {
    sectionVisible: string,
    setSectionVisible: React.Dispatch<React.SetStateAction<string>>
}

const RecipeFooter: React.FC<Props> = ({ sectionVisible, setSectionVisible}) => {
    const className = 'RecipeFooter'
    return (
        <div className={className}>
            <button className={classNames(
                `${className}_button`,
                { [`${className}_active`]: sectionVisible === 'INSTRUCTIONS' }
            )} 
                onClick={() => setSectionVisible('INSTRUCTIONS')} >Instructions</button>
            <button className={classNames(
                `${className}_button`,
                { [`${className}_active`]: sectionVisible === 'INGREDIENTS' }
            )}
                onClick={() => setSectionVisible('INGREDIENTS')}>Ingredients</button>
        </div>
    )
}

export default RecipeFooter