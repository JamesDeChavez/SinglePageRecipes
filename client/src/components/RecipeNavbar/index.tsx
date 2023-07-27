import { useContext, useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { UserLoggedInContext } from '../../App'
import { client } from '../..'
import { RecipesFragment } from '../../graphql/fragments'
import { DELETE_RECIPE } from "../../graphql/mutations"
import { useMutation } from '@apollo/client'
import { Recipe } from '../../utils/interfaces'
import './styles.css'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'

interface Props {
    recipeSelected: Recipe
    setRecipeSelected: React.Dispatch<React.SetStateAction<Recipe | null>>,
    setEditRecipeActive: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeNavbar: React.FC<Props> = ({ recipeSelected, setRecipeSelected, setEditRecipeActive }) => {
    const { userId } = useContext(UserLoggedInContext)
    const currentRecipes = client.readFragment({ id: `User:${userId}`, fragment: RecipesFragment })
    const [deleteRecipe, { loading }] = useMutation(DELETE_RECIPE)
    const [optionsVisible, setOptionsVisible] = useState(false)
    const root = useRef(null)
    const navigate = useNavigate()  

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_option`, { y: -500 }, { duration: 0.2, y: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [optionsVisible])

    const handleReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRecipeSelected(null)
        navigate('/recipebook')
    } 
    
    const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOptionsVisible(prevState => !prevState)
    }

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setEditRecipeActive(true)
        navigate('/editrecipe')
    }

    const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const updatedRecipesFormatted = currentRecipes.recipes.filter((recipe: any) => recipe.title !== recipeSelected.title).map((recipe: any) => {
            return {
                title: recipe.title,
                video: {
                    title: recipe.video.title,
                    thumbnail: recipe.video.thumbnail,
                    channel: recipe.video.channel,
                    videoId: recipe.video.videoId
                },
                instructions: recipe.instructions.map((step: any) => {
                    return {
                        summary: {
                            action: step.summary.action,
                            items: step.summary.items
                        },
                        time: step.time,
                        description: step.description,
                        ingredients: step.ingredients.map((item: any) => {
                            return {
                                name: item.name,
                                amount: item.amount
                            }
                        })
                    }
                }),
                ingredients: recipe.ingredients.map((ing: any) => {
                    return {
                        name: ing.name,
                        amount: ing.amount
                    }
                })
            }
        })
        try {
            const updatedRecipes = await deleteRecipe({ variables: { userId, recipes: updatedRecipesFormatted }})
            if (updatedRecipes) {
                setRecipeSelected(null)
                navigate('/recipebook')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const className = 'RecipeNavbar'
    return (
        <div className={className} ref={root} >
            <button className={`${className}_returnButton`} onClick={handleReturnClick}>
                {`< Return to Recipe Book`}
            </button>
            <button className={`${className}_optionButton`} onClick={handleOptionClick} >
                <p className={`${className}_text`}>Options</p>
                {optionsVisible ?
                    <p className={`${className}_x`} style={{ fontWeight: 'bold' }} >X</p>
                :
                    <svg className={`${className}_triangle`} viewBox="0 0 100 50" >
                        <polygon points='5,5 95,5 45,50'/>
                    </svg> 
                }
            </button>
            <div className={`${className}_optionsContainer`} style={{ display: optionsVisible ? 'grid' : 'none' }} >
                <button className={`${className}_option`} onClick={handleEditClick}>Edit Recipe</button>
                <button className={`${className}_option`} onClick={handleDeleteClick} >
                    <span style={{display: loading ? 'none' : 'block' }} >Delete Recipe</span>
                    <Loading loading={loading} />
                </button>
            </div>
        </div>
    )
}

export default RecipeNavbar