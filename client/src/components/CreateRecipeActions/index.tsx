import gsap from 'gsap'
import { useContext, useLayoutEffect } from 'react'
import { CreateRecipeFormContext } from '../CreateRecipeForm'
import './styles.css'
import Loading from '../Loading'

interface Props {
    handleCreateRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>,
    root: React.MutableRefObject<null>,
    loading: boolean
}

const CreateRecipeActions: React.FC<Props> = ({ handleCreateRecipe, root, loading }) => {
    const { 
        ingName, setIngName, 
        ingAmount, setIngAmount,
        action, setAction,
        items, setItems,
        time, setTime,
        description, setDescription,
        setIngredientName, setIngredientAmount,
        recipeIngredients, setRecipeIngredients,
        addStepActive, setAddStepActive,
        editStepActive, setEditStepActive,
        addIngredientActive, setAddIngredientActive,
        editIngredientActive, setEditIngredientActive,
        ingredients, setIngredients, 
        instructions, setInstructions,
        selectedStep, setSelectedStep,
        selectedItem
    } = useContext(CreateRecipeFormContext)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}`, { x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [root])

    const handleStepActiveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddStepActive(prevState => !prevState)
    }

    const handleItemActiveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddIngredientActive(prevState => !prevState)
    }

    const handleCancelAddClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (addIngredientActive) {
            setIngName('')
            setIngAmount('')
            setAddIngredientActive(false)
        }
        else if (addStepActive) {
            setAction('')
            setItems([])
            setTime('')
            setDescription('')
            setRecipeIngredients([])
            setIngredientName('')
            setIngredientAmount('')
            setAddStepActive(false)
        }
    }

    const handleAddClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (addIngredientActive) {
            if (!ingName || !ingAmount  ) return
            const newItem = {
                name: ingName,
                amount: ingAmount
            }
            setIngredients(prevState => [...prevState, newItem])
            setIngName('')
            setIngAmount('')
            setAddIngredientActive(false)
        }
        else if (addStepActive) {
            if (!action || !items.length || !time || !description || !recipeIngredients.length ) return
            const newStep = {
                summary: { action: action, items: items },
                time: time,
                description: description,
                ingredients: recipeIngredients
            }
            setInstructions(prevState => [...prevState, newStep])
            setAction('')
            setItems([])
            setTime('')
            setDescription('')
            setRecipeIngredients([])
            setIngredientName('')
            setIngredientAmount('')
            setAddStepActive(false)
        }
    }

    const handleCancelEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (editStepActive) {
            setAction('')
            setItems([])
            setTime('')
            setDescription('')
            setRecipeIngredients([])
            setIngredientName('')
            setIngredientAmount('')
            setEditStepActive(false)

        } else {
            setIngName('')
            setIngAmount('')
            setEditIngredientActive(false)
        }
    }

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (editStepActive) {
            if (!action || !items.length || !time || !description || !recipeIngredients.length ) return
            const newStep = {
                summary: { action: action, items: items },
                time: time,
                description: description,
                ingredients: recipeIngredients
            }
            const indexToChange = instructions.findIndex(instruction => instruction.description === selectedStep?.description )
            console.log(instructions, indexToChange)
            const updatedInstructions = [...instructions]
            updatedInstructions[indexToChange] = newStep

            setInstructions(updatedInstructions)
            setSelectedStep(newStep)
            setAction('')
            setItems([])
            setTime('')
            setDescription('')
            setRecipeIngredients([])
            setIngredientName('')
            setIngredientAmount('')
            setEditStepActive(false)
        } else {
            if (!ingName || !ingAmount || !selectedItem ) return
            const newItem = {
                name: ingName,
                amount: ingAmount
            }
            const indexToChange = ingredients.findIndex(item => item.name === selectedItem.name)
            const updatedIngredients = [...ingredients]
            updatedIngredients[indexToChange] = newItem
            setIngredients(updatedIngredients)
            setIngName('')
            setIngAmount('')
            setEditIngredientActive(false)

        }
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!selectedItem) return
        const updatedIngredients = [...ingredients].filter(item => item.name !== selectedItem.name)
        setIngredients(updatedIngredients)
        setIngName('')
        setIngAmount('')
        setEditIngredientActive(false)
    }

    const className = 'CreateRecipeActions'
    return (
        <div className={className}>
            <div className={`${className}_textContainer`}>
                <h3 className={`${className}_header`}>Recipe Actions</h3>
            </div>
            <div className={`${className}_buttonsContainer`}>
                {addStepActive || addIngredientActive ?
                    <div className={`${className}_addButtonsContainer`}>
                        <button className={`${className}_addButton`} onClick={handleAddClick} >
                            {addStepActive ? 'Submit Instruction' : 'Submit Ingredient'}
                        </button>
                        <button className={`${className}_addButton`} onClick={handleCancelAddClick}>Cancel</button>
                    </div>
                : editStepActive || editIngredientActive ?
                    <div className={`${className}_addButtonsContainer`}>
                        <button className={`${className}_addButton`} onClick={handleEditClick} >
                            {editStepActive ? 'Edit Instruction' : 'Edit Ingredient'}
                        </button>
                        {editIngredientActive &&
                            <button className={`${className}_addButton`} onClick={handleDeleteClick}>Delete</button>
                        }
                        <button className={`${className}_addButton`} onClick={handleCancelEditClick}>Cancel</button>
                    </div>
                :
                <>
                    <div className={`${className}_addButtonsContainer`}>
                        <button className={`${className}_addButton`} onClick={handleStepActiveClick}>Add Instruction</button>
                        <button className={`${className}_addButton`} onClick={handleItemActiveClick}>Add Ingredient</button>
                    </div>
                    <div className={`${className}_createContainer`}>
                        <button className={`${className}_createButton`} onClick={handleCreateRecipe} style={{display: loading ? 'none' : 'block'}} >Create Recipe</button>
                        <Loading loading={loading} />
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default CreateRecipeActions