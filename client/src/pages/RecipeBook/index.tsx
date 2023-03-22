import React, { useState } from 'react'
import AuthFooter from "../../components/AuthFooter"
import Navbar from "../../components/Navbar"
import Recipe from '../../components/Recipe'
import RecipeList from "../../components/RecipeList"
import RecipeNavbar from '../../components/RecipeNavbar'
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
                <RecipeNavbar/>
                <Recipe recipe={recipeSelected} />
            </div>
            :
            <div className={`${className}_recipeListContainer`}>
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