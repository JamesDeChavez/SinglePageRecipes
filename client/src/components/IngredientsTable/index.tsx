import { useState } from 'react'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import './styles.css'

interface Props {
    ingredients: Ingredient[],
    handleAddIngredient: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const IngredientsTable: React.FC<Props> = ({ ingredients, handleAddIngredient }) => {
    
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [numberItemsDisplayed, setNumberItemsDisplayed] = useState(6)
    

    const handleNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (end >= ingredients.length) return

        const endCheck = end + numberItemsDisplayed >= ingredients.length
        const newStart = start + numberItemsDisplayed
        const newEnd = endCheck ? ingredients.length : end + numberItemsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (start === 0) return

        const begCheck = start - numberItemsDisplayed < 0
        const newStart = begCheck ? 0 : start - numberItemsDisplayed
        const newEnd = newStart + numberItemsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const className = 'IngredientsTable'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>Ingredients:</h2>
            <div className={`${className}_table`}>
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <IngredientItem item={item} key={i} />
                })}
            </div>

            <button className={`${className}_button ${className}_addButton`} onClick={handleAddIngredient}>Add Ingredient</button>

            <div className={`${className}_pageButtonsContainer`}>
                    <button className={`${className}_button`} onClick={handlePrevClick}>Prev</button>
                    <button className={`${className}_button`} onClick={handleNextClick}>Next</button>
                    <p className={`${className}_resultsText`}>{`Items ${!ingredients.length ? 0 : start + 1} - ${Math.min(ingredients.length, end)} (Total Items ${ingredients.length})`}</p>
            </div>
        </div>
    )
}

export default IngredientsTable