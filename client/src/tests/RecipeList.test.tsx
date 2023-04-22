import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecipeList from '../components/RecipeList'
import { UserLoggedInContext } from '../App'
import { MockedProvider } from '@apollo/client/testing'
import { LOGIN } from '../graphql/queries'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const mockData = [{
    request: {
        query: LOGIN,
        variables: {
            username: 'TestUser',
            password: 'fakepassword'
        }
    },
    result: {
        data: {
            login: {
                __typename: 'User',
                _id: '123',
                username: 'TestUser',
                password: 'fakepassword',
                recipes: []
            }
        }
    }
}]
const mockCache = new InMemoryCache({
    addTypename: false
})
const mockContext = {
    userLoggedIn: false, setUserLoggedIn: () => {},
    userId: '123', setUserId: () => {},
    windowSize: []
}
jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useApolloClient: () => ({ 
        ...jest.requireActual('@apollo/client/useApolloClient'),
        readFragment: jest.fn() 
    }), 
  }));

describe('RecipeList', () => {
    it('should render Recipe Filter', () => {
        render(
            <MockedProvider addTypename={false} cache={mockCache} mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <RecipeList />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const filterText = screen.getByText('Recipe Filter')
        const filterInput = screen.getByRole('textbox')
        expect(filterText).toBeInTheDocument()
        expect(filterInput).toBeInTheDocument()
    })

})