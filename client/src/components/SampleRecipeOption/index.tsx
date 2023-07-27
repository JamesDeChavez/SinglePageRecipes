import { useNavigate } from 'react-router-dom'
import { Recipe } from '../../utils/interfaces'
import './styles.css'

interface Props {
    recipe: Recipe,
    setRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>
}

const SampleRecipeOption: React.FC<Props> = ({ recipe, setRecipeSelected }) => {
    const navigate = useNavigate()
    const handleRecipeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRecipeSelected(recipe)
        navigate('/samplerecipe')
    }

    const className = 'SampleRecipeOption'
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

export default SampleRecipeOption