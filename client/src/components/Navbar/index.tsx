import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { AuthRenderContext } from '../../branches/Auth'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import './styles.css'

const Navbar = () => {
    const [RENDERS_NONAUTH, setRender_Nonauth] = useContext(NonAuthRenderContext)
    const [RENDERS_AUTH, setRender_Auth] = useContext(AuthRenderContext)
    const [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault()
        if (!userLoggedIn) setRender_Nonauth(RENDERS_NONAUTH[n])
        if (userLoggedIn && n === 0) setRender_Auth(RENDERS_AUTH[n])
        if (userLoggedIn && n === 1) setUserLoggedIn(false)
    }

    const className = 'Navbar'
    return (
        <div className={className}>
            <div className={`${className}_logo`} onClick={(e) => handleClick(e, 0)}>LOGO</div>

            {userLoggedIn ?
                <div className={`${className}_buttonsContainer`}>
                    <div className={`${className}_button`} onClick={(e) => handleClick(e, 1)}>Log Out</div>
                </div>
            :
                <div className={`${className}_buttonsContainer`}>
                    <div className={`${className}_button`} onClick={(e) => handleClick(e, 1)}>Log In</div>
                    <div className={`${className}_button`} onClick={(e) => handleClick(e, 2)}>Register</div>
                </div>
            }


        </div>
    )
}

export default Navbar