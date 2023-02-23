import { useState } from 'react'
import IngredientItem from './IngredientItem'
import './styles.css'

const IngredientsSection = () => {
    const [orderActive, setOrderActive] = useState(false)

    const handleOrderIngredientsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setOrderActive(prevState => !prevState)
        console.log(orderActive)
    }

    const className = 'IngredientsSection'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Ingredients:</h1>
            <div className={`${className}_table`}>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
                <IngredientItem/>
            </div>
            <div className={`${className}_buttonsContainer`}>
                <div className={`${className}_button`} onClick={handleOrderIngredientsClick}>Order Ingredients</div>
            </div>
        </div>
    )
}

export default IngredientsSection