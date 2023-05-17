import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditStepForm from '../components/EditStepForm'

const mockSetAction = jest.fn()
const mockSetItems = jest.fn()
const mockSetTime = jest.fn()
const mockSetDescription = jest.fn()
const mockSetIngredientName = jest.fn()
const mockSetIngredientAmount = jest.fn()
const mockSetRecipeIngredients = jest.fn()
const mockAction = 'Cook'
const mockItems = ['Onion']
const mockTime = '3 min.'
const mockDescription = 'test description'
const mockIngredientName = 'Onion'
const mockIngredientAmount = '1/4 units'
const mockRecipeIngredients = [{name: mockIngredientName, amount: mockIngredientAmount}]
const props =  {
    action: mockAction, setAction: mockSetAction,
    items: mockItems, setItems: mockSetItems,
    time: mockTime, setTime: mockSetTime,
    description: mockDescription, setDescription: mockSetDescription,
    ingredientName: mockIngredientName, setIngredientName: mockSetIngredientName,
    ingredientAmount: mockIngredientAmount, setIngredientAmount: mockSetIngredientAmount,
    recipeIngredients: mockRecipeIngredients, setRecipeIngredients: mockSetRecipeIngredients    
}

describe('EditStepForm', () => {
    it('should render header', () => {
        render(<EditStepForm {...props} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render action, ingredientName, ingredientAmount, description and time inputs', () => {
        render(<EditStepForm {...props} />)
        const actionInput = screen.getByDisplayValue(mockAction)
        const ingredientNameInput = screen.getByDisplayValue(mockIngredientName)
        const ingredientAmountInput = screen.getByDisplayValue(mockIngredientAmount)
        const descriptionInput = screen.getByDisplayValue(mockDescription)
        const timeInput = screen.getByDisplayValue(mockTime)
        expect(actionInput).toBeInTheDocument()
        expect(ingredientNameInput).toBeInTheDocument()
        expect(ingredientAmountInput).toBeInTheDocument()
        expect(descriptionInput).toBeInTheDocument()
        expect(timeInput).toBeInTheDocument()
    })
    it('should render summary ingredients text', () => {
        render(<EditStepForm {...props}/>)
        const itemElement = screen.getByText('Onion')
        expect(itemElement).toBeInTheDocument()
    })
    it('should render add Ingredient Button', () => {
        render(<EditStepForm {...props} />)
        const addButton = screen.getByRole('button', { name: 'Add' })
        expect(addButton).toBeInTheDocument()
    })
    it('should trigger 4 setState actions when user clicks add button', async () => {
        render(<EditStepForm {...props} />)
        const addButton = screen.getByRole('button', { name: 'Add' })
        await userEvent.click(addButton)
        expect(mockSetItems).toBeCalled()
        expect(mockSetRecipeIngredients).toBeCalled()
        expect(mockSetIngredientName).toBeCalled()
        expect(mockSetIngredientAmount).toBeCalled()
    })
    it('should render char limit text', () => {
        render(<EditStepForm {...props}/>)
        const charLimitElement = screen.getByText('/ 170', {exact: false})
        expect(charLimitElement).toBeInTheDocument()
    })
    it('should render recipe ingredient text', () => {
        render(<EditStepForm {...props}/>)
        const ingredientText = screen.getByText(`${mockIngredientName} - ${mockIngredientAmount}`)
        expect(ingredientText).toBeInTheDocument()
    })
})