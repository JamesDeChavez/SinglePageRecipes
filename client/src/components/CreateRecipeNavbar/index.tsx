import { useContext } from 'react'
import { CreateRecipeRenderContext } from '../../branches/CreateRecipe'
import Loading from '../Loading'
import './styles.css'

interface Props {
    handleCreateRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    loading: boolean
}

const CreateRecipeNavbar: React.FC<Props> = ({ handleCreateRecipe, loading }) => {
    const {setVideoSelected} = useContext(CreateRecipeRenderContext)

    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setVideoSelected(undefined)
    } 

    const className = 'CreateRecipeNavbar'
    return (
        <div className={className}>
            <button className={`${className}_returnButton`} onClick={(e) => handleReturnClick(e, 0)}>{`< Return to Video Search`}</button>
            <button className={`${className}_createButton`} onClick={handleCreateRecipe} style={{ display: loading ? 'none' : 'block'}} >Create Recipe</button>
            <Loading loading={loading} />
        </div>
    )
}

export default CreateRecipeNavbar