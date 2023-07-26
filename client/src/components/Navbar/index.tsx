import { useContext } from 'react'
import { client } from '../..'
import { UserLoggedInContext } from '../../App'
import { AuthRenderContext } from '../../branches/Auth'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import { ReactComponent as BookSVG } from '../../assets/book-solid.svg'
import { ReactComponent as PlusSVG } from '../../assets/square-plus-regular.svg'
import { ReactComponent as UserSVG } from '../../assets/user-solid.svg'
import './styles.css'
import classNames from 'classnames'

const Navbar = () => {
    const {RENDERS: RENDERS_NONAUTH, setRender: setRender_Nonauth} = useContext(NonAuthRenderContext)
    const [RENDERS_AUTH, setRender_Auth, render_Auth] = useContext(AuthRenderContext)
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

    const navButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender_Auth(RENDERS_AUTH[n])
    }

    const className = 'Navbar'
    return (
        <div className={className}>
            <button onClick={(e) => handleClick(e, 0)} >
                <h1 className={`${className}_logo`} >SP Recipes</h1>
            </button>
            <ul className={`${className}_navLinks`} style={!userLoggedIn ? {display: 'none'} : {}} >
                <li className={`${className}_navLink`}>
                    <button className={classNames(`${className}_navButton`, render_Auth === 'RECIPE_BOOK' && `${className}_active`)} onClick={(e) => navButtonClick(e, 0)}>
                        <BookSVG className={`${className}_svgIcon`} />
                        <p>Recipe Book</p>
                    </button>
                </li>
                <li className={`${className}_navLink`}>
                    <button className={classNames(`${className}_navButton`, render_Auth === 'NEW_RECIPE' && `${className}_active`)} onClick={(e) => navButtonClick(e, 1)}>
                        <PlusSVG className={`${className}_svgIcon`} />
                        <p>New Recipe</p>
                    </button>
                </li>
                <li className={`${className}_navLink`}>
                    <button className={classNames(`${className}_navButton`, render_Auth === 'PROFILE' && `${className}_active`)} onClick={(e) => navButtonClick(e, 2)}>
                        <UserSVG className={`${className}_svgIcon`} />
                        <p>Profile</p>
                    </button>
                </li>
            </ul>
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