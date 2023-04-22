import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddStepFooter from '../components/AddStepFooter'

const mockSetAction = jest.fn()
const mockSetItems = jest.fn()
const mockSetTime = jest.fn()
const mockSetDescription = jest.fn()
const mockSetRecipeIngredients = jest.fn()
const mockSetIngredientName = jest.fn()
const mockSetIngredientAmount = jest.fn()
const mockSetInstructions = jest.fn()
const mockSetAddStepActive = jest.fn()
const mockProps = {
    action: 'COOK', setAction: mockSetAction,
    items: ['Onion'], setItems: mockSetItems,
    time: '3 min.', setTime: mockSetTime,
    description: 'Test Description', setDescription: mockSetDescription,
    recipeIngredients: [{name: 'Onion', amount: '1/4 units'}], setRecipeIngredients: mockSetRecipeIngredients,
    setIngredientName: mockSetIngredientName, setIngredientAmount: mockSetIngredientAmount,
    setInstructions: mockSetInstructions, setAddStepActive: mockSetAddStepActive 
}

describe('AddStepFooter', () => {
    it('should render Add and Cancel buttons', () => {
        render(<AddStepFooter {...mockProps} />)
        const addButton = screen.getByRole('button', {name: 'Add Step'})
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        expect(addButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should trigger 9 setState actions when the user clicks add button', () => {
        render(<AddStepFooter {...mockProps} />)
        const addButton = screen.getByRole('button', {name: 'Add Step'})
        userEvent.click(addButton)
        expect(mockSetInstructions).toBeCalled()
        expect(mockSetAction).toBeCalled()
        expect(mockSetItems).toBeCalled()
        expect(mockSetTime).toBeCalled()
        expect(mockSetDescription).toBeCalled()
        expect(mockSetRecipeIngredients).toBeCalled()
        expect(mockSetIngredientName).toBeCalled()
        expect(mockSetIngredientAmount).toBeCalled()
        expect(mockSetAddStepActive).toBeCalled()
    })
    it('should trigger 8 setState actions when the user clicks cancel button', () => {
        render(<AddStepFooter {...mockProps} />)
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        userEvent.click(cancelButton)
        expect(mockSetAction).toBeCalled()
        expect(mockSetItems).toBeCalled()
        expect(mockSetTime).toBeCalled()
        expect(mockSetDescription).toBeCalled()
        expect(mockSetRecipeIngredients).toBeCalled()
        expect(mockSetIngredientName).toBeCalled()
        expect(mockSetIngredientAmount).toBeCalled()
        expect(mockSetAddStepActive).toBeCalled()
    })
})