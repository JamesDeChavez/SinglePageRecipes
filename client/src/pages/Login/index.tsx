import { useContext, useEffect } from "react"
import Footer from "../../components/Footer"
import LoginForm from "../../components/LoginForm"
import Navbar from "../../components/Navbar"
import { UserLoggedInContext } from "../../App"
import { useNavigate } from "react-router-dom"
import './styles.css'

const LoginPage = () => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (userLoggedIn) navigate('/recipebook')
    }, [userLoggedIn, navigate])
    const className = 'LoginPage'
    return (
        <div className={className}>
            <Navbar/>
            <LoginForm/>
            <Footer/>
        </div>
    )
}

export default LoginPage