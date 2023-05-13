import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CreateRecipeFormContext } from '../components/CreateRecipeForm'
import { useRef } from 'react'
import CreateRecipeActions from '../components/CreateRecipeActions'

const mockContext = {
    instructions: [], setInstructions: () => {},
    ingredients: [], setIngredients: () => {},
    ingName: '', setIngName: () => {},
    ingAmount: '', setIngAmount: () => {},
    addStepActive: false, setAddStepActive: () => {},
    editStepActive: false, setEditStepActive: () => {},
    addIngredientActive: false, setAddIngredientActive: () => {},
    editIngredientActive: false, setEditIngredientActive: () => {},
    action: '', setAction: () => {},
    items: [], setItems: () => {},
    time: '', setTime: () => {},
    description: '', setDescription: () => {},
    ingredientName: '', setIngredientName: () => {},
    ingredientAmount: '', setIngredientAmount: () => {},
    recipeIngredients: [], setRecipeIngredients: () => {},
    selectedStep: undefined, setSelectedStep: () => {},
    selectedItem: undefined, setSelectedItem: () => {}
}

const mockHandleCreateRecipe = jest.fn()
const { result } = renderHook(() => useRef(null))
const mockProps = {
    handleCreateRecipe: mockHandleCreateRecipe,
    root: result.current,
    loading: false
}

describe('CreateRecipeActions', () => {
    it('should render header', () => {
        render(
            <CreateRecipeFormContext.Provider value={mockContext} >
                <CreateRecipeActions {...mockProps} />
            </CreateRecipeFormContext.Provider>
        )
        const headerElement = screen.getByText('Recipe Actions')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render two add buttons', () => {
        render(
            <CreateRecipeFormContext.Provider value={mockContext} >
                <CreateRecipeActions {...mockProps} />
            </CreateRecipeFormContext.Provider>
        )
        const addButtonOne = screen.getByRole('button', { name: 'Add Ingredient'})
        const addButtonTwo = screen.getByRole('button', { name: 'Add Instruction'})
        expect(addButtonOne).toBeInTheDocument()
        expect(addButtonTwo).toBeInTheDocument()
    })
    it('should render create recipe button', () => {
        render(
            <CreateRecipeFormContext.Provider value={mockContext} >
                <CreateRecipeActions {...mockProps} />
            </CreateRecipeFormContext.Provider>
        )
        const createButton = screen.getByRole('button', { name: 'Create Recipe'})
        expect(createButton).toBeInTheDocument()
    })
    it('should render submit/cancel instruction buttons when addStepActive', () => {
        render(
            <CreateRecipeFormContext.Provider value={{...mockContext, addStepActive: true}} >
                <CreateRecipeActions {...mockProps}  />
            </CreateRecipeFormContext.Provider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit Instruction'})
        const cancelButton = screen.getByRole('button', { name: 'Cancel'})
        expect(submitButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should render submit/cancel ingredient buttons when addIngredientActive', () => {
        render(
            <CreateRecipeFormContext.Provider value={{...mockContext, addIngredientActive: true}} >
                <CreateRecipeActions {...mockProps}  />
            </CreateRecipeFormContext.Provider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit Ingredient'})
        const cancelButton = screen.getByRole('button', { name: 'Cancel'})
        expect(submitButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should render edit instruction button when editStepActive', () => {
        render(
            <CreateRecipeFormContext.Provider value={{...mockContext, editStepActive: true}} >
                <CreateRecipeActions {...mockProps}  />
            </CreateRecipeFormContext.Provider>
        )
        const editButton = screen.getByRole('button', { name: 'Edit Instruction'})
        expect(editButton).toBeInTheDocument()
    })
    it('should render edit/delete/cancel buttons when editIngredientActive', () => {
        render(
            <CreateRecipeFormContext.Provider value={{...mockContext, editIngredientActive: true}} >
                <CreateRecipeActions {...mockProps}  />
            </CreateRecipeFormContext.Provider>
        )
        const editButton = screen.getByRole('button', { name: 'Edit Ingredient'})
        const deleteButton = screen.getByRole('button', { name: 'Delete'})
        const cancelButton = screen.getByRole('button', { name: 'Cancel'})
        expect(editButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
})