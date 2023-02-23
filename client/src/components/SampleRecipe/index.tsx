import { useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import './styles.css'

const SampleRecipe = () => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const className = 'SampleRecipe'
    return (
        <div className={className}>
            <VideoSection/>
            {{
                [RENDERS[0]]: <InstructionsSection/>,
                [RENDERS[1]]: <IngredientsSection/>
            }[sectionVisible]}
            <RecipeFooter sectionVisible={setSectionVisible} />
        </div>
    )
}

export default SampleRecipe