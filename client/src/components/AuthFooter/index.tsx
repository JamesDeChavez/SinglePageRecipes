import { ReactComponent as BookSVG } from '../../assets/book-solid.svg'
import { ReactComponent as PlusSVG } from '../../assets/square-plus-regular.svg'
import { ReactComponent as UserSVG } from '../../assets/user-solid.svg'
import classNames from 'classnames'
import './styles.css'
import { NavLink, useLocation } from 'react-router-dom'

const AuthFooter = () => {
    const location = useLocation()

    const className = 'AuthFooter'
    return (
        <div className={className} >
            <NavLink to='/recipebook' className={classNames(
                `${className}_button`,
                {[`${className}_active`]: location.pathname === '/recipebook'}
            )}>
                <BookSVG className={`${className}_svgIcon`} />
                <p>Recipe Book</p>
            </NavLink>
            <NavLink to='/newrecipe' className={classNames(
                `${className}_button`,
                {[`${className}_active`]: location.pathname === '/newrecipe'}
            )} >
                <PlusSVG className={`${className}_svgIcon`} />
                <p>New Recipe</p>
            </NavLink>
            <NavLink to='/profile' className={classNames(
                `${className}_button`,
                {[`${className}_active`]: location.pathname === '/profile'}
            )}>
                <UserSVG className={`${className}_svgIcon`} />
                <p>Profile</p>
            </NavLink>
        </div>
    )
}

export default AuthFooter