import { useContext } from 'react'
import { CreateRecipeRenderContext } from '../../branches/CreateRecipe'
import './styles.css'

interface Props {
    handleCreateRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CreateRecipeNavbar: React.FC<Props> = ({ handleCreateRecipe }) => {
    const {setVideoSelected} = useContext(CreateRecipeRenderContext)

    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setVideoSelected(undefined)
    } 

    const className = 'CreateRecipeNavbar'
    return (
        <div className={className}>
            <button className={`${className}_returnButton`} onClick={(e) => handleReturnClick(e, 0)}>{`< Return to Video Search`}</button>
            <button className={`${className}_createButton`} onClick={handleCreateRecipe}>Create Recipe</button>
        </div>
    )
}

export default CreateRecipeNavbar