import SampleNavbar from "../../components/SampleNavbar"
import SampleRecipe from "../../components/SampleRecipe"
import './styles.css'

const SamplePage = () => {
    const className = 'SamplePage'
    return (
        <div className={className}>
            <SampleNavbar/>
            <SampleRecipe/>
        </div>
    )
}

export default SamplePage