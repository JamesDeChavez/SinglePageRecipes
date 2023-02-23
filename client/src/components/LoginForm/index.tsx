import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import './styles.css'

const LoginForm = () => {
    const [_, setUserLoggedIn] = useContext(UserLoggedInContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUserLoggedIn(true)
    }

    const className = 'LoginForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Log In</h1>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="text" name="username" id="username" placeholder='Username'/>
                </div>
                <div className={`${className}_inputContainer`}>
                    <input className={`${className}_input`} type="text" name="password" id="password" placeholder='Password'/>
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input className={`${className}_button`} type="submit" value="Log In " />
                </div>
            </form>
        </div>
    )
}

export default LoginForm