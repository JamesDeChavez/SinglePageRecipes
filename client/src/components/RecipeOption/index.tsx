import { useContext } from 'react'
import { RecipeBookContext } from '../../pages/RecipeBook'
import cache from '../../utils/cache'
import './styles.css'

const RecipeOption = () => {
    const { setRecipeSelected } = useContext(RecipeBookContext)

    const handleRecipeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRecipeSelected(cache.User.recipes[0])
    }

    const className = 'RecipeOption'
    return (
        <div className={className} onClick={handleRecipeClick} >
            <img src="https://i.ytimg.com/vi/ZrR0VbqNdW8/mqdefault.jpg" alt="youtubeThumbnail" className={`${className}_thumbnail`}/>
            <div className={`${className}_textOverlay`}>
                <p className={`${className}_text`}>Recipe: Babish Chicken Parm</p>
                <p className={`${className}_text`}>Video: Chicken Parmesan | Basics with Babish </p>
                <p className={`${className}_text`}>Channel: Babish Culinary Universe</p>
            </div>
        </div>
    )
}

export default RecipeOption