import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import './styles.css'

const Hero = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext)

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRender(RENDERS[3])
    }

    const className = 'Hero'
    return (
        <div className={className}>
            <button onClick={handleButtonClick}>View Sample</button>
        </div>
    )
}

export default Hero