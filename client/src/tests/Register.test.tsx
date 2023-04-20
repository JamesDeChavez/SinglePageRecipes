import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import RegisterForm from '../components/RegisterForm'
import { CREATE_USER } from '../graphql/mutations'

const mockData = [
    {
      request: {
        query: CREATE_USER,
        variables: {
          username: 'TestUser',
          password: 'fakepassword'
        }
      },
      result: {
        data: {
          createUser: {
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

describe('Register', () => {
    it('should render header', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >     
                <RegisterForm/>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render 4 inputs', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >     
                <RegisterForm/>
            </MockedProvider>
        )
        const usernameInput = screen.getByPlaceholderText('Username')
        const emailInput = screen.getByPlaceholderText('Email')
        const passwordInput = screen.getByPlaceholderText('Password')
        const repeatInput = screen.getByPlaceholderText('Repeat Password')       

        expect(usernameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(repeatInput).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >     
                <RegisterForm/>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: /Create Account/i })
        expect(submitButton).toBeInTheDocument()
    })
})