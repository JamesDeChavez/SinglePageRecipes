import './styles.css'

const LoginForm = () => {
    const className = 'LoginForm'
    return (
        <div className={className}>
            <form className={`${className}_form`}>
                <h1 className={`${className}_header`}>Login</h1>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password" />
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default LoginForm