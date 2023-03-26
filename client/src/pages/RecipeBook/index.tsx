import React, { useState } from 'react'
import AuthFooter from "../../components/AuthFooter"
import Navbar from "../../components/Navbar"
import Recipe from '../../components/Recipe'
import RecipeList from "../../components/RecipeList"
import RecipeNavbar from '../../components/RecipeNavbar'
import backgroundImage from '../../assets/background.jpg'
import { Recipe as RecipeInterface } from '../../utils/interfaces'
import './styles.css'

export const RecipeBookContext = React.createContext<{
    recipeSelected: RecipeInterface | undefined,
    setRecipeSelected: React.Dispatch<React.SetStateAction<RecipeInterface | undefined>>
}>({
    recipeSelected: undefined,
    setRecipeSelected: () => {}
})

const RecipeBookPage = () => {
    const [recipeSelected, setRecipeSelected] = useState<RecipeInterface | undefined>()

    const className = 'RecipeBookPage'
    return (
    <RecipeBookContext.Provider value={{ recipeSelected, setRecipeSelected }}>
        <div className={className}>
            {recipeSelected ?
                <div className={`${className}_recipeContainer`}>
                    <RecipeNavbar selectedRecipe={recipeSelected} />
                    <Recipe recipe={recipeSelected} />
                </div>
            :
                <div className={`${className}_recipeListContainer`}>        
                    <div className={`${className}_imageContainer`}>
                        <img className={`${className}_image`} src={backgroundImage} alt="background" />
                    </div>
                    <Navbar/>
                    <RecipeList/>
                    <AuthFooter/>
                </div>
            }
        </div>
    </RecipeBookContext.Provider>
    )
}

export default RecipeBookPage