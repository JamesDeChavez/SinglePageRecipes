import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoSection from '../components/VideoSection'

describe('VideoSection', () => {
    it('should render recipe title', () => {
        render(<VideoSection title={'Sample Title'} videoId={'testId'} />)
        const recipeTitleElement = screen.getByText('Sample Title', {exact: false})
        expect(recipeTitleElement).toBeInTheDocument()
    })
    it('should render iframe video', () => {
        render(<VideoSection title={'Sample Title'} videoId={'testId'} />)
        const iframeElement = screen.getByTitle('recipeVideo')
        expect(iframeElement).toBeInTheDocument()
    })
})