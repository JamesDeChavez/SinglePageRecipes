import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { UserLoggedInContext } from '../App'
import ProfilePage from '../pages/Profile'
import { MockedProvider } from '@apollo/client/testing'
import { DELETE_USER } from '../graphql/mutations'

const mockData = [
    {
      request: {
        query: DELETE_USER,
        variables: {
          deleteUserId: 'testId'
        }
      },
      result: {
        data: {
          deleteUser: {
            __typename: 'User',
            _id: 'testId'
          }
        }
      }
    }
  ]

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: () => {},
    userId: '', setUserId: () => {},
    windowSize: []
}

describe('ProfilePage', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <ProfilePage />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render text for username, email, and recipe count', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <ProfilePage />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const usernameElement = screen.getByText('Username:')
        const emailElement = screen.getByText('Email:')
        const countElement = screen.getByText('# of Recipes:')
        expect(usernameElement).toBeInTheDocument()
        expect(emailElement).toBeInTheDocument()
        expect(countElement).toBeInTheDocument()
    })
    it('should render delete button', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <ProfilePage />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const deleteButton = screen.getByRole('button', { name:"Delete Account"})
        expect(deleteButton).toBeInTheDocument()
    })
})