import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddStepForm from '../components/AddStepForm'

const mockSetAction = jest.fn()
const mockSetItems = jest.fn()
const mockSetTime = jest.fn()
const mockSetDescription = jest.fn()
const mockSetIngredientName = jest.fn()
const mockSetIngredientAmount = jest.fn()
const mockSetRecipeIngredients = jest.fn()
const mockProps = {
    action: '', setAction: mockSetAction,
    items: [], setItems: mockSetItems,
    time: '', setTime: mockSetTime,
    description: '', setDescription: mockSetDescription,
    ingredientName: '', setIngredientName: mockSetIngredientName,
    ingredientAmount: '', setIngredientAmount: mockSetIngredientAmount,
    recipeIngredients: [], setRecipeIngredients: mockSetRecipeIngredients
}

describe('EditRecipeInstructions', () => {
    it('should render header', () => {
        render(<AddStepForm {...mockProps} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render action input', () => {
        render(<AddStepForm {...mockProps} />)
        const actionInput = screen.getByPlaceholderText('Action')
        expect(actionInput).toBeInTheDocument()
    })
    it('should render no ingredients text', () => {
        render(<AddStepForm {...mockProps} />)
        const noIngredientsElements = screen.getAllByText('[No Ingredients Added]')
        expect(noIngredientsElements).toHaveLength(2)
    })
    it('should render ingredientName and ingredientAmount inputs', () => {
        render(<AddStepForm {...mockProps} />)
        const ingNameInput = screen.getByPlaceholderText('Ingredient Name')
        const ingAmountInput = screen.getByPlaceholderText('Amount')
        expect(ingNameInput).toBeInTheDocument()
        expect(ingAmountInput).toBeInTheDocument()
    })
    it('should handle onChange for ingredients when the user clicks', () => {
        render(<AddStepForm {...mockProps} />)
        const ingNameInput = screen.getByPlaceholderText('Ingredient Name')
        const ingAmountInput = screen.getByPlaceholderText('Amount')
        userEvent.type(ingNameInput, 'Test Name')
        userEvent.type(ingAmountInput, 'Test Amount')
        waitFor(() => expect(ingNameInput).toHaveDisplayValue('Test Name'))
        waitFor(() => expect(ingAmountInput).toHaveDisplayValue('Amount'))
    })
    it('should render add ingredient button', () => {
        render(<AddStepForm {...mockProps} />)
        const addIngredientButton = screen.getByRole('button', {name: 'Add'})
        expect(addIngredientButton).toBeInTheDocument()
    })
    it('should display ingredients text when user adds new ingredient', () => {
        render(<AddStepForm {...mockProps} />)
        const ingNameInput = screen.getByPlaceholderText('Ingredient Name')
        const ingAmountInput = screen.getByPlaceholderText('Amount')
        const addIngredientButton = screen.getByRole('button', {name: 'Add'})
        userEvent.type(ingNameInput, 'Test Name')
        userEvent.type(ingAmountInput, 'Test Amount')
        userEvent.click(addIngredientButton)
        const itemTextElement = screen.findByText('Test Name')
        const ingredientTextElement = screen.findByText('Test Name - Test Amount')
        waitFor(() => expect(itemTextElement).toBeInTheDocument())
        waitFor(() => expect(ingredientTextElement).toBeInTheDocument())
    })
    it('should render description textarea and char limit text', () => {
        render(<AddStepForm {...mockProps} />)
        const desciptionInput = screen.getByPlaceholderText('Description')
        const charLimitText = screen.getByText('0 / 170')
        expect(desciptionInput).toBeInTheDocument()
        expect(charLimitText).toBeInTheDocument()
    })
    it('should render time input', () => {
        render(<AddStepForm {...mockProps} />)
        const timeInput = screen.getByPlaceholderText('Time')
        expect(timeInput).toBeInTheDocument()
    })
})