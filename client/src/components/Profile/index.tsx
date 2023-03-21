import { useMutation } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import { client } from '../..'
import { UserLoggedInContext } from '../../App'
import { ProfileFragment } from '../../graphql/fragments'
import { DELETE_USER } from '../../graphql/mutations'
import cache from '../../utils/cache'
import './styles.css'

const Profile = () => {
    const { userId, setUserLoggedIn } = useContext(UserLoggedInContext)
    const profileData = client.readFragment({ id: `User:${userId}`, fragment: ProfileFragment })
    const [deleteUser] = useMutation(DELETE_USER)

    useEffect(() => {
        console.log(profileData)
    })

    const [confirmActive, setConfirmActive] = useState(false)

    const handleDeleteClickOne = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setConfirmActive(true)
    }

    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setConfirmActive(false)
    }

    const handleDeleteClickTwo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            const deletedUser = await deleteUser({ variables: { deleteUserId: userId }})
            if (deletedUser) {
                client.clearStore()
                localStorage.clear()
                setUserLoggedIn(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const className = 'Profile'
    return (
        <div className={className}>
            <h2 className={`${className}_header`} >Profile</h2>
            <p className={`${className}_text`}>
                <span>{`Username:`}</span>
                <span>{profileData && profileData.username}</span>
            </p>
            <p className={`${className}_text`}>
                <span>{`Email:`}</span>
                <span>{profileData && profileData.email}</span>
            </p>
            <p className={`${className}_text`}>
                <span>{`# of Recipes:`}</span>
                <span>{profileData && `${profileData.recipes.length} recipes`}</span>
            </p>
            {confirmActive ?
            <>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_delete`} onClick={handleDeleteClickTwo}>Confirm Delete</button>
                    <button className={`${className}_delete`} onClick={handleCancelClick}>Cancel</button>
                </div>
                <p className={`${className}_confirmText`}>Are you sure?</p>
            </>
            :   
                <button className={`${className}_delete`} onClick={handleDeleteClickOne}>Delete Account</button>
            }

        </div>
    )
}

export default Profile