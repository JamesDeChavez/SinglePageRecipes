import { useContext, useEffect } from "react"
import SampleRecipe from "../../components/SampleRecipe"
import { Recipe } from "../../utils/interfaces"
import { useNavigate } from "react-router-dom"
import './styles.css'
import { UserLoggedInContext } from "../../App"
import Navbar from "../../components/Navbar"

interface Props {
    sampleRecipeSelected: Recipe | null,
    setSampleRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>
}

const SampleRecipePage: React.FC<Props> = ({ sampleRecipeSelected, setSampleRecipeSelected}) => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (userLoggedIn) navigate('/recipebook')
        if (!sampleRecipeSelected) navigate('/samplerecipebook')
    }, [userLoggedIn, sampleRecipeSelected, navigate])
    const className = 'SampleRecipePage'
    return (
        <div className={className}>
        {sampleRecipeSelected ?
        <>
            <Navbar />
            <SampleRecipe recipeSelected={sampleRecipeSelected}/>
        </>
        :
        <></>
        }
        </div>
    )
}

export default SampleRecipePage