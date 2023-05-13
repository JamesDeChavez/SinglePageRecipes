import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import sampleRecipe from '../utils/sampleRecipe'
import { CreateRecipeRenderContext } from '../branches/CreateRecipe'
import CreateRecipeNavbar from '../components/CreateRecipeNavbar'

const mockContext = {
    videoSelected: sampleRecipe.video,
    setVideoSelected: () => {}
}

const mockHandleCreateRecipe = jest.fn()
const mockProps = {
    handleCreateRecipe: mockHandleCreateRecipe,
    loading: false
}

describe('CreateRecipeNavbar', () => {
    it('should render return button', () => {
        render(
            <CreateRecipeRenderContext.Provider value={mockContext} >
                <CreateRecipeNavbar {...mockProps} />
            </CreateRecipeRenderContext.Provider>
        )
        const returnButton = screen.getByRole('button', { name: '< Return to Video Search' })
        expect(returnButton).toBeInTheDocument()
    })
    it('should render create button', () => {
        render(
            <CreateRecipeRenderContext.Provider value={mockContext} >
                <CreateRecipeNavbar {...mockProps} />
            </CreateRecipeRenderContext.Provider>
        )
        const createButton = screen.getByRole('button', { name: 'Create Recipe' })
        expect(createButton).toBeInTheDocument()
    })
})

