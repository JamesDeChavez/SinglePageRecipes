import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecipeOption from '../components/RecipeOption'
import sampleRecipe from '../utils/sampleRecipe'


describe('RecipeOption', () => {
    it('should render recipe image', () => {
        render(<RecipeOption recipe={sampleRecipe} setRecipeSelected={jest.fn()} />)
        const imageElement = screen.getByAltText('youtubeThumbnail')
        expect(imageElement).toBeInTheDocument()
    })
    it('should render recipe title', () => {
        render(<RecipeOption recipe={sampleRecipe} setRecipeSelected={jest.fn()} />)
        const titleElement = screen.getByText(`Recipe: ${sampleRecipe.title}`)
        expect(titleElement).toBeInTheDocument()
    })
    it('should render recipe title', () => {
        render(<RecipeOption recipe={sampleRecipe} setRecipeSelected={jest.fn()} />)
        const videoTitleElement = screen.getByText(`Video: ${sampleRecipe.video.title}`)
        expect(videoTitleElement).toBeInTheDocument()
    })
    it('should render recipe title', () => {
        render(<RecipeOption recipe={sampleRecipe} setRecipeSelected={jest.fn()} />)
        const channelElement = screen.getByText(`Channel: ${sampleRecipe.video.channel}`)
        expect(channelElement).toBeInTheDocument()
    })
})