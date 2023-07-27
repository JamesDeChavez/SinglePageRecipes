import Footer from "../../components/Footer"
import RegisterForm from "../../components/RegisterForm"
import Navbar from "../../components/Navbar"
import { useContext, useEffect } from "react"
import { UserLoggedInContext } from "../../App"
import { useNavigate } from "react-router-dom"
import './styles.css'

const RegisterPage = () => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (userLoggedIn) navigate('/recipebook')
    }, [userLoggedIn, navigate])
    const className = 'RegisterPage'
    return (
        <div className={className}>
            <Navbar/>
            <RegisterForm/>
            <Footer/>
        </div>
    )
}

export default RegisterPage