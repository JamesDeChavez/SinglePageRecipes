import { useState, useRef, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left-solid.svg'
import { ReactComponent as ArrowRight } from '../../assets/arrow-right-solid.svg'
import { determineCols, determineNumItems_Ing } from '../../utils/functions'
import './styles.css'

interface Props {
    ingredients: Ingredient[],
    handleAddIngredient: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    setEditIngredientActive: React.Dispatch<React.SetStateAction<boolean>>,
    setIngName: React.Dispatch<React.SetStateAction<string>>,
    setIngAmount: React.Dispatch<React.SetStateAction<string>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<Ingredient | undefined>>
}

const CreateIngredientsTable: React.FC<Props> = ({ ingredients, handleAddIngredient, setEditIngredientActive, setIngName, setIngAmount, setSelectedItem }) => { 
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
        const numCols = determineCols(windowSize[0])
        const numItems = determineNumItems_Ing(windowSize[0], windowSize[1], numCols)
        const pageLayout = `repeat(${numItems}, 1fr)`
        const tableLayout = windowSize[0] < 850 
            ? `auto ${numItems}fr 1fr auto`
            : `auto 1fr auto`
        setEnd(numItems)
        setNumberItemsDisplayed(numItems)
        setGridTemplateRows(pageLayout)
        setGridTemplateRowsTwo(tableLayout)
    }, [windowSize])
    
    useEffect(() => {
        buttonRef.current && buttonRef.current.focus()
    }, [buttonRef])

    const handleNextClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        if (end >= ingredients.length) return
        const endCheck = end + numberItemsDisplayed >= ingredients.length
        const newStart = start + numberItemsDisplayed
        const newEnd = endCheck ? ingredients.length : end + numberItemsDisplayed
        setEnd(newEnd)
        setStart(newStart)
    }

    const handlePrevClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
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

    const className = 'CreateIngredientsTable'
    return (
        <div className={className} style={{ gridTemplateRows: gridTemplateRowsTwo}} >
            <h2 className={`${className}_header`}>Ingredients:</h2>
            
            <div className={`${className}_table`} style={{ gridTemplateRows: gridTemplateRows }} ref={root} >
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <div className={`${className}_itemContainer`} onClick={e => handleEditClick(e, item)}>
                        <IngredientItem item={item} key={i} root={root} start={start} />
                    </div>
                })}
            </div>

            <button className={`${className}_addButton`} onClick={handleAddIngredient} ref={buttonRef}>Add Ingredient</button>

            <div className={`${className}_pageButtonsContainer`}>
                <ArrowLeft className={`${className}_pageButton`} onClick={handlePrevClick} />
                <ArrowRight className={`${className}_pageButton`} onClick={handleNextClick} />
                <p className={`${className}_resultsText`}>{`Items ${!ingredients.length ? 0 : start + 1} - ${Math.min(ingredients.length, end)} (Total Items ${ingredients.length})`}</p>
            </div>
        </div>
    )
}

export default CreateIngredientsTable