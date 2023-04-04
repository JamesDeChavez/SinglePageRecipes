import { useState, useRef, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import './styles.css'

interface Props {
    ingredients: Ingredient[],
    handleAddIngredient?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    setEditIngredientActive: React.Dispatch<React.SetStateAction<boolean>>,
    setIngName: React.Dispatch<React.SetStateAction<string>>,
    setIngAmount: React.Dispatch<React.SetStateAction<string>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<Ingredient | undefined>>
}

const IngredientsTable: React.FC<Props> = ({ ingredients, handleAddIngredient, setEditIngredientActive, setIngName, setIngAmount, setSelectedItem }) => { 
    const { windowSize } = useContext(UserLoggedInContext) 
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [numberItemsDisplayed, setNumberItemsDisplayed] = useState(6)
    const [gridTemplateRows, setGridTemplateRows] = useState(`repeat(6, 1fr)`)
    const [gridTemplateRowsTwo, setGridTemplateRowsTwo] = useState(`auto 6fr 1fr auto`)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const root = useRef(null)

    useEffect(() => {
        if (!windowSize) return
        const numberRows = windowSize[0] < 850 ? Math.floor((windowSize[1] - (windowSize[0] / 1.8) - 135) / 50) : Math.floor((((windowSize[1] - 30) / 2) - 25) / 50)
        
        if (windowSize[0] < 850) {
            setEnd(numberRows - 1)
            setNumberItemsDisplayed(numberRows - 1)
            setGridTemplateRows(`repeat(${numberRows - 1}, 1fr)`)
            setGridTemplateRowsTwo(`auto ${numberRows - 1}fr 1fr auto`)
        }
        else if (windowSize[0] < 1250) {
            setEnd(numberRows)
            setNumberItemsDisplayed(numberRows)
            setGridTemplateRows(`repeat(${numberRows}, 1fr)`)
            setGridTemplateRowsTwo(`auto 1fr auto`)
        } 
        else {
            setEnd(numberRows*2)
            setNumberItemsDisplayed(numberRows*2)
            setGridTemplateRows(`repeat(${numberRows}, 1fr)`)
            setGridTemplateRowsTwo(`auto 1fr auto`)
        }
    }, [windowSize])
    
    useEffect(() => {
        buttonRef.current && buttonRef.current.focus()
    }, [buttonRef])

    const handleNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

    const handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Ingredient) => {
        e.preventDefault()
        setIngName(item.name)
        setIngAmount(item.amount)
        setSelectedItem(item)
        setEditIngredientActive(true)
    }

    const className = 'IngredientsTable'
    return (
        <div className={className} style={{ gridTemplateRows: gridTemplateRowsTwo}} >
            <h2 className={`${className}_header`}>Ingredients:</h2>
            <div className={`${className}_table`} style={{ gridTemplateRows: gridTemplateRows }} ref={root} >
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <div className={`${className}_itemContainer`} onClick={e => handleEditClick(e, item)}><IngredientItem item={item} key={i} root={root} start={start} /></div>
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