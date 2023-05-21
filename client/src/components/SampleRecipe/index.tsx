import { useRef, useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import RecipeActions from '../RecipeActions'
import { Ingredient } from '../../utils/interfaces'
import sampleRecipe from '../../utils/sampleRecipe'
import './styles.css'
import classNames from 'classnames'

const SampleRecipe = () => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const VIEWS = ['DEFAULT', 'MINI', 'HIDE']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const [currentView, setCurrentView] = useState(VIEWS[0])
    const [orderActive, setOrderActive] = useState(false)
    const [shoppingList, setShoppingList] = useState<Ingredient[]>([])
    const root = useRef(null)

    const handleMinimizeClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        setCurrentView(VIEWS[1])
    }

    const handleHideClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        console.log('test2')
    }

    const className = 'SampleRecipe'
    return (
        <div className={classNames(
            className,
            {[`${className}_miniView`]:  currentView === VIEWS[1]}
        )} 
            ref={root} 
        >
            <VideoSection title={sampleRecipe.title} videoId={sampleRecipe.video.videoId} handleMinimizeClick={handleMinimizeClick} handleHideClick={handleHideClick} />
            <RecipeActions orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} />
            <div className={`${className}_main`}>
                <InstructionsSection instructions={sampleRecipe.instructions} sectionVisible={sectionVisible} />
                <IngredientsSection ingredients={sampleRecipe.ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} sectionVisible={sectionVisible} />
            </div>
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default SampleRecipe