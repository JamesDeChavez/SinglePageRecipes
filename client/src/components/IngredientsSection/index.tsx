import { useState, useEffect } from 'react'
import cache from '../../utils/cache'
import { Ingredient } from '../../utils/interfaces'
import IngredientItem from '../IngredientItem'
import './styles.css'

const associatesTag = 'jamesrecipeap-20'

const IngredientsSection = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(Math.min(cache.User.recipes[0].ingredients.length, 6))
    const [numberItemsDisplayed, setNumberItemsDisplayed] = useState(Math.min(cache.User.recipes[0].ingredients.length, 6))
    const [orderActive, setOrderActive] = useState(false)
    const [shoppingList, setShoppingList] = useState<Ingredient[]>([])

    useEffect(() => {
        const newShoppingList = cache.User.recipes[0].ingredients.map(item => {
            return { ...item, include: true}
        })
        setShoppingList(newShoppingList)
        setIngredients(cache.User.recipes[0].ingredients)
    }, [])

    const handleOrderIngredientsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOrderActive(prevState => !prevState)
        console.log(orderActive)
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
        <div className={className}>
            <h2 className={`${className}_header`}>Ingredients:</h2>
            <div className={`${className}_table`}>
                {ingredients && ingredients.slice(start, end).map((item, i) => {
                    return <IngredientItem item={item} key={i} orderActive={orderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} />
                })}
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
            <div className={`${className}_pageButtonsContainer`}>
                    <button className={`${className}_button`} onClick={handlePrevClick}>Prev</button>
                    <button className={`${className}_button`} onClick={handleNextClick}>Next</button>
                    <p className={`${className}_resultsText`}>{`Items ${start + 1} - ${end} (Total Items ${ingredients.length})`}</p>
            </div>
        </div>
    )
}

export default IngredientsSection