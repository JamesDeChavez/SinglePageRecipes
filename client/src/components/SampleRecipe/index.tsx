import { useRef, useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import cache from '../../utils/cache'
import RecipeActions from '../RecipeActions'
import { Ingredient } from '../../utils/interfaces'
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
            <VideoSection title={cache.User.recipes[0].title} videoId={cache.User.recipes[0].video.videoId} />
            <RecipeActions orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} />
            <div className={`${className}_main`}>
                {{
                    [RENDERS[0]]: <InstructionsSection instructions={cache.User.recipes[0].instructions} />,
                    [RENDERS[1]]: <IngredientsSection ingredients={cache.User.recipes[0].ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} />
                }[sectionVisible]}
            </div>
            <div className={`${className}_mainWide`}>
                <InstructionsSection instructions={cache.User.recipes[0].instructions} />
                <IngredientsSection ingredients={cache.User.recipes[0].ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} />
            </div>                 
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default SampleRecipe