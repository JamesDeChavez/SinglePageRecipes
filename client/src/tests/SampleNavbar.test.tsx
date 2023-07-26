import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SampleNavbar from '../components/SampleNavbar'

describe('SampleNavbar', () => {
    it('should render return home button', () => {
        render(<SampleNavbar setRecipeSelected={jest.fn()}/>)
        const returnButton = screen.getByRole('button', { name: '< Return Home'})
        const registerButton = screen.getByRole('button', { name: 'Create an Account'})
        expect(returnButton).toBeInTheDocument()
        expect(registerButton).toBeInTheDocument()
    })
})