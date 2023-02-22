import './styles.css'

const RegisterForm = () => {
    const className = 'RegisterForm'
    return (
        <div className={className}>
            <form className={`${className}_form`}>
                <h1 className={`${className}_header`}>Register</h1>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="repeatpw">Repeat Password:</label>
                    <input type="text" name="repeatpw" id="repeatpw" />
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input type="submit" value="Create Account" />
                </div>
            </form>
        </div>
    )
}

export default RegisterForm