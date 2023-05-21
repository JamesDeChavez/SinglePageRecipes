import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import IngredientsTable from '../components/IngredientsTable'

const mockProps = {
    ingredients: [], 
    handleAddIngredient: jest.fn(), 
    setIngName: jest.fn(), 
    setIngAmount: jest.fn(), 
    setEditIngredientActive: jest.fn(), 
    setSelectedItem: jest.fn(),
    orderActive: false,
    shoppingList: [], setShoppingList: jest.fn()
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
        addButton.click()
        expect(mockProps.handleAddIngredient).toBeCalled()
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