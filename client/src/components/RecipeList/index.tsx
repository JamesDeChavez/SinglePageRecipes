import { useState } from 'react'
import RecipeOption from '../RecipeOption'
import './styles.css'

const RecipeList = () => {
    const [search, setSearch] = useState('')

    const className = 'RecipeList'
    return (
        <div className={className}>
            <div className={`${className}_searchContainer`}>
                <p>Recipe Search</p>
                <input type="text" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={`${className}_recipesContainer`}>
                <RecipeOption/>
                <RecipeOption/>
                <RecipeOption/>
                <RecipeOption/>
                <RecipeOption/>
                <RecipeOption/>
            </div>
        </div>
    )
}

export default RecipeList