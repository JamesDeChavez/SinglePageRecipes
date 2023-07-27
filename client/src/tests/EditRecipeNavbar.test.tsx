import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditRecipeNavbar from '../components/EditRecipeNavbar'

const mockHandleUpdateRecipe = jest.fn()
const mockSetEditRecipeSelected = jest.fn()
const mockSetEditRecipeActive = jest.fn()

describe('EditRecipeNavbar', () => {
    it('should render return button', () => {
        render(<EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} setEditRecipeActive={mockSetEditRecipeActive} />)
        const returnButton = screen.getByRole('button', {name: '< Return to Recipe'})
        expect(returnButton).toBeInTheDocument()
    })
    it('should render update button', () => {
        render(<EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} setEditRecipeActive={mockSetEditRecipeActive} />)
        const updateButton = screen.getByRole('button', {name: 'Update Recipe'})
        expect(updateButton).toBeInTheDocument()
    })
    it('should setEditRecipeActive when user clicks return button', async () => {
        render(<EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} setEditRecipeActive={mockSetEditRecipeActive} />)
        const returnButton = screen.getByRole('button', {name: '< Return to Recipe'})
        await userEvent.click(returnButton)
        expect(mockSetEditRecipeSelected).toBeCalled()
    })
    it('should handleUpdateRecipe when user clicks update button', async () => {
        render(<EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} setEditRecipeActive={mockSetEditRecipeActive} />)
        const updateButton = screen.getByRole('button', {name: 'Update Recipe'})
        await userEvent.click(updateButton)
        expect(mockHandleUpdateRecipe).toBeCalled()
    })
})