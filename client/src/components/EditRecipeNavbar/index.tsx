import { useContext } from 'react'
import { RecipeBookContext } from '../../pages/RecipeBook'
import './styles.css'
import Loading from '../Loading'

interface Props {
    handleUpdateRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    loading: boolean
}

const EditRecipeNavbar: React.FC<Props> = ({ handleUpdateRecipe, loading }) => {
    const { setEditRecipeActive } = useContext(RecipeBookContext)

    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setEditRecipeActive(false)
    } 

    const className = 'EditRecipeNavbar'
    return (
        <div className={className}>
            <button className={`${className}_returnButton`} onClick={handleReturnClick}>{`< Return to Recipe`}</button>
            <button className={`${className}_createButton`} onClick={handleUpdateRecipe} style={{ display: loading ? 'none' : 'block'}} >Update Recipe</button>
            <Loading loading={loading} />
        </div>
    )
}

export default EditRecipeNavbar