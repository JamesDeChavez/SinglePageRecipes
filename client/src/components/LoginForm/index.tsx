import { useLazyQuery } from '@apollo/client'
import { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react'
import { UserLoggedInContext } from '../../App'
import { LOGIN } from '../../graphql/queries'
import gsap from 'gsap'
import './styles.css'

const LoginForm = () => {
    const { setUserLoggedIn, setUserId } = useContext(UserLoggedInContext)
    const [login, { error, loading }] = useLazyQuery(LOGIN)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const root = useRef(null)
    
    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, password])

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
        <div className={className} ref={root} >
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

export default LoginForm