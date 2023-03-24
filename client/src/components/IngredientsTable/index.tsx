import { useState, useRef, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import './styles.css'

interface Props {
    ingredients: Ingredient[],
    handleAddIngredient?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const IngredientsTable: React.FC<Props> = ({ ingredients, handleAddIngredient }) => { 
    const { windowSize } = useContext(UserLoggedInContext)   
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [numberItemsDisplayed, setNumberItemsDisplayed] = useState(6)
    const [gridTemplateRows, setGridTemplateRows] = useState(`repeat(6, 1fr)`)
    const [gridTemplateRowsTwo, setGridTemplateRowsTwo] = useState(`auto 6fr 1fr auto`)
    const root = useRef(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (!windowSize) return
        const numberRows = windowSize[0] < 850 ? Math.floor((windowSize[1] - (windowSize[0] / 1.8) - 135) / 50) : Math.floor((((windowSize[1] - 30) / 2) - 25) / 50)
        setEnd(numberRows)
        setNumberItemsDisplayed(numberRows)
        setGridTemplateRows(`repeat(${numberRows}, 1fr)`)
        setGridTemplateRowsTwo(`auto ${numberRows}fr 1fr auto`)
    }, [windowSize])
    
    useEffect(() => {
        buttonRef.current && buttonRef.current.focus()
    }, [buttonRef])

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
        <div className={className} style={{ gridTemplateRows: gridTemplateRowsTwo}} >
            <h2 className={`${className}_header`}>Ingredients:</h2>
            <div className={`${className}_table`} style={{ gridTemplateRows: gridTemplateRows }} ref={root} >
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <IngredientItem item={item} key={i} root={root} start={start} />
                })}
            </div>

            <button className={`${className}_button ${className}_addButton`} onClick={handleAddIngredient} style={{ display: handleAddIngredient ? 'block' : 'none' }} ref={buttonRef}>Add Ingredient</button>

            <div className={`${className}_pageButtonsContainer`}>
                    <button className={`${className}_button`} onClick={handlePrevClick}>Prev</button>
                    <button className={`${className}_button`} onClick={handleNextClick}>Next</button>
                    <p className={`${className}_resultsText`}>{`Items ${!ingredients.length ? 0 : start + 1} - ${Math.min(ingredients.length, end)} (Total Items ${ingredients.length})`}</p>
            </div>
        </div>
    )
}

export default IngredientsTable