import { useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import { Recipe as RecipeInterface } from '../../utils/interfaces'
import './styles.css'

interface Props {
    recipe: RecipeInterface
}

const Recipe: React.FC<Props> = ({ recipe }) => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])    
    const className = 'Recipe'
    return (
        <div className={className}>
            <VideoSection title={recipe.title} videoId={recipe.video.videoId} />
            <div className={`${className}_main`}>
                {{
                    [RENDERS[0]]: <InstructionsSection instructions={recipe.instructions} />,
                    [RENDERS[1]]: <IngredientsSection ingredients={recipe.ingredients} />
                }[sectionVisible]}
            </div>
            <div className={`${className}_mainWide`}>
                <InstructionsSection instructions={recipe.instructions} />
                <IngredientsSection ingredients={recipe.ingredients} />
            </div>
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default Recipe