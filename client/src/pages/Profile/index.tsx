import AuthFooter from '../../components/AuthFooter'
import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import backgroundImage from '../../assets/background.jpg'
import './styles.css'

const ProfilePage = () => {
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