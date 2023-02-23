import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import './styles.css'

const CreateRecipePage = () => {
    const className = 'CreateRecipePage'
    return (
        <div className={className}>
            <Navbar/>
            <div>Main Section</div>
            <Footer/>
        </div>
    )
}

export default CreateRecipePage