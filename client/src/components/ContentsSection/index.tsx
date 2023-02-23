import { useContext } from 'react'
import image from '../../assets/icon.jpg'
import { AuthRenderContext } from '../../branches/Auth'
import './styles.css'

const ContentsSection = () => {
    const [RENDERS, setRender] = useContext(AuthRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    }

    const className = 'ContentsSection'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your Recipes</h1>
            <div className={`${className}_optionContainer`}>
                <img className={`${className}_image`} src={image} alt="icon" />
                <div className={`${className}_button`} onClick={(e) => handleClick(e, 1)}>Create New Recipe</div>
            </div>
            <div className={`${className}_optionContainer`}>
                <img className={`${className}_image`} src={image} alt="icon" />
                <div className={`${className}_button`} onClick={(e) => handleClick(e, 2)}>View Your Recipes</div>
            </div>
            <div className={`${className}_optionContainer`}>
                <img className={`${className}_image`} src={image} alt="icon" />
                <div className={`${className}_button`} onClick={(e) => handleClick(e, 3)}>View Ingredients</div>
            </div>
        </div>
    )
}

export default ContentsSection