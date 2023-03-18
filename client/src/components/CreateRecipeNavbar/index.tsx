import { useContext } from 'react'
import { CreateRecipeRenderContext } from '../../branches/CreateRecipe'
import './styles.css'

const CreateRecipeNavbar = () => {
    const [RENDERS, setRender] = useContext(CreateRecipeRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    } 

    const className = 'CreateRecipeNavbar'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={(e) => handleClick(e, 0)}>Return to Video Search</button>
        </div>
    )
}

export default CreateRecipeNavbar