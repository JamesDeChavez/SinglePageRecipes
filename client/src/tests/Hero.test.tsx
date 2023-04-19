import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '../components/Hero'

describe('Hero', () => {
    it('should render header', () => {
        render(<Hero/>)
        const headerElement = screen.getByText(/Single Page Recipes/i)
        expect(headerElement).toBeInTheDocument()
    })
    it('should render hero text', () => {
        render(<Hero/>)
        const textElement = screen.getByText('Single-Page Interace - No Scrolling')
        expect(textElement).toBeInTheDocument()
    })
    it('should render button', () => {
        render(<Hero/>)
        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeInTheDocument()
    })
})