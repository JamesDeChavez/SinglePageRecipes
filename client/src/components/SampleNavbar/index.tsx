import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import { ReactComponent as BackSvg } from '../../assets/backward-step-solid.svg'
import './styles.css'
import { Recipe } from '../../utils/interfaces'

interface Props {
    setRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>
}

const SampleNavbar: React.FC<Props> = ({ setRecipeSelected }) => {
    const {RENDERS, setRender} = useContext(NonAuthRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    } 

    const className = 'SampleNavbar'
    return (
        <div className={className}>
            <button className={`${className}_return`} onClick={() => setRecipeSelected(null)}>
                <BackSvg className={`${className}_svg`} />
                {`Return to Recipe Book`}
            </button>
            <button className={`${className}_register`} onClick={(e) => handleClick(e, 2)}>Create an Account</button>
        </div>
    )
}

export default SampleNavbar