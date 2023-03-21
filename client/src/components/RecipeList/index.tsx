import { useState, useContext } from 'react'
import { client } from '../..'
import { UserLoggedInContext } from '../../App'
import { RecipesFragment } from '../../graphql/fragments'
import { Recipe } from '../../utils/interfaces'
import RecipeOption from '../RecipeOption'
import './styles.css'

const RecipeList = () => {
    const { userId } = useContext(UserLoggedInContext)
    const recipes = client.readFragment({ id: `User:${userId}`, fragment: RecipesFragment })

    const [search, setSearch] = useState('')

    const className = 'RecipeList'
    return (
        <div className={className}>
            <div className={`${className}_searchContainer`}>
                <p>Recipe Search</p>
                <input type="text" name="search" id="search" value={search} autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={`${className}_recipesContainer`}>
                {recipes.length ?
                    recipes.map((recipe: Recipe, i: number) => {
                        return <RecipeOption key={i} recipe={recipe} />
                    })
                
                :
                    <p>No Recipes Created</p>
                }
            </div>
        </div>
    )
}

export default RecipeList