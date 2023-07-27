import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { CREATE_USER } from '../../graphql/mutations'
import gsap from 'gsap'
import './styles.css'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const { setUserLoggedIn, setUserId } = useContext(UserLoggedInContext)
    const [createUser,  { error, loading }] = useMutation(CREATE_USER)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPW, setRepeatPW] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const root = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, email, password, repeatPW])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_form`,{x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email || !password || !repeatPW) return
        if (username.length < 7) {
            setErrorMessage('Username must be at least 7 characters long') 
            return
        }
        if (password.length < 7) {
            setErrorMessage('Passwords must be at least 7 characters long') 
            return
        }
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
                navigate('/recipebook')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const className = 'RegisterForm'
    return (
        <div className={className} ref={root}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Register</h1>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_inputLabel`} htmlFor="username">Username</label>
                    <input required className={`${className}_input`} type="text" name="username" id="username" value={username} autoComplete='off' onChange={e => setUsername(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_inputLabel`} htmlFor="email">Email</label>
                    <input required className={`${className}_input`} type="email" name="email" id="email" value={email} autoComplete='off' onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_inputLabel`} htmlFor="password">Password</label>
                    <input required className={`${className}_input`} type="password" name="password" id="password" value={password} autoComplete='off' onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_inputLabel`} htmlFor="repeatpw">Repeat Password</label>
                    <input required className={`${className}_input`} type="password" name="repeatpw" id="repeatpw" value={repeatPW} autoComplete='off' onChange={e => setRepeatPW(e.target.value)} />
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input className={`${className}_button`} type="submit" value="Create Account" />
                </div>
                <p className={`${className}_error`}>{errorMessage}</p>
                <Loading loading={loading} />
            </form>
        </div>
    )
}

export default RegisterForm