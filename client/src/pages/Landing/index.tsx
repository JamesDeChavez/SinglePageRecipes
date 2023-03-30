import { useContext } from "react"
import { NonAuthRenderContext } from "../../branches/NonAuth"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
import LoginForm from "../../components/LoginForm"
import Navbar from "../../components/Navbar"
import RegisterForm from "../../components/RegisterForm"
import './styles.css'

const LandingPage = () => {
    const {RENDERS, render} = useContext(NonAuthRenderContext)

    const className = 'LandingPage'
    return (
        <div className={className}>
            <Navbar/>
            {{
                [RENDERS[0]]: <Hero/>,
                [RENDERS[1]]: <LoginForm/>,
                [RENDERS[2]]: <RegisterForm/>
            }[render]}
            <Footer/>
        </div>
    )
}

export default LandingPage