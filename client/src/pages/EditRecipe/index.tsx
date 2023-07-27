import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthFooter from "../../components/AuthFooter"
import Navbar from "../../components/Navbar"
import Recipe from '../../components/Recipe'
import RecipeList from "../../components/RecipeList"
import RecipeNavbar from '../../components/RecipeNavbar'
import { Recipe as RecipeInterface } from '../../utils/interfaces'
import EditRecipeForm from '../../components/EditRecipeForm'
import './styles.css'
import { UserLoggedInContext } from '../../App'

interface Props {
    recipeSelected: RecipeInterface | null,    
    setRecipeSelected: React.Dispatch<React.SetStateAction<RecipeInterface | null>>,
    editRecipeActive: boolean,
    setEditRecipeActive: React.Dispatch<React.SetStateAction<boolean>>
}

const EditRecipePage: React.FC<Props> = ({ recipeSelected, setRecipeSelected, editRecipeActive, setEditRecipeActive }) => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userLoggedIn) navigate('/')
        if (!recipeSelected) navigate('/recipebook')
        if (!editRecipeActive) navigate('recipe')
    }, [])

    const className = 'EditRecipePage'
    return (
        <div className={className}>
            <div className={`${className}_editRecipeContainer`}>
                <EditRecipeForm recipeSelected={recipeSelected} setRecipeSelected={setRecipeSelected} setEditRecipeActive={setEditRecipeActive} />
            </div>
        </div>
    )
}

export default EditRecipePage