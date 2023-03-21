import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { CREATE_USER } from '../../graphql/mutations'
import './styles.css'

const RegisterForm = () => {
    const { setUserLoggedIn, setUserId } = useContext(UserLoggedInContext)
    const [createUser,  { error }] = useMutation(CREATE_USER)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPW, setRepeatPW] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, email, password, repeatPW])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email || !password || !repeatPW) return
        if (password !== repeatPW) {
            setErrorMessage('Passwords do not match') 
            return
        }

        const registerData = { username, email, password }
        try {
            const newUser = await createUser({variables: registerData})
            if (newUser.data.createUser) {
                const token = newUser.data.createUser.token
                localStorage.setItem('sprToken', `Bearer ${token}`)
                setUserId(newUser.data.createUser._id)
                setUserLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const className = 'RegisterForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Register</h1>
                <div className={`${className}_inputContainer`}>
                    <input required className={`${className}_input`} type="text" name="username" id="username" placeholder='Username' value={username} autoComplete='off' onChange={e => setUsername(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <input required className={`${className}_input`} type="email" name="email" id="email" placeholder='Email' value={email} autoComplete='off' onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <input required className={`${className}_input`} type="password" name="password" id="password" placeholder='Password' value={password} autoComplete='off' onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <input required className={`${className}_input`} type="password" name="repeatpw" id="repeatpw" placeholder='Repeat Password' value={repeatPW} autoComplete='off' onChange={e => setRepeatPW(e.target.value)} />
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input className={`${className}_button`} type="submit" value="Create Account" />
                </div>
                <p className={`${className}_error`}>{errorMessage}</p>
            </form>
        </div>
    )
}

export default RegisterForm