import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import './styles.css'

const SampleNavbar = () => {
    const {RENDERS, setRender} = useContext(NonAuthRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    } 

    const className = 'SampleNavbar'
    return (
        <div className={className}>
            <button className={`${className}_return`} onClick={(e) => handleClick(e, 0)}>{`< Return Home`}</button>
            <button className={`${className}_register`} onClick={(e) => handleClick(e, 2)}>Create an Account</button>
        </div>
    )
}

export default SampleNavbar