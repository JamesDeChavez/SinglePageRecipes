import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditRecipeVideoSection from '../components/EditRecipeVideoSection'
import sampleRecipe from '../utils/sampleRecipe'
import { RecipeBookContext } from '../pages/RecipeBook'

const mockTitle = 'Test Recipe Title'
const mockSetTitle = jest.fn()
const mockSetRecipeSelected = jest.fn()
const mockSetEditRecipeSelected = jest.fn()
const mockRecipeSelected = sampleRecipe
const mockContextValues = {
    recipeSelected: mockRecipeSelected, setRecipeSelected: mockSetRecipeSelected,
    editRecipeActive: false, setEditRecipeActive: mockSetEditRecipeSelected
} 

describe('EditRecipeVideoSection', () => {
    it('should render recipe title input element', () => {
        render(
            <RecipeBookContext.Provider value={mockContextValues} >
                <EditRecipeVideoSection title={mockTitle} setTitle={mockSetTitle} />
            </RecipeBookContext.Provider>
        )
        const titleInput = screen.getByDisplayValue(mockTitle)
        expect(titleInput).toBeInTheDocument()
    })
    it('should render iframe video element', () => {
        render(
            <RecipeBookContext.Provider value={mockContextValues} >
                <EditRecipeVideoSection title={mockTitle} setTitle={mockSetTitle} />
            </RecipeBookContext.Provider>
        )
        const iframeElement = screen.getByTitle('recipeVideo')
        expect(iframeElement).toBeInTheDocument()
    })
})