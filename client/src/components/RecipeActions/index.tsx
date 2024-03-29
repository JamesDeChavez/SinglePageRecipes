import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { GET_AMAZON_TAG } from '../../graphql/queries'
import { Ingredient } from '../../utils/interfaces'
import './styles.css'
import classNames from 'classnames'

interface Props {
    orderActive: boolean, 
    setOrderActive: React.Dispatch<React.SetStateAction<boolean>>,
    shoppingList: Ingredient[],
    setShoppingList: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    root: React.MutableRefObject<null>,
    currentView: string
}

const RecipeActions: React.FC<Props> = ({ orderActive, setOrderActive, shoppingList, setShoppingList, root, currentView }) => {
    const { data } = useQuery(GET_AMAZON_TAG)
    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(JSON.stringify({ 
            ingredients: shoppingList.filter(ingredient => ingredient.include !== false).map(ing => {return { name: ing.name, brand: ing.brand || '', amount: ing.amount }} )
        }))
    }, [shoppingList])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_buttonsContainer`, { x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [root])

    const handleOrderIngredientsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOrderActive(prevState => !prevState)
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

    const url = `https://www.amazon.com/afx/ingredients/landing?tag=${data ? data.amazonTag : ''}`
    const className = 'RecipeActions'
    return (
        <div className={classNames(
            className,
            {[`${className}_hideView`]: currentView === 'HIDE'}
        )}>
            <div className={`${className}_container`}>
                <div className={`${className}_buttonsContainer`}>
                    {orderActive ?
                    <>
                        <div className={`${className}_leftButtonsContainer`}>
                            <button className={`${className}_button`} onClick={selectAll}>Select All</button>
                            <button className={`${className}_button`} onClick={unselectAll}>Unselect All</button>
                        </div>
                        <div className={`${className}_rightButtonsContainer`}>
                            <form method='POST' action={url} target='_blank' rel='noreferrer'>
                                <input type="submit" name='submit' value="Submit Order" className={`${className}_button`}  />
                                <input type="hidden" name='ingredients' value={value} />
                            </form>
                
                            <button className={`${className}_button`} onClick={handleOrderIngredientsClick}>Cancel</button>
                        </div>
                    </>
                    :
                        <button className={`${className}_button`} onClick={handleOrderIngredientsClick}>Order Ingredients</button>
                    }
                </div>
                <p className={`${className}_text`} style={{ display: orderActive ? 'block' : 'none' }}>
                    <span className={`${className}_orange`}>SELECT</span> all the ingredients you would like to add to your Amazon Fresh Shopping Cart
                </p>
            </div>
        </div>
    )
}

export default RecipeActions