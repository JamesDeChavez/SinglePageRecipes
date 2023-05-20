import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoSection from '../components/VideoSection'

const mockProps = {
    title: 'Sample Title',
    videoId: 'testId',
    handleMinimizeClick: jest.fn(),
    handleHideClick: jest.fn()
}

describe('VideoSection', () => {
    it('should render recipe title', () => {
        render(<VideoSection {...mockProps} />)
        const recipeTitleElement = screen.getByText('Sample Title', {exact: false})
        expect(recipeTitleElement).toBeInTheDocument()
    })
    it('should render iframe video', () => {
        render(<VideoSection {...mockProps} />)
        const iframeElement = screen.getByTitle('recipeVideo')
        expect(iframeElement).toBeInTheDocument()
    })
})