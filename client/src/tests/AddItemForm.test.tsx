import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddItemForm from '../components/AddItemForm'

const mockSetIngredientName = jest.fn()
const mockSetIngredientAmount = jest.fn()
const mockProps = {
    ingName: '', setIngName: mockSetIngredientName, 
    ingAmount: '', setIngAmount: mockSetIngredientAmount
}

describe('AddItemForm', () => {
    it('should render header', () => {
        render(<AddItemForm {...mockProps} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render ingredient name and ingredient amount inputs', () => {
        render(<AddItemForm {...mockProps} />)
        const nameInput = screen.getByPlaceholderText('Ingredient Name')
        const amountInput = screen.getByPlaceholderText('Amount')
        expect(nameInput).toBeInTheDocument()
        expect(amountInput).toBeInTheDocument()
    })
    it('should handle onChange when user types in inputs', () => {
        render(<AddItemForm {...mockProps} />)
        const nameInput = screen.getByPlaceholderText('Ingredient Name')
        const amountInput = screen.getByPlaceholderText('Amount')
        userEvent.type(nameInput, 'Test Name')
        userEvent.type(amountInput, 'Test Amount')
        waitFor(() => expect(nameInput).toHaveDisplayValue('Test Name'))
        waitFor(() => expect(amountInput).toHaveDisplayValue('Test Amount'))
    })
})