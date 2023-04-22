import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditItemFooter from '../components/EditItemFooter'

const mockSetIngName = jest.fn()
const mockSetIngAmount = jest.fn()
const mockSetIngredients = jest.fn()
const mockSetEditIngredientActive = jest.fn()
const mockProps = {
    ingName: 'Test Name', setIngName: mockSetIngName, 
    ingAmount: 'Test Amount', setIngAmount: mockSetIngAmount,
    ingredients: [{name: 'Onion', amount: '1/4 units'}], setIngredients: mockSetIngredients, 
    selectedItem: {name: 'Onion', amount: '1/4 units'}, setEditIngredientActive: mockSetEditIngredientActive
}

describe('EditItemFooter', () => {
    it('should render Edit and Cancel buttons', () => {
        render(<EditItemFooter {...mockProps} />)
        const editButton = screen.getByRole('button', {name: 'Edit Step'})
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        expect(editButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should trigger 4 setState actions when user clicks edit button', () => {
        render(<EditItemFooter {...mockProps} />)
        const editButton = screen.getByRole('button', {name: 'Edit Step'})
        userEvent.click(editButton)
        expect(mockSetIngredients).toBeCalled()
        expect(mockSetIngName).toBeCalled()
        expect(mockSetIngAmount).toBeCalled()
        expect(mockSetEditIngredientActive).toBeCalled()
    })
    it('should trigger 3 setState actions when user clicks cancel button', () => {
        render(<EditItemFooter {...mockProps} />)
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        userEvent.click(cancelButton)
        expect(mockSetIngName).toBeCalled()
        expect(mockSetIngAmount).toBeCalled()
        expect(mockSetEditIngredientActive).toBeCalled()
    })
})