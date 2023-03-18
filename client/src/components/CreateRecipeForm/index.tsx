import { useState } from "react"
import CreateRecipeIngredients from "../CreateRecipeIngredients"
import CreateRecipeInstructions from "../CreateRecipeInstructions"
import CreateRecipeNavbar from "../CreateRecipeNavbar"
import CreateRecipeVideoSection from "../CreateRecipeVideoSection"
import RecipeFooter from "../RecipeFooter"
import './styles.css'

const CreateRecipeForm = () => {
    const RENDERS = ['INSTRUCTIONS', 'INGREDIENTS']
    const [sectionVisible, setSectionVisible] = useState(RENDERS[0])

    const className = 'CreateRecipeForm'
    return (
        <div className={className}>
            <CreateRecipeNavbar />

            <div className={`${className}_main`}>
                <CreateRecipeVideoSection/>
                {{
                    [RENDERS[0]]: <CreateRecipeInstructions/>,
                    [RENDERS[1]]: <CreateRecipeIngredients/>
                }[sectionVisible]}
                
                
            </div>
            <RecipeFooter setSectionVisible={setSectionVisible} /> 
        </div>
    )
}

export default CreateRecipeForm