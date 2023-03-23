import { useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import './styles.css'
import cache from '../../utils/cache'

const SampleRecipe = () => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const className = 'SampleRecipe'
    return (
        <div className={className}>
            <VideoSection title={cache.User.recipes[0].title} videoId={cache.User.recipes[0].video.videoId} />
            <div className={`${className}_main`}>
                {{
                    [RENDERS[0]]: <InstructionsSection instructions={cache.User.recipes[0].instructions} />,
                    [RENDERS[1]]: <IngredientsSection ingredients={cache.User.recipes[0].ingredients} />
                }[sectionVisible]}
            </div>
            <div className={`${className}_mainWide`}>
                <InstructionsSection instructions={cache.User.recipes[0].instructions} />
                <IngredientsSection ingredients={cache.User.recipes[0].ingredients} />
            </div>                 
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default SampleRecipe