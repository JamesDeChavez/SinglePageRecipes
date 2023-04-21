import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditItemForm from '../components/EditItemForm'

const mockSetIngredientName = jest.fn()
const mockSetIngredientAmount = jest.fn()
const mockProps = {
    ingName: '', setIngName: mockSetIngredientName, 
    ingAmount: '', setIngAmount: mockSetIngredientAmount
}

describe('EditItemForm', () => {
    it('should render header', () => {
        render(<EditItemForm {...mockProps} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render ingredient name and ingredient amount inputs', () => {
        render(<EditItemForm {...mockProps} />)
        const nameInput = screen.getByPlaceholderText('Ingredient Name')
        const amountInput = screen.getByPlaceholderText('Amount')
        expect(nameInput).toBeInTheDocument()
        expect(amountInput).toBeInTheDocument()
    })
    it('should handle onChange when user types in inputs', () => {
        render(<EditItemForm {...mockProps} />)
        const nameInput = screen.getByPlaceholderText('Ingredient Name')
        const amountInput = screen.getByPlaceholderText('Amount')
        userEvent.type(nameInput, 'Test Name')
        userEvent.type(amountInput, 'Test Amount')
        waitFor(() => expect(nameInput).toHaveDisplayValue('Test Name'))
        waitFor(() => expect(amountInput).toHaveDisplayValue('Test Amount'))
    })
})