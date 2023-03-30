import { useRef, useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import RecipeActions from '../RecipeActions'
import { Ingredient } from '../../utils/interfaces'
import sampleRecipe from '../../utils/sampleRecipe'
import './styles.css'

const SampleRecipe = () => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const [orderActive, setOrderActive] = useState(false)
    const [shoppingList, setShoppingList] = useState<Ingredient[]>([])
    const root = useRef(null)

    const className = 'SampleRecipe'
    return (
        <div className={className} ref={root} >
            <VideoSection title={sampleRecipe.title} videoId={sampleRecipe.video.videoId} />
            <RecipeActions orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} />
            <div className={`${className}_main`}>
                {{
                    [RENDERS[0]]: <InstructionsSection instructions={sampleRecipe.instructions} />,
                    [RENDERS[1]]: <IngredientsSection ingredients={sampleRecipe.ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} />
                }[sectionVisible]}
            </div>
            <div className={`${className}_mainWide`}>
                <InstructionsSection instructions={sampleRecipe.instructions} />
                <IngredientsSection ingredients={sampleRecipe.ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} />
            </div>                 
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default SampleRecipe