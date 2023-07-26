import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Recipe } from '../../utils/interfaces'
import { ReactComponent as SearchSVG } from '../../assets/search-solid.svg'
import gsap from 'gsap'
import './styles.css'
import SampleRecipeOption from '../SampleRecipeOption'
import sampleRecipeBook from '../../utils/sampleRecipeBook'

interface Props {
    setRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>
}

const SampleRecipeList: React.FC<Props> = ({ setRecipeSelected }) => {
    const recipes = sampleRecipeBook
    const [recipesToRender, setRecipesToRender] = useState<Recipe[]>(recipes)
    const [search, setSearch] = useState('')
    const [proteinFilter, setProteinFilter] = useState('')
    const [vegetableFilter, setVegetableFilter] = useState('')
    const [carbFilter, setCarbFilter] = useState('')
    const root = useRef(null)

    useEffect(() => {
        let newRender = recipes.filter((recipe: any) => recipe.title.toLowerCase().includes(search.toLowerCase()))

        if (proteinFilter !== '') {
            newRender = newRender.filter((recipe: any) => {
                const ingredients = recipe.ingredients
                for (let i = 0; i < ingredients.length; i++) {
                    if (ingredients[i].name.toLowerCase().includes(proteinFilter.toLowerCase())) return true
                }
                return false
            })        
        }

        if (vegetableFilter !== '') {
            newRender = newRender.filter((recipe: any) => {
                const ingredients = recipe.ingredients
                for (let i = 0; i < ingredients.length; i++) {
                    if (ingredients[i].name.toLowerCase().includes(vegetableFilter.toLowerCase())) return true
                }
                return false
            })        
        }

        if (carbFilter !== '') {
            newRender = newRender.filter((recipe: any) => {
                const ingredients = recipe.ingredients
                for (let i = 0; i < ingredients.length; i++) {
                    if (ingredients[i].name.toLowerCase().includes(carbFilter.toLowerCase())) return true
                }
                return false
            })        
        }

        setRecipesToRender(newRender)
    }, [search, proteinFilter, vegetableFilter, carbFilter, recipes])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_recipesContainer`, { x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'SampleRecipeList'
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
                    <select name="protein" id="protein" className={`${className}_proteinSelect`} onChange={(e) => setProteinFilter(e.target.value)}>
                        <option className={`${className}_option`} value=""></option>
                        <option className={`${className}_option`} value="Chicken">Chicken</option>
                    </select>
                </div>
                <div className={`${className}_filterContainer`}>
                    <label htmlFor="vegetable" className={`${className}_filterText`}>Vegetable Filter</label>
                    <select name="vegetable" id="vegetable" className={`${className}_vegetableSelect`} onChange={(e) => setVegetableFilter(e.target.value)}>
                        <option className={`${className}_option`} value=""></option>
                        <option className={`${className}_option`} value="Broccoli">Broccoli</option>
                    </select>
                </div>
                <div className={`${className}_filterContainer`}>
                    <label htmlFor="carb" className={`${className}_filterText`}>Carb Filter</label>
                    <select name="carb" id="carb" className={`${className}_carbSelect`} onChange={(e) => setCarbFilter(e.target.value)}>
                        <option className={`${className}_option`} value=""></option>
                        <option className={`${className}_option`} value="Pasta">Pasta</option>
                    </select>
                </div>

            </div>
            <div className={`${className}_recipesContainer`}>
                {recipesToRender.length ?
                    recipesToRender.map((recipe: Recipe, i: number) => {
                        return <SampleRecipeOption key={i} recipe={recipe} setRecipeSelected={setRecipeSelected} />
                    })                
                : <p className={`${className}_text`}>No Recipes Created</p> }
            </div>
        </div>
    )
}

export default SampleRecipeList