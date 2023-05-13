import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecipeOption from '../components/RecipeOption'
import { RecipeBookContext } from '../pages/RecipeBook'
import sampleRecipe from '../utils/sampleRecipe'

const mockContext = {
    recipeSelected: sampleRecipe, setRecipeSelected: () => {},
    editRecipeActive: false, setEditRecipeActive: () => {}
}

describe('RecipeOption', () => {
    it('should render recipe image', () => {
        render(
        <RecipeBookContext.Provider value={mockContext} >
            <RecipeOption recipe={sampleRecipe} />
        </RecipeBookContext.Provider>
        )
        const imageElement = screen.getByAltText('youtubeThumbnail')
        expect(imageElement).toBeInTheDocument()
    })
    it('should render recipe title', () => {
        render(
        <RecipeBookContext.Provider value={mockContext} >
            <RecipeOption recipe={sampleRecipe} />
        </RecipeBookContext.Provider>
        )
        const titleElement = screen.getByText(`Recipe: ${sampleRecipe.title}`)
        expect(titleElement).toBeInTheDocument()
    })
    it('should render recipe title', () => {
        render(
        <RecipeBookContext.Provider value={mockContext} >
            <RecipeOption recipe={sampleRecipe} />
        </RecipeBookContext.Provider>
        )
        const videoTitleElement = screen.getByText(`Video: ${sampleRecipe.video.title}`)
        expect(videoTitleElement).toBeInTheDocument()
    })
    it('should render recipe title', () => {
        render(
        <RecipeBookContext.Provider value={mockContext} >
            <RecipeOption recipe={sampleRecipe} />
        </RecipeBookContext.Provider>
        )
        const channelElement = screen.getByText(`Channel: ${sampleRecipe.video.channel}`)
        expect(channelElement).toBeInTheDocument()
    })
})