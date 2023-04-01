import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { CREATE_USER } from '../../graphql/mutations'
import gsap from 'gsap'
import './styles.css'

const RegisterForm = () => {
    const { setUserLoggedIn, setUserId } = useContext(UserLoggedInContext)
    const [createUser,  { error, loading }] = useMutation(CREATE_USER)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPW, setRepeatPW] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const root = useRef(null)

    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, email, password, repeatPW])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_form`,{x: 1000 }, { duration: 0.5, x: 0 })
            gsap.to(`.${className}_circle1`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true})
            gsap.to(`.${className}_circle2`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.2})
            gsap.to(`.${className}_circle3`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.4})
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
                <div className={`${className}_loadingContainer`} ref={root} style={{display: loading ? 'flex' : 'none'}} > 
                    <p className={`${className}_loading`}>Loading</p>
                    <svg viewBox="0 0 100 100" className={`${className}_loadingSvg`} >
                        <circle fill="#fff" stroke="none" cx="25" cy="50" r="10" className={`${className}_circle1`} />
                        <circle fill="#fff" stroke="none" cx="50" cy="50" r="10" className={`${className}_circle2`} />
                        <circle fill="#fff" stroke="none" cx="75" cy="50" r="10" className={`${className}_circle3`} />
                    </svg>
                </div>  
            </form>
        </div>
    )
}

export default RegisterForm