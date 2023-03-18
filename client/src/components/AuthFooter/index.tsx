import classNames from 'classnames'
import { useContext } from 'react'
import { AuthRenderContext } from '../../branches/Auth'
import './styles.css'

const AuthFooter = () => {
    const [RENDERS, setRender, render] = useContext(AuthRenderContext)

    const navButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    }

    const className = 'AuthFooter'
    return (
        <div className={className}>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[0]}
                )} onClick={(e) => navButtonClick(e, 0)}
            >
                <div>[ ]</div>
                <p>Recipe Book</p>
            </button>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[1]}
                )} onClick={(e) => navButtonClick(e, 1)}
            >
                <div>[ ]</div>
                <p>New Recipe</p>
            </button>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[2]}
                )} onClick={(e) => navButtonClick(e, 2)}
            >
                <div>[ ]</div>
                <p>Profile</p>
            </button>
        </div>
    )
}

export default AuthFooter