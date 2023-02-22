import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
import Navbar from "../../components/Navbar"
import './styles.css'

const LandingPage = () => {
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