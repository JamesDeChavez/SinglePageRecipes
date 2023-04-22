import React, { useState } from 'react'
import AuthFooter from "../../components/AuthFooter"
import Navbar from "../../components/Navbar"
import Recipe from '../../components/Recipe'
import RecipeList from "../../components/RecipeList"
import RecipeNavbar from '../../components/RecipeNavbar'
import { Recipe as RecipeInterface } from '../../utils/interfaces'
import EditRecipeForm from '../../components/EditRecipeForm'
import './styles.css'

export const RecipeBookContext = React.createContext<{
    recipeSelected: RecipeInterface | undefined, setRecipeSelected: React.Dispatch<React.SetStateAction<RecipeInterface | undefined>>,
    editRecipeActive: boolean, setEditRecipeActive: React.Dispatch<React.SetStateAction<boolean>>
}>({
    recipeSelected: undefined, setRecipeSelected: () => {},
    editRecipeActive: false, setEditRecipeActive: () => {}
})

const RecipeBookPage = () => {
    const [recipeSelected, setRecipeSelected] = useState<RecipeInterface | undefined>()
    const [editRecipeActive, setEditRecipeActive] = useState(false)

    const className = 'RecipeBookPage'
    return (
    <RecipeBookContext.Provider value={{ recipeSelected, setRecipeSelected, editRecipeActive, setEditRecipeActive }}>
        <div className={className}>
            {recipeSelected && !editRecipeActive ?
                <div className={`${className}_recipeContainer`}>
                    <RecipeNavbar selectedRecipe={recipeSelected} />
                    <Recipe recipe={recipeSelected} />
                </div>
            
            : recipeSelected && editRecipeActive ?
                <div className={`${className}_editRecipeContainer`}>
                    <EditRecipeForm />
                </div>
            :
                <div className={`${className}_recipeListContainer`}>
                    <div className={`${className}_overlay`}></div>
                    <Navbar/>
                    <RecipeList/> {/*still need to test this*/}
                    <AuthFooter/>
                </div>
            }
        </div>
    </RecipeBookContext.Provider>
    )
}

export default RecipeBookPage