
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import RecipeNavbar from '../components/RecipeNavbar'
import sampleRecipe from '../utils/sampleRecipe'
import { MockedProvider } from '@apollo/client/testing'
import { DELETE_RECIPE } from '../graphql/mutations'

const mockRecipe = sampleRecipe
const mockData = [{
    request: {
        query: DELETE_RECIPE,
        variables: {
            userId: 'testId',
            recipes: []
        }
    },
    result: {
        data: {
            deleteRecipe: {
                __typename: 'User',
                _id: '123',
                recipes: []
            }
        }
    }
}]
const mockSetRecipeSelected = jest.fn()
const mockSetEditRecipeActive = jest.fn()
describe('RecipeNavbar', () => {
    it('should render return button', () => {
        render(<RecipeNavbar recipeSelected={mockRecipe} setRecipeSelected={mockSetRecipeSelected} setEditRecipeActive={mockSetEditRecipeActive}/>)
        const returnButton = screen.getByRole('button', {name: '< Return to Recipe Book'})
        expect(returnButton).toBeInTheDocument()
    })
    it('should render options button', () => {
        render(<RecipeNavbar recipeSelected={mockRecipe} setRecipeSelected={mockSetRecipeSelected} setEditRecipeActive={mockSetEditRecipeActive}/>)
        const optionsButton = screen.getByText('Options')
        expect(optionsButton).toBeInTheDocument()
    })
    it('should render editRecipe and deleteRecipe buttons', () => {
        render(<RecipeNavbar recipeSelected={mockRecipe} setRecipeSelected={mockSetRecipeSelected} setEditRecipeActive={mockSetEditRecipeActive}/>)
        const editButton = screen.getByText('Edit Recipe')
        const deleteButton = screen.getByText('Delete Recipe')
        expect(editButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument()
    })
    it('should render setRecipeSelected when return button is clicked', async () => { 
        render(<RecipeNavbar recipeSelected={mockRecipe} setRecipeSelected={mockSetRecipeSelected} setEditRecipeActive={mockSetEditRecipeActive}/>)
        const returnButton = screen.getByRole('button', {name: '< Return to Recipe Book'})
        await userEvent.click(returnButton)
        expect(mockSetRecipeSelected).toBeCalled()
    })
    it('should setEditRecipeActive when user clicks edit button', async () => {
        render(<RecipeNavbar recipeSelected={mockRecipe} setRecipeSelected={mockSetRecipeSelected} setEditRecipeActive={mockSetEditRecipeActive}/>)
        const editButton = screen.getByText('Edit Recipe')
        await userEvent.click(editButton)
        expect(mockSetEditRecipeActive).toBeCalled()
    })
})
