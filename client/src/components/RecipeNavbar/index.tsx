import { useContext } from 'react'
import { RecipeBookContext } from '../../pages/RecipeBook'
import './styles.css'

const RecipeNavbar = () => {
    const { setRecipeSelected } = useContext(RecipeBookContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRecipeSelected(undefined)
    } 

    const className = 'RecipeNavbar'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={handleClick}>{`< Return to Recipe Book`}</button>
        </div>
    )
}

export default RecipeNavbar