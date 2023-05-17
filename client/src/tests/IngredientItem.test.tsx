import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import IngredientItem from '../components/IngredientItem'
import { Ingredient } from '../utils/interfaces'
import { useRef } from 'react'

const mockItem: Ingredient = {
    name: 'Onion',
    amount: '1/4 units'
}
const mockShoppingList: Ingredient[] = [ { name: 'Onion', amount: '1/4 units' } ]
const mockSetShoppingList = jest.fn()
const { result } = renderHook(() => useRef(null))
const props = {
    item: mockItem,
    orderActive: false,
    shoppingList: mockShoppingList,
    setShoppingList: mockSetShoppingList,
    root: result.current,
    start: 1
}

describe('IngredientItem', () => {
    it('should render item name and amount', () => {
        render(<IngredientItem {...props} />)
        const nameElement = screen.getByText(mockItem.name)
        const amountElement = screen.getByText(mockItem.amount)
        expect(nameElement).toBeInTheDocument()
        expect(amountElement).toBeInTheDocument()
    })
    it('should setShoppingList when user clicks on ingredientItem', async () => {
        render(<IngredientItem {...props} />)
        const itemElement = screen.getByText(mockItem.name).closest('div')!
        await userEvent.click(itemElement)
        expect(mockSetShoppingList).toBeCalled()
    })
})