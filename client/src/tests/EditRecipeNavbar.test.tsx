import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditRecipeNavbar from '../components/EditRecipeNavbar'
import { RecipeBookContext } from '../pages/RecipeBook'
import sampleRecipe from '../utils/sampleRecipe'

const mockHandleUpdateRecipe = jest.fn()
const mockSetRecipeSelected = jest.fn()
const mockSetEditRecipeSelected = jest.fn()
const mockRecipeSelected = sampleRecipe
const mockContextValues = {
    recipeSelected: mockRecipeSelected, setRecipeSelected: mockSetRecipeSelected,
    editRecipeActive: false, setEditRecipeActive: mockSetEditRecipeSelected
} 

describe('EditRecipeNavbar', () => {
    it('should render return button', () => {
        render(
            <RecipeBookContext.Provider value={mockContextValues} >
                <EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} />
            </RecipeBookContext.Provider>
        )
        const returnButton = screen.getByRole('button', {name: '< Return to Recipe'})
        expect(returnButton).toBeInTheDocument()
    })
    it('should render update button', () => {
        render(
            <RecipeBookContext.Provider value={mockContextValues} >
                <EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} />
            </RecipeBookContext.Provider>
        )
        const updateButton = screen.getByRole('button', {name: 'Update Recipe'})
        expect(updateButton).toBeInTheDocument()
    })
    it('should setEditRecipeActive when user clicks return button', async () => {
        render(
            <RecipeBookContext.Provider value={mockContextValues} >
                <EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} />
            </RecipeBookContext.Provider>
        )
        const returnButton = screen.getByRole('button', {name: '< Return to Recipe'})
        await userEvent.click(returnButton)
        expect(mockSetEditRecipeSelected).toBeCalled()
    })
    it('should handleUpdateRecipe when user clicks update button', async () => {
        render(
            <RecipeBookContext.Provider value={mockContextValues} >
                <EditRecipeNavbar handleUpdateRecipe={mockHandleUpdateRecipe} loading={false} />
            </RecipeBookContext.Provider>
        )
        const updateButton = screen.getByRole('button', {name: 'Update Recipe'})
        await userEvent.click(updateButton)
        expect(mockHandleUpdateRecipe).toBeCalled()
    })
})