import { useContext } from 'react'
import { RecipeBookContext } from '../../pages/RecipeBook'
import { ReactComponent as BackSvg } from '../../assets/backward-step-solid.svg'
import Loading from '../Loading'
import './styles.css'

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
            <button className={`${className}_returnButton`} onClick={handleReturnClick}>
                <BackSvg className={`${className}_svg`} />
                {`Return to Recipe`}
            </button>
            <button className={`${className}_createButton`} onClick={handleUpdateRecipe} style={{ display: loading ? 'none' : 'block'}} >Update Recipe</button>
            <Loading loading={loading} />
        </div>
    )
}

export default EditRecipeNavbar