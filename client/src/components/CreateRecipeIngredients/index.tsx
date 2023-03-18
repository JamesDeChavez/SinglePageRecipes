import IngredientItem from '../IngredientItem'
import './styles.css'

const CreateRecipeIngredients = () => {
    const className = 'CreateRecipeIngredients'
    return (
        <div className={className}>
            <h2>Ingredients:</h2>
            <div className={`${className}_table`}>
            </div>
        </div>
    )
}

export default CreateRecipeIngredients