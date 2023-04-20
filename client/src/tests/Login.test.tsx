import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import LoginForm from '../components/LoginForm'
import { LOGIN } from '../graphql/queries'

const mockData = [
    {
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
    }
  ]

describe('Login', () => {
  it('should render header', () => {
      render(
          <MockedProvider addTypename={false} mocks={mockData}>
              <LoginForm/>
          </MockedProvider>
      )
      const headerElement = screen.getByRole('heading')
      expect(headerElement).toBeInTheDocument()
  })
  it('should render 2 inputs', () => {
      render(
          <MockedProvider addTypename={false} mocks={mockData}>
              <LoginForm/>
          </MockedProvider>
      )
      const usernameInput = screen.getByPlaceholderText('Username')
      const passwordInput = screen.getByPlaceholderText('Password')

      expect(usernameInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
  })
  it('should render Login button', () => {
    render(
        <MockedProvider addTypename={false} mocks={mockData}>
            <LoginForm/>
        </MockedProvider>
    )
    const buttonElement = screen.getByRole('button',  {name: 'Log In'})
    expect(buttonElement).toBeInTheDocument()
  })  
})