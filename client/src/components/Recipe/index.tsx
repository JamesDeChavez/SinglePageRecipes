import { useRef, useState } from 'react'
import InstructionsSection from '../InstructionsSection'
import RecipeFooter from '../RecipeFooter'
import VideoSection from '../VideoSection'
import IngredientsSection from '../IngredientsSection'
import { Ingredient, Recipe as RecipeInterface } from '../../utils/interfaces'
import RecipeActions from '../RecipeActions'
import './styles.css'
import classNames from 'classnames'

interface Props {
    recipe: RecipeInterface
}

const Recipe: React.FC<Props> = ({ recipe }) => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const VIEWS = ['DEFAULT', 'HIDE', 'LARGE']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])
    const [currentView, setCurrentView] = useState(VIEWS[0])
    const [orderActive, setOrderActive] = useState(false)
    const [shoppingList, setShoppingList] = useState<Ingredient[]>([])
    const root = useRef(null)

    const handleMinusClick = (e:  React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        switch (currentView) {
            case 'LARGE':
                setCurrentView(VIEWS[0])                
                break;
            case 'DEFAULT':
                setCurrentView(VIEWS[1])                
                break;
            default:
                return;
        }
    }

    const handlePlusClick = (e:  React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        switch (currentView) {
            case 'HIDE':
                setCurrentView(VIEWS[0])                
                break;
            case 'DEFAULT':
                setCurrentView(VIEWS[2])                
                break;
            default:
                return;
        }
    }

    const className = 'Recipe'
    return (
        <div className={classNames(
            className,
            {[`${className}_hideView`]: currentView === VIEWS[1]},
            {[`${className}_largeView`]: currentView === VIEWS[2]},
        )} ref={root} >
            <VideoSection title={recipe.title} videoId={recipe.video.videoId} handleMinusClick={handleMinusClick} handlePlusClick={handlePlusClick} currentView={currentView} />
            <RecipeActions orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} root={root} currentView={currentView} />
            <div className={`${className}_main`}>
                <InstructionsSection instructions={recipe.instructions} sectionVisible={sectionVisible} currentView={currentView} />
                <IngredientsSection ingredients={recipe.ingredients} orderActive={orderActive} setOrderActive={setOrderActive} shoppingList={shoppingList} setShoppingList={setShoppingList} sectionVisible={sectionVisible} currentView={currentView}/>
            </div>
            <RecipeFooter sectionVisible={sectionVisible} setSectionVisible={setSectionVisible} />
        </div>
    )
}

export default Recipe