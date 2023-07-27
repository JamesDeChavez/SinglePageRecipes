import { useContext, useEffect } from 'react'
import AuthFooter from '../../components/AuthFooter'
import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import './styles.css'
import { UserLoggedInContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLoggedIn) navigate('/')
    }, [userLoggedIn, navigate])
    const className = 'ProfilePage'
    return (
        <div className={className}>   
            <div className={`${className}_overlay`}></div>
            <Navbar/>
            <Profile/>
            <AuthFooter/>
        </div>
    )
}

export default ProfilePage