import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InstructionsTable from '../components/InstructionsTable'
import { Instruction } from '../utils/interfaces'
import { UserLoggedInContext } from '../App'

const mockSetDetailsActive = jest.fn()
const mockSetSelectedStep = jest.fn()
const mockhandleAddStepClick = jest.fn()
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
const mockProps = {
    setDetailsActive: mockSetDetailsActive,
    setSelectedStep: mockSetSelectedStep,
    instructions: mockInstructions,
    handleAddStepClick: mockhandleAddStepClick,
}

describe('InstructionsTable', () => {
    it('should render header', () => {
        render(<InstructionsTable {...mockProps} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render add step button', () => {
        render(<InstructionsTable {...mockProps} />)
        const addStepButton = screen.getByRole('button', {name: 'Add Step'})
        expect(addStepButton).toBeInTheDocument()
    })
    it('should handleAddStepClick when user clicks addStepButton', async () => {
        const mockContext ={
            userLoggedIn: false, setUserLoggedIn: () => {},
            userId: '', setUserId: () => {},
            windowSize: []
        }
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <InstructionsTable {...mockProps} />
            </UserLoggedInContext.Provider>
        )
        const addStepButton = screen.getByRole('button', {name: 'Add Step'})
        addStepButton.click()
        expect(mockhandleAddStepClick).toBeCalled()
    })    
    it('should render 2 page buttons', () => {
        render(<InstructionsTable {...mockProps} />)
        const nextButton = screen.getByRole('button', { name: 'Next' })
        const prevButton = screen.getByRole('button', { name: 'Prev' })
        expect(nextButton).toBeInTheDocument()
        expect(prevButton).toBeInTheDocument()
    })
    it('should render results text', () => {
        render(<InstructionsTable {...mockProps} />)
        const resultsText = screen.getByText('Total Steps', {exact: false})
        expect(resultsText).toBeInTheDocument()
    })
    
})