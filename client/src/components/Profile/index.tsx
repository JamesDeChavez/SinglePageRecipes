import { useState, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import cache from '../../utils/cache'
import './styles.css'

const Profile = () => {
    const [_, setUserLoggedIn] = useContext(UserLoggedInContext)
    const [confirmActive, setConfirmActive] = useState(false)

    const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setUserLoggedIn(false)
    }

    const className = 'Profile'
    return (
        <div className={className}>
            <h2 className={`${className}_header`} >Profile</h2>
            <p className={`${className}_text`}>
                <span>{`Username:`}</span>
                <span>{cache.User.username}</span>
            </p>
            <p className={`${className}_text`}>
                <span>{`Email:`}</span>
                <span>{cache.User.email}</span>
            </p>
            <p className={`${className}_text`}>
                <span>{`# of Recipes:`}</span>
                <span>{`${cache.User.recipes.length} recipes`}</span>
            </p>
            <button className={`${className}_delete`} onClick={handleDeleteAccount}>Delete Account</button>
        </div>
    )
}

export default Profile