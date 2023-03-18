import classNames from 'classnames'
import { Ingredient } from '../../utils/interfaces'
import './styles.css'

interface Props {
    item: Ingredient,
    orderActive: boolean,
    shoppingList: Ingredient[],
    setShoppingList: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientItem: React.FC<Props> = ({ item, orderActive, shoppingList, setShoppingList }) => {
    
    const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
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
            }
        )}>
            <span className={`${className}_itemname`}>{item.name}</span>
            <span className={`${className}_amount`}>{item.amount}</span>
        </div>
    )
}

export default IngredientItem