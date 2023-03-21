import { useLazyQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { UserLoggedInContext } from '../../App'
import { LOGIN } from '../../graphql/queries'
import './styles.css'

const LoginForm = () => {
    const { setUserLoggedIn, setUserId } = useContext(UserLoggedInContext)
    const [login, { error }] = useLazyQuery(LOGIN)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    
    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, password])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !password) return

        const loginData = { username, password}
        try {
            const user = await login({ variables: loginData })
            if (user.data.login) {
                const token = user.data.login.token
                localStorage.setItem('sprToken', `Bearer ${token}`)
                setUserId(user.data.login._id)
                setUserLoggedIn(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const className = 'LoginForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Log In</h1>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="text" name="username" id="username" placeholder='Username' value={username} autoComplete='off' required onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="password" name="password" id="password" placeholder='Password' value={password} autoComplete='off' required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input className={`${className}_button`} type="submit" value="Log In " />
                </div>
                <p className={`${className}_error`}>{errorMessage}</p>                
            </form>
        </div>
    )
}

export default LoginForm