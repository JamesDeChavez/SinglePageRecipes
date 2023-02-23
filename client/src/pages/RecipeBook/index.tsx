import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import './styles.css'

const RecipeBookPage = () => {
    const className = 'RecipeBookPage'
    return (
        <div className={className}>
            <Navbar/>
            <div>Main Section</div>
            <Footer/>
        </div>
    )
}

export default RecipeBookPage