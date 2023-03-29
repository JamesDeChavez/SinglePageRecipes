import { useState, useEffect, useContext, useRef } from 'react'
import { UserLoggedInContext } from '../../App'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import './styles.css'

const associatesTag = 'jamesrecipeap-20'

interface Props {
    ingredients: Ingredient[],
    orderActive: boolean, 
    setOrderActive: React.Dispatch<React.SetStateAction<boolean>>,
    shoppingList: Ingredient[],
    setShoppingList: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientsSection: React.FC<Props> = ({ ingredients, orderActive, setOrderActive, shoppingList, setShoppingList }) => {
    const { windowSize } = useContext(UserLoggedInContext)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(Math.min(ingredients.length, 6))
    const [numberItemsDisplayed, setNumberItemsDisplayed] = useState(Math.min(ingredients.length, 6))
    const [gridTemplateRows, setGridTemplateRows] = useState(`repeat(6, 1fr)`)
    const root = useRef(null)

    useEffect(() => {
        const newShoppingList = ingredients.map(item => {
            return { ...item, include: true}
        })
        setShoppingList(newShoppingList)
    }, [ingredients, setShoppingList])

    
    useEffect(() => {
        if (!windowSize) return
        const numberRows = windowSize[0] < 850 ? Math.floor((windowSize[1] - (windowSize[0] / 1.8) - 135) / 50) : Math.floor((((windowSize[1] - 30) / 2) - 25) / 50)
        if (windowSize[0] < 1250) {
            setEnd(numberRows)
            setNumberItemsDisplayed(numberRows)
        } else {
            setEnd(numberRows * 2)
            setNumberItemsDisplayed(numberRows * 2)

        }
        setGridTemplateRows(`repeat(${numberRows}, 1fr)`)
    }, [windowSize])

    const handleOrderIngredientsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOrderActive(prevState => !prevState)
    }
    
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

    const selectAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newState: Ingredient[] = [];
        shoppingList.forEach(item => {
            item.include = true;
            newState.push(item);
        });
        setShoppingList(newState);
    };

    const unselectAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newState: Ingredient[] = [];
        shoppingList.forEach(item => {
            item.include = false;
            newState.push(item);
        });
        setShoppingList(newState);
    };

    const url = `https://www.amazon.com/afx/ingredients/landing?tag=${associatesTag}`;
    const value = JSON.stringify({ 
        ingredients: shoppingList.filter(ingredient => ingredient.include !== false)
    });
    const className = 'IngredientsSection'
    return (
        <div className={className} ref={root}>
            <h2 className={`${className}_header`}>Ingredients:</h2>
            <div className={`${className}_table`} style={{ gridTemplateRows: gridTemplateRows }} >
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <IngredientItem item={item} key={i} orderActive={orderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} start={start} />
                })}
            </div>            
            <div className={`${className}_pageButtonsContainer`}>
                    <button className={`${className}_button`} onClick={handlePrevClick}>Prev</button>
                    <button className={`${className}_button`} onClick={handleNextClick}>Next</button>
                    <p className={`${className}_resultsText`}>{`Items ${!ingredients.length ? 0 : start + 1} - ${Math.min(ingredients.length, end)} (Total Items ${ingredients.length})`}</p>
            </div>
            <div className={`${className}_orderButtonsContainer`}>
                {orderActive ?
                <>
                    <div className={`${className}_leftButtonsContainer`}>
                        <button className={`${className}_button`} onClick={selectAll}>Select All</button>
                        <button className={`${className}_button`} onClick={unselectAll}>Unselect All</button>
                    </div>
                    <div className={`${className}_rightButtonsContainer`}>
                        <form method='POST' action={url} target='_blank' >
                            <button className={`${className}_button`} type='submit'>Submit Order</button>
                            <input type="hidden" name='ingredients' value={value} />
                        </form>
                        
                        <button className={`${className}_button`} onClick={handleOrderIngredientsClick}>Cancel</button>
                    </div>
                </>
                :
                    <button className={`${className}_button`} onClick={handleOrderIngredientsClick}>Order Ingredients</button>
                }
            </div>
        </div>
    )
}

export default IngredientsSection