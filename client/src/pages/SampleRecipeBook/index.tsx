import Navbar from "../../components/Navbar"
import { Recipe } from "../../utils/interfaces"
import SampleRecipeList from "../../components/SampleRecipeList"
import Footer from "../../components/Footer"
import { useContext, useEffect } from "react"
import { UserLoggedInContext } from "../../App"
import { useNavigate } from "react-router-dom"
import './styles.css'

interface Props {
    setSampleRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>
}

const SampleRecipeBookPage: React.FC<Props> = ({ setSampleRecipeSelected }) => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (userLoggedIn) navigate('/recipebook')
    }, [userLoggedIn, navigate])
    const className = 'SampleRecipeBookPage'
    return (
        <div className={className}>
            <div className={`${className}_sampleRecipeListContainer`}>
                <div className={`${className}_overlay`}></div>
                <Navbar/>
                <SampleRecipeList setRecipeSelected={setSampleRecipeSelected} />
                <Footer />
            </div>
        </div>
    )
}

export default SampleRecipeBookPage