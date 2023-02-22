import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import './styles.css'

const Navbar = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    }

    const className = 'Navbar'
    return (
        <div className={className}>
            <div className={`${className}_logo`} onClick={(e) => handleClick(e, 0)}>LOGO</div>
            <div className={`${className}_buttonsContainer`}>
                <div className={`${className}_button`} onClick={(e) => handleClick(e, 1)}>Login</div>
                <div className={`${className}_button`} onClick={(e) => handleClick(e, 2)}>Register</div>
            </div>
        </div>
    )
}

export default Navbar