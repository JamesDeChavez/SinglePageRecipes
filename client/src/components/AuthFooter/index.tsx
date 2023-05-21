import { useContext } from 'react'
import classNames from 'classnames'
import { AuthRenderContext } from '../../branches/Auth'
import { ReactComponent as BookSVG } from '../../assets/book-solid.svg'
import { ReactComponent as PlusSVG } from '../../assets/square-plus-regular.svg'
import { ReactComponent as UserSVG } from '../../assets/user-solid.svg'
import './styles.css'

const AuthFooter = () => {
    const [RENDERS, setRender, render] = useContext(AuthRenderContext)

    const navButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    }

    const className = 'AuthFooter'
    return (
        <div className={className} >
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[0]}
                )} onClick={(e) => navButtonClick(e, 0)}
            >
                <BookSVG className={`${className}_svgIcon`} />
                <p>Recipe Book</p>
            </button>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[1]}
                )} onClick={(e) => navButtonClick(e, 1)}
            >
                <PlusSVG className={`${className}_svgIcon`} />
                <p>New Recipe</p>
            </button>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[2]}
                )} onClick={(e) => navButtonClick(e, 2)}
            >
                <UserSVG className={`${className}_svgIcon`} />
                <p>Profile</p>
            </button>
        </div>
    )
}

export default AuthFooter