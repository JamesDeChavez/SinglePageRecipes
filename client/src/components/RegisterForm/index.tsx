import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import './styles.css'

const RegisterForm = () => {
    const [_, setUserLoggedIn] = useContext(UserLoggedInContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUserLoggedIn(true)
    }

    const className = 'RegisterForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Register</h1>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="text" name="username" id="username" placeholder='Username' />
                </div>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="email" name="email" id="email" placeholder='Email' />
                </div>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="password" name="password" id="password" placeholder='Password' />
                </div>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="text" name="repeatpw" id="repeatpw" placeholder='Repeat Password' />
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input className={`${className}_button`} type="submit" value="Create Account" />
                </div>
            </form>
        </div>
    )
}

export default RegisterForm