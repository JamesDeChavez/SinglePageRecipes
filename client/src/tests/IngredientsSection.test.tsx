import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import IngredientsSection from '../components/IngredientsSection'
import { MockedProvider } from '@apollo/client/testing'
import { GET_AMAZON_TAG } from '../graphql/queries'

const mockData = [{
    request: {
        query: GET_AMAZON_TAG
    },
    result: {
        data: {
            amazonTag: 'testId'
        }
    }
}]
const mockIngreidents = [{ name: 'Onion', amount: '1/4 units' }]
const mockOrderActive = false
const mockSetOrderActive = jest.fn()
const mockShoppingList = [{...mockIngreidents[0], include: true}]
const mockSetShoppingList = jest.fn()
const props = {
    ingredients: mockIngreidents,
    orderActive: mockOrderActive, setOrderActive: mockSetOrderActive,
    shoppingList: mockShoppingList, setShoppingList: mockSetShoppingList
}

describe('IngredientsSection', () => {
    it('should render header', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} />
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading')
        expect(headerElement).toBeInTheDocument()
    })
    it('should render page buttons', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} />
            </MockedProvider>
        )
        const prevButton = screen.getByRole('button', {name: 'Prev'})
        const nextButton = screen.getByRole('button', {name: 'Next'})
        expect(prevButton).toBeInTheDocument()
        expect(nextButton).toBeInTheDocument()
    })
    it('should render select buttons', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} orderActive={true} />
            </MockedProvider>
        )
        const selectButton = screen.getByRole('button', {name: 'Select All'})
        const unselectButton = screen.getByRole('button', {name: 'Unselect All'})
        expect(selectButton).toBeInTheDocument()
        expect(unselectButton).toBeInTheDocument()
    })
    it('should setShoppingList when user clicks select button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} orderActive={true} />
            </MockedProvider>
        )
        const selectButton = screen.getByRole('button', {name: 'Select All'})
        selectButton.click()
        expect(mockSetShoppingList).toBeCalled()
    })
    it('should setShoppingList when user clicks unselect button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} orderActive={true} />
            </MockedProvider>
        )
        const unselectButton = screen.getByRole('button', {name: 'Unselect All'})
        unselectButton.click()
        expect(mockSetShoppingList).toBeCalled()
    })
    it('should render submit and cancel buttons', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} orderActive={true} />
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', {name: 'Submit Order'})
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        expect(submitButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should handle cancel click when user clicks cancel button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} orderActive={true} />
            </MockedProvider>
        )
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        cancelButton.click()
        expect(mockSetOrderActive).toBeCalled()
    })
    it('should render order button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} />
            </MockedProvider>
        )
        const orderButton = screen.getByRole('button', {name: 'Order Ingredients'})
        expect(orderButton).toBeInTheDocument()
    })
    it('should handle order click when user clicks order button', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData}>
                <IngredientsSection {...props} />
            </MockedProvider>
        )
        const orderButton = screen.getByRole('button', {name: 'Order Ingredients'})
        orderButton.click()
        expect(mockSetOrderActive).toBeCalled()
    })
})