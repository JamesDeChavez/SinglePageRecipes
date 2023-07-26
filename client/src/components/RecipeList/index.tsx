import { useState, useContext, useRef, useLayoutEffect } from 'react'
import { client } from '../../index'
import { UserLoggedInContext } from '../../App'
import { RecipesFragment } from '../../graphql/fragments'
import { Recipe } from '../../utils/interfaces'
import { ReactComponent as SearchSVG } from '../../assets/search-solid.svg'
import RecipeOption from '../RecipeOption'
import gsap from 'gsap'
import './styles.css'

const RecipeList = () => {
    const { userId } = useContext(UserLoggedInContext)
    const { recipes } = client.readFragment({ id: `User:${userId}`, fragment: RecipesFragment }) ?? { recipes: [] }
    const [search, setSearch] = useState('')
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_recipesContainer`, { x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'RecipeList'
    return (
        <div className={className} ref={root} >
            <div className={`${className}_searchContainer`}>
                <p className={`${className}_searchText`}>Search Recipes</p>
                <input className={`${className}_search`} type="text" name="search" id="search" value={search} autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
                <button className={`${className}_searchButton`}>
                    <SearchSVG className={`${className}_searchIcon`} />
                </button>
            </div>
            <div className={`${className}_filtersSidebar`}>
                <div className={`${className}_filterContainer`}>
                    <label htmlFor="protein" className={`${className}_filterText`}>Protein Filter</label>
                    <select name="protein" id="protein" className={`${className}_proteinSelect`}>
                        <option className={`${className}_option`} value="null"></option>
                        <option className={`${className}_option`} value="Chicken">Chicken</option>
                    </select>
                </div>
                <div className={`${className}_filterContainer`}>
                    <label htmlFor="vegetable" className={`${className}_filterText`}>Vegetable Filter</label>
                    <select name="vegetable" id="vegetable" className={`${className}_vegetableSelect`}>
                        <option className={`${className}_option`} value="null"></option>
                        <option className={`${className}_option`} value="Broccoli">Broccoli</option>
                    </select>
                </div>
                <div className={`${className}_filterContainer`}>
                    <label htmlFor="carb" className={`${className}_filterText`}>Carb Filter</label>
                    <select name="carb" id="carb" className={`${className}_carbSelect`}>
                        <option className={`${className}_option`} value="null"></option>
                        <option className={`${className}_option`} value="Pasta">Pasta</option>
                    </select>
                </div>

            </div>
            <div className={`${className}_recipesContainer`}>
                {recipes.length ?
                    recipes.filter((recipe: any) => recipe.title.toLowerCase().includes(search.toLowerCase())).map((recipe: Recipe, i: number) => {
                        return <RecipeOption key={i} recipe={recipe} />
                    })                
                : <p className={`${className}_text`}>No Recipes Created</p> }
            </div>
        </div>
    )
}

export default RecipeList