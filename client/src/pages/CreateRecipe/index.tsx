import { useContext, useEffect } from 'react'
import CreateRecipeBranch from '../../branches/CreateRecipe'
import './styles.css'
import { UserLoggedInContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const CreateRecipePage = () => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLoggedIn) navigate('/')
    }, [])
    const className = 'CreateRecipePage'
    return (
        <div className={className}>
            <CreateRecipeBranch/>
        </div>
    )
}

export default CreateRecipePage