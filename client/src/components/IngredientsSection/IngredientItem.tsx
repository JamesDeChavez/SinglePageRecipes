import './styles.css'

const IngredientItem = () => {
    const className = 'IngredientItem'
    return (
        <div className={className}>
            <span className={`${className}_itemname`}>Chicken</span>
            <span className={`${className}_amount`}>2 lbs</span>
        </div>
    )
}

export default IngredientItem