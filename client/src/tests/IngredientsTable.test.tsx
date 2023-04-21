import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import IngredientsTable from '../components/IngredientsTable'

const mockIngredients = [{name: 'Onion', amount: '1/4 units'}]
const mockHandleAddIngredient = jest.fn()
const mockSetIngName = jest.fn()
const mockSetIngAmount = jest.fn()
const mockSetEditIngredientActive = jest.fn()
const mockSetSelectedItem = jest.fn()
const mockProps = {
    ingredients: [], handleAddIngredient: mockHandleAddIngredient, 
    setIngName: mockSetIngName, setIngAmount: mockSetIngAmount, 
    setEditIngredientActive: mockSetEditIngredientActive, setSelectedItem: mockSetSelectedItem
}

describe('IngredientsTable', () => {
    it('should render header element', () => {
        render(<IngredientsTable {...mockProps} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render add ingredient button', () => {
        render(<IngredientsTable {...mockProps} />)
        const addButton = screen.getByRole('button', {name: 'Add Ingredient'})
        expect(addButton).toBeInTheDocument()
    })
    it('should handleAddIngredient when user clicks add button', () => {
        render(<IngredientsTable {...mockProps} />)
        const addButton = screen.getByRole('button', {name: 'Add Ingredient'})
        userEvent.click(addButton)
        expect(mockHandleAddIngredient).toBeCalled()
    })
    it('should render page buttons', () => {
        render(<IngredientsTable {...mockProps} />)
        const prevButton = screen.getByRole('button', {name: 'Prev'})
        const nextButton = screen.getByRole('button', {name: 'Next'})
        expect(prevButton).toBeInTheDocument()
        expect(nextButton).toBeInTheDocument()
    })
    it('should render total text', () => {
        render(<IngredientsTable {...mockProps} />)
        const totalTextElement = screen.getByText('Total Items', {exact: false})
        expect(totalTextElement).toBeInTheDocument()
    })
})