import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoSearchForm from '../components/VideoSearchForm'
import { MockedProvider } from '@apollo/client/testing'
import { GET_YOUTUBE_KEY } from '../graphql/queries'
import userEvent from '@testing-library/user-event'

const mockSetSearchResults = jest.fn()
const mockSetSearchLoading = jest.fn()
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

describe('VideoSearchForm', () => {
    it('should render search input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <VideoSearchForm setSearchResults={mockSetSearchResults} setSearchLoading={mockSetSearchLoading} />
            </MockedProvider>
        )
        const searchInput = screen.getByPlaceholderText('Youtube Search or URL')
        expect(searchInput).toBeInTheDocument()
    })
    it('should handle onChange when user types search', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <VideoSearchForm setSearchResults={mockSetSearchResults} setSearchLoading={mockSetSearchLoading} />
            </MockedProvider>
        )
        const searchInput = screen.getByPlaceholderText('Youtube Search or URL')
        await userEvent.type(searchInput, 'Test Search')
        waitFor(() => expect(searchInput).toHaveDisplayValue('Test Search'))
    })
    it('should render submit button', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <VideoSearchForm setSearchResults={mockSetSearchResults} setSearchLoading={mockSetSearchLoading} />
            </MockedProvider>
        )
        const submitButton = await screen.findByRole('button')
        expect(submitButton).toBeInTheDocument()
    })
    it('should setSearchLoading when user submits search', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <VideoSearchForm setSearchResults={mockSetSearchResults} setSearchLoading={mockSetSearchLoading} />
            </MockedProvider>
        )
        const searchInput = screen.getByPlaceholderText('Youtube Search or URL')
        const submitButton = await screen.findByRole('button')
        
        await userEvent.type(searchInput, 'Test Search')
        await userEvent.click(submitButton)
        
        expect(mockSetSearchLoading).toBeCalled()
    })
})