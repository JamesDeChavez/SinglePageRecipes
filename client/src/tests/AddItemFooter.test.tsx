import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddItemFooter from '../components/AddItemFooter'

const mockSetIngName = jest.fn()
const mockSetIngAmount = jest.fn()
const mockSetIngredients = jest.fn()
const mockSetAddIngredientActive = jest.fn()
const mockProps = {
    ingName: 'Test Name', setIngName: mockSetIngName, 
    ingAmount: 'Test Amount', setIngAmount: mockSetIngAmount,
    setIngredients: mockSetIngredients, setAddIngredientActive: mockSetAddIngredientActive
}

describe('AddItemFooter', () => {
    it('should render Add and Cancel buttons', () => {
        render(<AddItemFooter {...mockProps} />)
        const addButton = screen.getByRole('button', {name: 'Add Step'})
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        expect(addButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should trigger 4 setState actions when user clicks add button', async () => {
        render(<AddItemFooter {...mockProps} />)
        const addButton = screen.getByRole('button', {name: 'Add Step'})
        await userEvent.click(addButton)
        expect(mockSetIngredients).toBeCalled()
        expect(mockSetIngName).toBeCalled()
        expect(mockSetIngAmount).toBeCalled()
        expect(mockSetAddIngredientActive).toBeCalled()
    })
    it('should trigger 3 setState actions when user clicks cancel button', async () => {
        render(<AddItemFooter {...mockProps} />)
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        await userEvent.click(cancelButton)
        expect(mockSetIngName).toBeCalled()
        expect(mockSetIngAmount).toBeCalled()
        expect(mockSetAddIngredientActive).toBeCalled()
    })
})