import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import RecipeFooter from '../components/RecipeFooter'

const mockSetSectionVisible = jest.fn()

describe('RecipeFooter', () => {
    it('should render instruction and ingredient buttons', () => {
        render(<RecipeFooter sectionVisible={'INSTRUCTIONS'} setSectionVisible={mockSetSectionVisible} />)
        const instructionsButton = screen.getByRole('button', {name: 'Instructions'})
        const ingredientsButton = screen.getByRole('button', {name: 'Ingredients'})
        expect(instructionsButton).toBeInTheDocument()
        expect(ingredientsButton).toBeInTheDocument()
    })
    it('should setSectionVisible when user clicks instructions button', () => {
        render(<RecipeFooter sectionVisible={'INSTRUCTIONS'} setSectionVisible={mockSetSectionVisible} />)
        const instructionsButton = screen.getByRole('button', {name: 'Instructions'})
        const ingredientsButton = screen.getByRole('button', {name: 'Ingredients'})
        userEvent.click(instructionsButton)
        userEvent.click(ingredientsButton)
        expect(mockSetSectionVisible).toBeCalledTimes(2)
    })
})