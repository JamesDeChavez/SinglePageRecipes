import { render, screen } from '@testing-library/react'
import RecipeList from '../components/RecipeList'
import { MockedProvider } from '@apollo/client/testing'
import { DefaultOptions, gql } from '@apollo/client'
import { RecipesFragment } from '../graphql/fragments'
import { UserLoggedInContext } from '../App'
import '@testing-library/jest-dom'

const QUERY = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            _id
            username
            email
            password

            ...Recipes
        }      
    }
    ${RecipesFragment}
`

const fragmentDefaultOptions: DefaultOptions = {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
  };

const mockData = [
    {
      request: {
        query: QUERY,
        variables: {
            userId: 'testId'
        }
      },
      result: {
        data: {
          user: {
            __typename: 'User',
            _id: 'testId',
            username: 'TestUser',
            password: 'fakepassword',
            recipes: [{
                title: "Test Recipe",
                video: {
                    title: "Test Title",
                    "thumbnail": "https://i.ytimg.com/vi/q3V_ibwxBXg/mqdefault.jpg",
                    "channel": "Test channel",
                    "videoId": "q3V_ibwxBXg"
                },
                instructions: [
                    {
                    summary: {
                        action: "COOK",
                        items: [
                            "Eggplant"
                        ]
                    },
                    time: "1 min",
                    description: "test",
                    ingredients: [
                        {
                            name: "Eggplant",
                            amount: "1 lb"
                        }
                    ]
                    }
                ],
                ingredients: [
                    {
                        name: "Eggplant",
                        amount: "1 lb"
                    }
                ]
            }]
          },
          recipes: []
        }
      }
    }
  ]
  
const mockContext = {
    userLoggedIn: false, setUserLoggedIn: () => {},
    userId: 'testId', setUserId: () => {},
    windowSize: []
}

describe('RecipeList', () => {
    it('should render Recipe Filter', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} defaultOptions={fragmentDefaultOptions} >
                 <UserLoggedInContext.Provider value={mockContext} >
                    <RecipeList setRecipeSelected={jest.fn()} />
                 </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const filterText = screen.getByText('Recipe Filter')
        const filterInput = screen.getByRole('textbox')
        expect(filterText).toBeInTheDocument()
        expect(filterInput).toBeInTheDocument()
    })
    it('should render no recipes text', () => {
        render(
            <MockedProvider addTypename={false} mocks={mockData} defaultOptions={fragmentDefaultOptions} >
                 <UserLoggedInContext.Provider value={mockContext} >
                    <RecipeList setRecipeSelected={jest.fn()} />
                 </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const recipeText = screen.getByText('No Recipes Created')
        expect(recipeText).toBeInTheDocument()
    })

})