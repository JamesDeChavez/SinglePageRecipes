import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Recipe from '../../components/Recipe'
import RecipeNavbar from '../../components/RecipeNavbar'
import { UserLoggedInContext } from '../../App'
import './styles.css'
import { Recipe as RecipeInterface } from '../../utils/interfaces'

interface Props {
    recipeSelected: RecipeInterface | null,
    setRecipeSelected: React.Dispatch<React.SetStateAction<RecipeInterface | null>>,
    setEditRecipeActive: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipePage: React.FC<Props> = ({ recipeSelected, setRecipeSelected, setEditRecipeActive }) => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLoggedIn) navigate('/')
        if (!recipeSelected) navigate('/recipebook')
    }, [userLoggedIn, recipeSelected, navigate])

    const className = 'RecipePage'
    return (
        <div className={className}>
            {!recipeSelected ?
            <></>
            :
                <div className={`${className}_recipeContainer`}>
                    <RecipeNavbar recipeSelected={recipeSelected} setRecipeSelected={setRecipeSelected} setEditRecipeActive={setEditRecipeActive} />
                    <Recipe recipe={recipeSelected} />
                </div>
            }
        </div>
    )
}

export default RecipePage