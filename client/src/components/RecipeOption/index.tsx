import { useContext } from 'react'
import { RecipeBookContext } from '../../pages/RecipeBook'
import { Recipe } from '../../utils/interfaces'
import './styles.css'

interface Props {
    recipe: Recipe 
}

const RecipeOption: React.FC<Props> = ({ recipe }) => {
    const { setRecipeSelected } = useContext(RecipeBookContext)

    const handleRecipeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRecipeSelected(recipe)
    }

    const className = 'RecipeOption'
    return (
        <div className={className} onClick={handleRecipeClick} >
            <img src={recipe.video.thumbnail} alt="youtubeThumbnail" className={`${className}_thumbnail`}/>
            <div className={`${className}_textOverlay`}>
                <p className={`${className}_text`}>{`Recipe: ${recipe.title}`}</p>
                <p className={`${className}_text`}>{`Video: ${recipe.video.title}`}</p>
                <p className={`${className}_text`}>{`Channel: ${recipe.video.channel}`}</p>
            </div>
        </div>
    )
}

export default RecipeOption