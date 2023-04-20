import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import InstructionDetails from '../components/InstructionDetails'
import { Instruction } from '../utils/interfaces'

const mockSetInstructions = jest.fn()
const mockSetEditStepActive = jest.fn()
const mockSetAction = jest.fn()
const mockSetItems = jest.fn()
const mockSetTime = jest.fn()
const mockSetDescription = jest.fn()
const mockSetRecipeIngredients = jest.fn()
const mockSetDetailsActive = jest.fn()
const mockInstructions: Instruction[] = [{
    summary: {
        action: 'COOK',
        items: ['Onion']
    },
    time: '3 min.',
    description: 'Sauté 1/4 chopped onion in a sauce pan for 3 minutes or until translucent',
    ingredients: [
        { name: 'Onion', amount: '1/4 units' }
    ]
}]
const mockSelectedStep: Instruction = mockInstructions[0]
const props = {
    instructions: mockInstructions, setInstructions: mockSetInstructions, 
    selectedStep: mockSelectedStep, setEditStepActive: mockSetEditStepActive,
    setAction: mockSetAction, setItems: mockSetItems, 
    setTime: mockSetTime, setDescription: mockSetDescription,
    setRecipeIngredients: mockSetRecipeIngredients, setDetailsActive: mockSetDetailsActive
}

describe('InstructionDetails', () => {
    it('should render header', () => {
        render(<InstructionDetails {...props}  />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render summary, time, description and ingredients', () => {
        render(<InstructionDetails {...props}  />)
        const summaryElement = screen.getByText('COOK: Onion')
        const timeElement = screen.getByText('3 min.')
        const descriptionElement = screen.getByText('Sauté 1/4 chopped onion', { exact: false})
        const ingredientElement = screen.getByText('Onion - 1/4 units')
        expect(summaryElement).toBeInTheDocument()
        expect(timeElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(ingredientElement).toBeInTheDocument()
    })
    it('should render return to table button', () => {
        render(<InstructionDetails {...props}  />)
        const returnButton = screen.getByRole('button', {name: '< Return to table'})
        expect(returnButton).toBeInTheDocument()
    })
    it('should setDetailsActive when user clicks return to table button', () => {
        render(<InstructionDetails {...props}  />)
        const returnButton = screen.getByRole('button', {name: '< Return to table'})
        userEvent.click(returnButton)
        expect(mockSetDetailsActive).toBeCalled()
    })
    it('should render edit and delete buttons', () => {
        render(<InstructionDetails {...props}  />)
        const editButton = screen.getByRole('button', {name: 'Edit Step'})
        const deleteButton = screen.getByRole('button', {name: 'Delete Step'})
        expect(editButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument()
    })
    it('should trigger 6 setState actions when user clicks edit button', () => {
        render(<InstructionDetails {...props}  />)
        const editButton = screen.getByRole('button', {name: 'Edit Step'})
        userEvent.click(editButton)
        expect(mockSetAction).toBeCalled()
        expect(mockSetItems).toBeCalled()
        expect(mockSetDescription).toBeCalled()
        expect(mockSetTime).toBeCalled()
        expect(mockSetRecipeIngredients).toBeCalled()
        expect(mockSetEditStepActive).toBeCalled()
    })
    it('should setInstructions and setDetailsActive when user clicks delete button', () => {
        render(<InstructionDetails {...props}  />)
        const deleteButton = screen.getByRole('button', {name: 'Delete Step'})
        userEvent.click(deleteButton)
        expect(mockSetInstructions).toBeCalled()
        expect(mockSetDetailsActive).toBeCalled()
    })
})