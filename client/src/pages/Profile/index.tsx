import AuthFooter from '../../components/AuthFooter'
import Navbar from '../../components/Navbar'
import './styles.css'

const ProfilePage = () => {
    const className = 'ProfilePage'
    return (
        <div className={className}>
            <Navbar/>
            <div>Profile Page</div>
            <AuthFooter/>
        </div>
    )
}

export default ProfilePage