import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoSearchResult from '../components/VideoSearchResult'
import sampleRecipe from '../utils/sampleRecipe'
import { useRef } from 'react'
import { CreateRecipeRenderContext } from '../branches/CreateRecipe'

const mockVideo = sampleRecipe.video
const { result } = renderHook(() => useRef(null))
const mockSetVideoSelected = jest.fn()
const mockValue = {
    videoSelected: undefined,
    setVideoSelected: mockSetVideoSelected
}

describe('VideoSearchResult', () => {
    it('should render image', () => {
        render(
            <CreateRecipeRenderContext.Provider value={mockValue} >
                <VideoSearchResult video={mockVideo} root={result.current} searchResults={[]} />
            </CreateRecipeRenderContext.Provider>
        )
        const imageElement = screen.getByAltText('youtubeThumbnail')
        expect(imageElement).toBeInTheDocument()
    })
    it('should render video title', () => {
        render(
            <CreateRecipeRenderContext.Provider value={mockValue} >
                <VideoSearchResult video={mockVideo} root={result.current} searchResults={[]} />
            </CreateRecipeRenderContext.Provider>
        )
        const titleElement = screen.getByText(mockVideo.title)
        expect(titleElement).toBeInTheDocument()
    })
    it('should render video channel', () => {
        render(
            <CreateRecipeRenderContext.Provider value={mockValue} >
                <VideoSearchResult video={mockVideo} root={result.current} searchResults={[]} />
            </CreateRecipeRenderContext.Provider>
        )
        const channelElement = screen.getByText(mockVideo.channel, {exact: false})
        expect(channelElement).toBeInTheDocument()
    })
})