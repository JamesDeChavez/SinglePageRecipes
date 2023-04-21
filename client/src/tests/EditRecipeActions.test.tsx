import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditRecipeActions from '../components/EditRecipeActions'
import { EditRecipeFormContext } from '../components/EditRecipeForm'
import { useRef } from 'react'

const mockHandleUpdateRecipe = jest.fn()
const { result } = renderHook(() => useRef(null))
const mockProps = {
    handleUpdateRecipe: mockHandleUpdateRecipe,
    root: result.current,
    loading: false
}
const mockSetAddStepActive = jest.fn()
const mockSetAddIngredientActive = jest.fn()
const mockSetEditStepActive = jest.fn()
const mockValues = {
    instructions: [], setInstructions: () => {},
    ingredients: [], setIngredients: () => {},
    ingName: '', setIngName: () => {},
    ingAmount: '', setIngAmount: () => {},
    addStepActive: false, setAddStepActive: mockSetAddStepActive,
    editStepActive: false, setEditStepActive: mockSetEditStepActive,
    addIngredientActive: false, setAddIngredientActive: mockSetAddIngredientActive,
    editIngredientActive: false, setEditIngredientActive: () => {},
    action: 'test', setAction: () => {},
    items: ['test'], setItems: () => {},
    time: 'test', setTime: () => {},
    description: 'test', setDescription: () => {},
    ingredientName: '', setIngredientName: () => {},
    ingredientAmount: '', setIngredientAmount: () => {},
    recipeIngredients: [{name: 'test', amount: 'test'}], setRecipeIngredients: () => {},
    selectedStep: undefined, setSelectedStep: () => {},
    selectedItem: undefined, setSelectedItem: () => {}
}

describe('EditRecipeActions', () => {
    it('should render header', () => {
        render(
            <EditRecipeFormContext.Provider value={mockValues} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render add button', () => {
        render(
            <EditRecipeFormContext.Provider value={mockValues} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const addInstructionButton = screen.getByRole('button', { name: 'Add Instruction'})
        const addIngredientButton = screen.getByRole('button', { name: 'Add Ingredient'})
        expect(addInstructionButton).toBeInTheDocument()
        expect(addIngredientButton).toBeInTheDocument()
    })
    it('should handleAddClick when user click add buttons', () => {
        render(
            <EditRecipeFormContext.Provider value={mockValues} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const addInstructionButton = screen.getByRole('button', { name: 'Add Instruction'})
        const addIngredientButton = screen.getByRole('button', { name: 'Add Ingredient'})
        userEvent.click(addInstructionButton)
        userEvent.click(addIngredientButton)
        expect(mockSetAddIngredientActive).toBeCalled()
        expect(mockSetAddStepActive).toBeCalled()
    })
    it('should render update button', () => {
        render(
            <EditRecipeFormContext.Provider value={mockValues} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const updateButton = screen.getByRole('button', { name: 'Update Recipe'})
        expect(updateButton).toBeInTheDocument()
    })
    it('should handleUpdateRecipe when user clicks update button', () => {
        render(
            <EditRecipeFormContext.Provider value={mockValues} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const updateButton = screen.getByRole('button', { name: 'Update Recipe'})
        userEvent.click(updateButton)
        expect(mockHandleUpdateRecipe).toBeCalled()
    })
    it('should render addStep and cancelAddStep button', () => {
        render(
            <EditRecipeFormContext.Provider value={{...mockValues, addStepActive: true}} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const addStepButton = screen.getByRole('button', { name: 'Submit Instruction'})
        const cancelStepButton = screen.getByRole('button', { name: 'Cancel'})
        expect(addStepButton).toBeInTheDocument()
        expect(cancelStepButton).toBeInTheDocument()
    })
    it('should handleAddStep click when user click add step button', () => {
        render(
            <EditRecipeFormContext.Provider value={{...mockValues, addStepActive: true}} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const addStepButton = screen.getByRole('button', { name: 'Submit Instruction'})
        userEvent.click(addStepButton)
        expect(mockSetAddStepActive).toBeCalled()
        
    })
    it('should render editStep and cancelEditStep button', () => {
        render(
            <EditRecipeFormContext.Provider value={{...mockValues, editStepActive: true}} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const editStepButton = screen.getByRole('button', { name: 'Edit Instruction'})
        const cancelStepButton = screen.getByRole('button', { name: 'Cancel'})
        expect(editStepButton).toBeInTheDocument()
        expect(cancelStepButton).toBeInTheDocument()
    })
    it('should handleEditStep click if user click edit step button', () => {
        render(
            <EditRecipeFormContext.Provider value={{...mockValues, editStepActive: true}} >
                <EditRecipeActions {...mockProps} />
            </EditRecipeFormContext.Provider>
        )
        const editStepButton = screen.getByRole('button', { name: 'Edit Instruction'})
        userEvent.click(editStepButton)
        expect(mockSetEditStepActive).toBeCalled()
    })
})