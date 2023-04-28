import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoSearch from '../components/VideoSearch'
import { MockedProvider } from '@apollo/client/testing'
import { GET_YOUTUBE_KEY } from '../graphql/queries'

const mockData = [
    {
        request: {
            query: GET_YOUTUBE_KEY
        },
        result: {
            data: {
                youtubeKey: 'testId'
            }
        }
    }
]

describe('VideoSearch', () => {
    it('should render instructions text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <VideoSearch />
            </MockedProvider>
        )
        const textElement = screen.getByText('Learn a new recipe', {exact: false})
        expect(textElement).toBeInTheDocument()
    })
})