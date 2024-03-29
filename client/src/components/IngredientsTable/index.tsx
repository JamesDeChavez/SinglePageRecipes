import { useState, useRef, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left-solid.svg'
import { ReactComponent as ArrowRight } from '../../assets/arrow-right-solid.svg'
import { determineCols, determineNumItems_Ing } from '../../utils/functions'
import './styles.css'
import classNames from 'classnames'

interface Props {
    ingredients: Ingredient[],
    orderActive: boolean, 
    shoppingList: Ingredient[],
    setShoppingList: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    currentView: string
}

const IngredientsTable: React.FC<Props> = ({ ingredients, orderActive, shoppingList, setShoppingList, currentView }) => {
    const { windowSize } = useContext(UserLoggedInContext)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(Math.min(ingredients.length, 6))
    const [numberItemsDisplayed, setNumberItemsDisplayed] = useState(Math.min(ingredients.length, 6))
    const [tableLayout, setTableLayout] = useState(`repeat(6, 1fr)`)
    const root = useRef(null)

    useEffect(() => {
        if (!windowSize) return
        const numCols = determineCols(windowSize[0], currentView)
        const numberItems = determineNumItems_Ing(windowSize[0], windowSize[1], numCols)
        const itemsPerCol = numberItems / numCols
        const newTableLayout = `repeat(${itemsPerCol}, 1fr)`
        setStart(0)
        setEnd(numberItems)
        setNumberItemsDisplayed(numberItems)
        setTableLayout(newTableLayout)
    }, [windowSize])

    useEffect(() => {
        if (!windowSize) return 
        const numCols = determineCols(windowSize[0], currentView)
        const numberItems = determineNumItems_Ing(windowSize[0], windowSize[1], numCols, currentView)
        const itemsPerCol = numberItems / numCols
        const newTableLayout = `repeat(${itemsPerCol}, 1fr)`
        setStart(0)
        setEnd(numberItems)
        setNumberItemsDisplayed(numberItems)
        setTableLayout(newTableLayout)
    }, [currentView])

    const handleNextClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
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

    const className = 'IngredientsTable'
    return (
        <div className={className} ref={root} >
            <h2 className={`${className}_header`}>INGREDIENTS</h2>
            <div className={classNames(
                `${className}_table`,
                {[`${className}_table_hideView`]: currentView === 'HIDE'},
                {[`${className}_table_largeView`]: currentView === 'LARGE'}
            )} style={{ gridTemplateRows: tableLayout }} >
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <IngredientItem item={item} key={i} orderActive={orderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} start={start} />
                })}
            </div>            
            <div className={`${className}_pageButtonsContainer`}>
                    <ArrowLeft className={`${className}_pageButton`} onClick={handlePrevClick} />
                    <ArrowRight className={`${className}_pageButton`} onClick={handleNextClick} />
                    <p className={`${className}_resultsText`}>
                        {`Items ${!ingredients.length ? 0 : start + 1} - ${Math.min(ingredients.length, end)} (Total Items ${ingredients.length})`}
                    </p>
            </div>
        </div>
    )
}

export default IngredientsTable