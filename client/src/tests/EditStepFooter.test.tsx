import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditStepFooter from '../components/EditStepFooter'
import sampleRecipe from '../utils/sampleRecipe'

const mockSetAction = jest.fn()
const mockSetItems = jest.fn()
const mockSetTime = jest.fn()
const mockSetDescription = jest.fn()
const mockSetRecipeIngredients = jest.fn()
const mockSetIngredientName = jest.fn()
const mockSetIngredientAmount = jest.fn()
const mockSetInstructions = jest.fn()
const mockSetEditStepActive = jest.fn()
const mockSetSelectedStep = jest.fn()
const mockProps = {
    action: 'COOK', setAction: mockSetAction,
    items: ['Onion'], setItems: mockSetItems,
    time: '3 min.', setTime: mockSetTime,
    description: 'Test Description', setDescription: mockSetDescription,
    recipeIngredients: [{name: 'Onion', amount: '1/4 units'}], setRecipeIngredients: mockSetRecipeIngredients,
    setIngredientName: mockSetIngredientName, setIngredientAmount: mockSetIngredientAmount,
    instructions: sampleRecipe.instructions, setInstructions: mockSetInstructions, 
    selectedStep: sampleRecipe.instructions[0], setSelectedStep: mockSetSelectedStep,
    setEditStepActive: mockSetEditStepActive 
}

describe('EditStepFooter', () => {
    it('should render Edit and Cancel buttons', () => {
        render(<EditStepFooter {...mockProps} />)
        const editButton = screen.getByRole('button', {name: 'Edit Step'})
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        expect(editButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should trigger 10 setState actions when the user clicks add button', async () => {
        render(<EditStepFooter {...mockProps} />)
        const editButton = screen.getByRole('button', {name: 'Edit Step'})
        await userEvent.click(editButton)
        expect(mockSetInstructions).toBeCalled()
        expect(mockSetSelectedStep).toBeCalled()
        expect(mockSetAction).toBeCalled()
        expect(mockSetItems).toBeCalled()
        expect(mockSetTime).toBeCalled()
        expect(mockSetDescription).toBeCalled()
        expect(mockSetRecipeIngredients).toBeCalled()
        expect(mockSetIngredientName).toBeCalled()
        expect(mockSetIngredientAmount).toBeCalled()
        expect(mockSetEditStepActive).toBeCalled()
    })
    it('should trigger 8 setState actions when the user clicks cancel button', async () => {
        render(<EditStepFooter {...mockProps} />)
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        await userEvent.click(cancelButton)
        expect(mockSetAction).toBeCalled()
        expect(mockSetItems).toBeCalled()
        expect(mockSetTime).toBeCalled()
        expect(mockSetDescription).toBeCalled()
        expect(mockSetRecipeIngredients).toBeCalled()
        expect(mockSetIngredientName).toBeCalled()
        expect(mockSetIngredientAmount).toBeCalled()
        expect(mockSetEditStepActive).toBeCalled()
    })
})