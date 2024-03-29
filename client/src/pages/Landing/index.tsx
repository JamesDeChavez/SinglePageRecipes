import Navbar from "../../components/Navbar"
import Hero from "../../components/Hero"
import Footer from "../../components/Footer"
import './styles.css'
import { useContext, useEffect } from "react"
import { UserLoggedInContext } from "../../App"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (userLoggedIn) navigate('/recipebook')
    })

    const className = 'LandingPage'
    return (
        <div className={className}>
            <Navbar/>
            <Hero/>
            <Footer/>
        </div>
    )
}

export default LandingPage