import { useState, useContext, useRef, useLayoutEffect } from 'react'
import { client } from '../../index'
import { UserLoggedInContext } from '../../App'
import { RecipesFragment } from '../../graphql/fragments'
import { Recipe } from '../../utils/interfaces'
import RecipeOption from '../RecipeOption'
import gsap from 'gsap'
import './styles.css'

const RecipeList = () => {
    const { userId } = useContext(UserLoggedInContext)
    const { recipes } = client.readFragment({ id: `User:${userId}`, fragment: RecipesFragment })
    const [search, setSearch] = useState('')
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_searchContainer`, { x: 1000 }, { duration: 0.5, x: 0 })
            gsap.fromTo(`.${className}_recipesContainer`, { x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'RecipeList'
    return (
        <div className={className} ref={root} >
            <div className={`${className}_searchContainer`}>
                <p className={`${className}_searchText`}>Recipe Filter</p>
                <input className={`${className}_search`} type="text" name="search" id="search" value={search} autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={`${className}_recipesContainer`}>
                {recipes.length ?
                    recipes.filter((recipe: any) => recipe.title.toLowerCase().includes(search.toLowerCase())).map((recipe: Recipe, i: number) => {
                        return <RecipeOption key={i} recipe={recipe} />
                    })                
                : <p>No Recipes Created</p> }
            </div>
        </div>
    )
}

export default RecipeList