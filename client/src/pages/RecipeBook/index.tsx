import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthFooter from "../../components/AuthFooter"
import Navbar from "../../components/Navbar"
import RecipeList from "../../components/RecipeList"
import { Recipe as RecipeInterface } from '../../utils/interfaces'
import { UserLoggedInContext } from '../../App'
import './styles.css'

interface Props {
    recipeSelected: RecipeInterface | null, 
    setRecipeSelected: React.Dispatch<React.SetStateAction<RecipeInterface | null>>
}

const RecipeBookPage: React.FC<Props> = ({ recipeSelected, setRecipeSelected }) => {
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLoggedIn) navigate('/')
        if (recipeSelected) navigate('/recipe')
    }, [userLoggedIn, recipeSelected, navigate])

    const className = 'RecipeBookPage'
    return (
        <div className={className}>            
            <div className={`${className}_recipeListContainer`}>
                <div className={`${className}_overlay`}></div>
                <Navbar/>
                <RecipeList setRecipeSelected={setRecipeSelected}/>
                <AuthFooter/>
            </div>
        </div>
    )
}

export default RecipeBookPage