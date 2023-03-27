import { useContext } from 'react'
import { RecipeBookContext } from '../../pages/RecipeBook'
import './styles.css'

interface Props {
    handleUpdateRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const EditRecipeNavbar: React.FC<Props> = ({ handleUpdateRecipe }) => {
    const { setEditRecipeActive } = useContext(RecipeBookContext)

    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setEditRecipeActive(false)
    } 

    const className = 'EditRecipeNavbar'
    return (
        <div className={className}>
            <button className={`${className}_returnButton`} onClick={handleReturnClick}>{`< Return to Recipe`}</button>
            <button className={`${className}_createButton`} onClick={handleUpdateRecipe}>Update Recipe</button>
        </div>
    )
}

export default EditRecipeNavbar