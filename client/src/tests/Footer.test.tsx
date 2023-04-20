import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../components/Footer'

describe('Footer', () => {
    it('should render text and link to portfolio', () => {
        render(<Footer/>)
        const textElement = screen.getByText('Developed by', {exact: false})
        const linkElement = screen.getByRole('link')
        expect(textElement).toBeInTheDocument()
        expect(linkElement).toBeInTheDocument()
    })
})