import { useContext } from 'react'
import { Recipe } from '../../utils/interfaces'
import './styles.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    recipe: Recipe,
    setRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>
}

const RecipeOption: React.FC<Props> = ({ recipe, setRecipeSelected }) => {
    const navigate = useNavigate()
    const handleRecipeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRecipeSelected(recipe)
        navigate('/recipe')
    }

    const className = 'RecipeOption'
    return (
        <div className={className} onClick={handleRecipeClick} >
            <img src={recipe.video.thumbnail} alt="youtubeThumbnail" className={`${className}_thumbnail`}/>
            <div className={`${className}_textOverlay`}>
                <p className={`${className}_title`}>{`Recipe: ${recipe.title}`}</p>
                <p className={`${className}_text`}>{`Video: ${recipe.video.title}`}</p>
                <p className={`${className}_text`}>{`Channel: ${recipe.video.channel}`}</p>
            </div>
        </div>
    )
}

export default RecipeOption