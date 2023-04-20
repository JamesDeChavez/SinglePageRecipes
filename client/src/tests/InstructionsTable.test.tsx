import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import InstructionsTable from '../components/InstructionsTable'
import { Instruction } from '../utils/interfaces'

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


describe('InstructionsTable', () => {
    it('should render header', () => {
        render(<InstructionsTable setDetailsActive={mockSetDetailsActive} setSelectedStep={mockSetSelectedStep} instructions={mockInstructions} handleAddStepClick={mockhandleAddStepClick} />)
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render add step button', () => {
        render(<InstructionsTable setDetailsActive={mockSetDetailsActive} setSelectedStep={mockSetSelectedStep} instructions={mockInstructions} handleAddStepClick={mockhandleAddStepClick} />)
        const addStepButton = screen.getByRole('button', {name: 'Add Step'})
        expect(addStepButton).toBeInTheDocument()
    })
    it('should handleAddStepClick when user clicks addStepButton', () => {
        render(<InstructionsTable setDetailsActive={mockSetDetailsActive} setSelectedStep={mockSetSelectedStep} instructions={mockInstructions} handleAddStepClick={mockhandleAddStepClick} />)
        const addStepButton = screen.getByRole('button', {name: 'Add Step'})
        userEvent.click(addStepButton)
        expect(mockhandleAddStepClick).toBeCalled()
    })    
    it('should render 2 page buttons', () => {
        render(<InstructionsTable setDetailsActive={mockSetDetailsActive} setSelectedStep={mockSetSelectedStep} instructions={mockInstructions} handleAddStepClick={mockhandleAddStepClick} />)
        const nextButton = screen.getByRole('button', { name: 'Next' })
        const prevButton = screen.getByRole('button', { name: 'Prev' })
        expect(nextButton).toBeInTheDocument()
        expect(prevButton).toBeInTheDocument()
    })
    it('should render results text', () => {
        render(<InstructionsTable setDetailsActive={mockSetDetailsActive} setSelectedStep={mockSetSelectedStep} instructions={mockInstructions} handleAddStepClick={mockhandleAddStepClick} />)
        const resultsText = screen.getByText('Total Steps', {exact: false})
        expect(resultsText).toBeInTheDocument()
    })
    
})