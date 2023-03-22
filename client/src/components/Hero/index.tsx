import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import backgroundImage from '../../assets/background.jpg'
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
            <div className={`${className}_imageContainer`}>
                <img className={`${className}_image`} src={backgroundImage} alt="background image" />
            </div>
            <div className={`${className}_overlayContainer`}>
                <h1 className={`${className}_header`}>Single Page Recipes</h1>
                <div className={`${className}_textContainer`}>
                    <p className={`${className}_text`}>Easily Learn Youtube Recipes</p>
                    <p className={`${className}_text`}>Single-Page Recipes - No Scrolling</p>
                    <p className={`${className}_text`}>Simple Amazon Fresh Ordering</p>
                </div>
                <div className={`${className}_buttonContainer`}>
                    <button onClick={handleButtonClick} className={`${className}_button`}>View Sample Recipe</button>
                </div>
            </div>
        </div>
    )
}

export default Hero