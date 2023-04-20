import { render, screen, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { GET_AMAZON_TAG } from '../graphql/queries'
import RecipeActions from '../components/RecipeActions'
import { useRef } from 'react'
import userEvent from '@testing-library/user-event'

const mockData = [
    {
        request: {
            query: GET_AMAZON_TAG
        },
        result: {
            data: {
                amazonTag: 'testId'
            }
        }
    }
]

const mockSetOrderActive = jest.fn()
const mockSetShoppingList = jest.fn()
const { result } = renderHook(() => useRef(null))

describe('RecipeActions', () => {
    it('should render header', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >
                <RecipeActions orderActive={false} setOrderActive={mockSetOrderActive} shoppingList={[]} setShoppingList={mockSetShoppingList} root={result.current} />
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render orderIngredients button, if orderActive = false', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >
                <RecipeActions orderActive={false} setOrderActive={mockSetOrderActive} shoppingList={[]} setShoppingList={mockSetShoppingList} root={result.current} />
            </MockedProvider>
        )
        const orderButton = screen.getByRole('button', { name: /Order Ingredients/i })
        expect(orderButton).toBeInTheDocument()
    })
    it('should setOrderActive when user clicks Order Ingredients button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >
                <RecipeActions orderActive={false} setOrderActive={mockSetOrderActive} shoppingList={[]} setShoppingList={mockSetShoppingList} root={result.current} />
            </MockedProvider>
        )
        const orderButton = screen.getByRole('button', { name: /Order Ingredients/i })
        userEvent.click(orderButton)
        expect(mockSetOrderActive).toBeCalled()
    })
    it('should render instructions text and 4 buttons, if orderActive = true', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >
                <RecipeActions orderActive={true} setOrderActive={mockSetOrderActive} shoppingList={[]} setShoppingList={mockSetShoppingList} root={result.current} />
            </MockedProvider>
        )
        const instructionsElement = screen.getByText('Amazon Fresh Shopping Cart', {exact: false})
        const buttonElements = screen.getAllByRole('button')
        expect(instructionsElement).toBeInTheDocument()
        expect(buttonElements).toHaveLength(4)
    })
    it('should setShoppingList when user clicks select buttons', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} >
                <RecipeActions orderActive={true} setOrderActive={mockSetOrderActive} shoppingList={[]} setShoppingList={mockSetShoppingList} root={result.current} />
            </MockedProvider>
        )
        const selectButton = screen.getByRole('button', { name: 'Select All'})
        const unselectButton = screen.getByRole('button', { name: 'Unselect All'})
        userEvent.click(selectButton)
        userEvent.click(unselectButton)
        expect(mockSetShoppingList).toBeCalledTimes(2)
    })
})