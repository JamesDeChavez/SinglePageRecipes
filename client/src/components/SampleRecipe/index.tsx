import InstructionsSection from './InstructionsSection'
import RecipeFooter from './RecipeFooter'
import './styles.css'
import VideoSection from './VideoSection'

const SampleRecipe = () => {
    const className = 'SampleRecipe'
    return (
        <div className={className}>
            <VideoSection/>
            <InstructionsSection/>
            <RecipeFooter/>
        </div>
    )
}

export default SampleRecipe