import { useEffect } from 'react'
import { Ingredient } from '../../utils/interfaces'
import { useQuery } from '@apollo/client'
import { GET_AMAZON_TAG } from '../../graphql/queries'
import classNames from 'classnames'
import IngredientsTable from '../IngredientsTable'
import './styles.css'

interface Props {
    ingredients: Ingredient[],
    orderActive: boolean, setOrderActive: React.Dispatch<React.SetStateAction<boolean>>,
    shoppingList: Ingredient[], setShoppingList: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    sectionVisible: string, currentView: string
}

const IngredientsSection: React.FC<Props> = ({ ingredients, orderActive, setOrderActive, shoppingList, setShoppingList, sectionVisible, currentView }) => {
    const { data } = useQuery(GET_AMAZON_TAG)

    useEffect(() => {
        const newShoppingList = ingredients.map(item => {
            return { ...item, include: true}
        })
        setShoppingList(newShoppingList)
    }, [ingredients, setShoppingList])

    const handleOrderIngredientsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOrderActive(prevState => !prevState)
    }

    const selectAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newState: Ingredient[] = []
        shoppingList.forEach(item => {
            item.include = true
            newState.push(item)
        })
        setShoppingList(newState)
    }

    const unselectAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newState: Ingredient[] = []
        shoppingList.forEach(item => {
            item.include = false
            newState.push(item)
        })
        setShoppingList(newState)
    }

    const url = `https://www.amazon.com/afx/ingredients/landing?tag=${data ? data.amazonTag : ''}`
    const value = JSON.stringify({ 
        ingredients: shoppingList.filter(ingredient => ingredient.include !== false).map(ing => {return { name: ing.name, amount: ing.amount }} )
    })
    const className = 'IngredientsSection'
    return (
        <div className={classNames(
                className,
                {[`${className}_hidden`]: sectionVisible !== 'INGREDIENTS'}
            )} 
        >
            <IngredientsTable 
                ingredients={ingredients}
                orderActive={orderActive}
                shoppingList={shoppingList} 
                setShoppingList={setShoppingList}
                currentView={currentView}
            />  
            <div className={`${className}_orderButtonsContainer`}>
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
        </div>
    )
}

export default IngredientsSection