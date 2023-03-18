import AuthFooter from "../../components/AuthFooter"
import Navbar from "../../components/Navbar"
import RecipeList from "../../components/RecipeList"
import './styles.css'

const RecipeBookPage = () => {
    const className = 'RecipeBookPage'
    return (
        <div className={className}>
            <Navbar/>
            <RecipeList/>
            <AuthFooter/>
        </div>
    )
}

export default RecipeBookPage