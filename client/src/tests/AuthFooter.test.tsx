import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthFooter from '../components/AuthFooter'
import { AuthRenderContext } from '../branches/Auth'
import userEvent from '@testing-library/user-event'

const mockSetRender = jest.fn()

describe('AuthFooter', () => {
    it('should render 3 nav buttons', () => {
        render(
            <AuthRenderContext.Provider value={[[], mockSetRender, '']}>
                <AuthFooter />
            </AuthRenderContext.Provider>
        )
        const buttonElements = screen.getAllByRole('button')
        expect(buttonElements).toHaveLength(3)
    })
    it('should trigger setRender when user clicks a nav button', async () => {
        render(
            <AuthRenderContext.Provider value={[[], mockSetRender, '']}>
                <AuthFooter />
            </AuthRenderContext.Provider>
        )
        const newRecipeButton = screen.getByText('New Recipe').closest('button')!
        const profileButton = screen.getByText('Profile').closest('button')!
        const recipeBookButton = screen.getByText('Recipe Book').closest('button')!
        await userEvent.click(newRecipeButton)
        await userEvent.click(profileButton)
        await userEvent.click(recipeBookButton)
        expect(mockSetRender).toHaveBeenCalledTimes(3)
    })
})