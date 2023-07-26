import { useState } from "react"
import Navbar from "../../components/Navbar"
import SampleNavbar from "../../components/SampleNavbar"
import SampleRecipe from "../../components/SampleRecipe"
import './styles.css'
import { Recipe } from "../../utils/interfaces"
import SampleRecipeList from "../../components/SampleRecipeList"
import Footer from "../../components/Footer"

const SamplePage = () => {
    const [recipeSelected, setRecipeSelected] = useState<Recipe | null>(null)
    const className = 'SamplePage'
    return (
        <div className={className}>
            {recipeSelected ?
            <>
                <SampleNavbar setRecipeSelected={setRecipeSelected}/>
                <SampleRecipe/>
            </>
            :
            <>
                <div className={`${className}_sampleRecipeListContainer`}>
                    <div className={`${className}_overlay`}></div>
                    <Navbar/>
                    <SampleRecipeList setRecipeSelected={setRecipeSelected} />
                    <Footer />
                </div>
            </>
            }
        </div>
    )
}

export default SamplePage