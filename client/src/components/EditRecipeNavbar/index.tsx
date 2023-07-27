import { useNavigate } from 'react-router-dom'
import { ReactComponent as BackSvg } from '../../assets/backward-step-solid.svg'
import Loading from '../Loading'
import './styles.css'

interface Props {
    handleUpdateRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    loading: boolean,
    setEditRecipeActive: React.Dispatch<React.SetStateAction<boolean>>
}

const EditRecipeNavbar: React.FC<Props> = ({ handleUpdateRecipe, loading, setEditRecipeActive }) => {
    const navigate = useNavigate()
    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setEditRecipeActive(false)
        navigate('/recipe')
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