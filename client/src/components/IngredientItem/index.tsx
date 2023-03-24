import { useLayoutEffect } from 'react'
import classNames from 'classnames'
import { Ingredient } from '../../utils/interfaces'
import gsap from 'gsap'
import './styles.css'

interface Props {
    item: Ingredient,
    orderActive?: boolean,
    shoppingList?: Ingredient[],
    setShoppingList?: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    root: React.MutableRefObject<null>, 
    start: number
}

const IngredientItem: React.FC<Props> = ({ item, orderActive, shoppingList, setShoppingList, root, start }) => {

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}`, { x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [start, root])
    
    const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!setShoppingList || !shoppingList) return
        const newShoppingList = [...shoppingList]
        const index = shoppingList.findIndex(ingredient => ingredient.name === item.name)
        newShoppingList[index] = { name: item.name, amount: item.amount, 
            include: !newShoppingList[index].include }
        setShoppingList(newShoppingList)
    }
    
    const className = 'IngredientItem'
    return (
        <div onClick={handleItemClick} className={classNames(
            className,
            {[`${className}_active`]: orderActive && shoppingList && 
                shoppingList[shoppingList.findIndex(ingredient => ingredient.name === item.name)].include 
            },
            {[`${className}_orderActive`]: orderActive}
        )}>
            <span className={`${className}_itemname`}>{item.name}</span>
            <span className={`${className}_amount`}>{item.amount}</span>
        </div>
    )
}

export default IngredientItem