import Navbar from "../../components/Navbar"
import SampleRecipe from "../../components/SampleRecipe"
import './styles.css'

const SamplePage = () => {
    const className = 'SamplePage'
    return (
        <div className={className}>
            <Navbar/>
            <SampleRecipe/>
        </div>
    )
}

export default SamplePage