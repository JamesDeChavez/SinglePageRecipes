import { useRef, useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import { Ingredient, Recipe as RecipeInterface } from '../../utils/interfaces'
import RecipeActions from '../RecipeActions'
import './styles.css'

interface Props {
    recipe: RecipeInterface
}

const Recipe: React.FC<Props> = ({ recipe }) => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const [orderActive, setOrderActive] = useState(false)
    const [shoppingList, setShoppingList] = useState<Ingredient[]>([])
    const root = useRef(null)

    const handleMinusClick = (e:  React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
    }

    const handlePlusClick = (e:  React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
    }

    const className = 'Recipe'
    return (
        <div className={className} ref={root} >
            <VideoSection title={recipe.title} videoId={recipe.video.videoId} handleMinusClick={handleMinusClick} handlePlusClick={handlePlusClick} currentView='DEFAULT' />
            <RecipeActions orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} currentView='DEFAULT' />
            <div className={`${className}_main`}>
                <InstructionsSection instructions={recipe.instructions} sectionVisible={sectionVisible} currentView='DEFAULT' />
                <IngredientsSection ingredients={recipe.ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} sectionVisible={sectionVisible} currentView='DEFAULT'/>
            </div>
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default Recipe