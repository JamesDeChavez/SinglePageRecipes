import { useContext } from 'react'
import { client } from '../..'
import { UserLoggedInContext } from '../../App'
import { AuthRenderContext } from '../../branches/Auth'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import logoImage from '../../assets/logo.jpg'
import './styles.css'

const Navbar = () => {
    const {RENDERS: RENDERS_NONAUTH, setRender: setRender_Nonauth} = useContext(NonAuthRenderContext)
    const [RENDERS_AUTH, setRender_Auth] = useContext(AuthRenderContext)
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        if (!userLoggedIn) setRender_Nonauth(RENDERS_NONAUTH[n])
        if (userLoggedIn && n === 0) setRender_Auth(RENDERS_AUTH[n])
        if (userLoggedIn && n === 1) {
            client.clearStore()
            localStorage.clear()
            setUserLoggedIn(false)
        }
    }

    const className = 'Navbar'
    return (
        <div className={className}>
            <button className={`${className}_logo`} onClick={(e) => handleClick(e, 0)} >
                SP Recipes
            </button>

            {userLoggedIn ?
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`} onClick={(e) => handleClick(e, 1)}>Log Out</button>
                </div>
            :
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`} onClick={(e) => handleClick(e, 1)}>Log In</button>
                    <button className={`${className}_button`} onClick={(e) => handleClick(e, 2)}>Register</button>
                </div>
            }
        </div>
    )
}

export default Navbar