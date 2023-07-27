import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditRecipeVideoSection from '../components/EditRecipeVideoSection'
import sampleRecipe from '../utils/sampleRecipe'

const mockTitle = 'Test Recipe Title'
const mockSetTitle = jest.fn()

describe('EditRecipeVideoSection', () => {
    it('should render recipe title input element', () => {
        render(<EditRecipeVideoSection title={mockTitle} setTitle={mockSetTitle} recipeSelected={null} />)
        const titleInput = screen.getByDisplayValue(mockTitle)
        expect(titleInput).toBeInTheDocument()
    })
    it('should render iframe video element', () => {
        render(<EditRecipeVideoSection title={mockTitle} setTitle={mockSetTitle} recipeSelected={null} />)
        const iframeElement = screen.getByTitle('recipeVideo')
        expect(iframeElement).toBeInTheDocument()
    })
})