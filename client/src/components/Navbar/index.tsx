import { useContext, useEffect } from 'react'
import { client } from '../..'
import { UserLoggedInContext } from '../../App'
import { ReactComponent as BookSVG } from '../../assets/book-solid.svg'
import { ReactComponent as PlusSVG } from '../../assets/square-plus-regular.svg'
import { ReactComponent as UserSVG } from '../../assets/user-solid.svg'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import './styles.css'

const Navbar = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        client.clearStore()
        localStorage.clear()
        setUserLoggedIn(false)
        navigate('/')
    }

    const className = 'Navbar'
    return (
        <div className={className}>
            <NavLink to='/' className={`${className}_logo`}>
                <h1>SP Recipes</h1>
            </NavLink>
            <ul className={`${className}_navLinks`} style={!userLoggedIn ? {display: 'none'} : {}} >
                <li className={`${className}_navLink`}>
                    <NavLink to="/recipebook" className={classNames(`${className}_navButton`, location.pathname === '/recipebook' && `${className}_active`)}>
                        <BookSVG className={`${className}_svgIcon`} />
                        <p>Recipe Book</p>
                    </NavLink>
                </li>
                <li className={`${className}_navLink`}>
                    <NavLink to='/newrecipe' className={classNames(`${className}_navButton`, location.pathname === '/newrecipe' && `${className}_active`)}>
                        <PlusSVG className={`${className}_svgIcon`} />
                        <p>New Recipe</p>
                    </NavLink>
                </li>
                <li className={`${className}_navLink`}>
                    <NavLink to='/profile' className={classNames(`${className}_navButton`, location.pathname === '/profile' && `${className}_active`)} >
                        <UserSVG className={`${className}_svgIcon`} />
                        <p>Profile</p>
                    </NavLink>
                </li>
            </ul>
            {userLoggedIn ?
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`} onClick={handleLogout} >Log Out</button>
                </div>
            :
                <div className={`${className}_buttonsContainer`}>
                    <NavLink to='/login' className={`${className}_button`}>
                        Log In
                    </NavLink>
                    <NavLink to='/register' className={`${className}_button`}>
                        Register
                    </NavLink>
                </div>
            }
        </div>
    )
}

export default Navbar