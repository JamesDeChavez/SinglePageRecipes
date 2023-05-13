import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CreateRecipeRenderContext } from '../branches/CreateRecipe'
import sampleRecipe from '../utils/sampleRecipe'
import CreateRecipeVideoSection from '../components/CreateRecipeVideoSection'

const mockContext = {
    videoSelected: sampleRecipe.video,
    setVideoSelected: () => {}
}

const mockSetTitle = jest.fn()
const mockProps = {
    title: 'test title',
    setTitle: mockSetTitle
}

describe('CreateRecipeVideoSection', () => {
    it('should render title', () => {
        render(
            <CreateRecipeRenderContext.Provider value = {mockContext} >
                <CreateRecipeVideoSection {...mockProps} />
            </CreateRecipeRenderContext.Provider>
        )
        const titleInputElement = screen.getByPlaceholderText('Input Recipe Title Here')
        expect(titleInputElement).toBeInTheDocument()
    })
    it('should render iframe', () => {
        render(
            <CreateRecipeRenderContext.Provider value = {mockContext} >
                <CreateRecipeVideoSection {...mockProps} />
            </CreateRecipeRenderContext.Provider>
        )        
        const iframeElement = screen.getByTitle('recipeVideo')
        expect(iframeElement).toBeInTheDocument()
    })
})