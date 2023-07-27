import React, { useEffect, useState, useTransition } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { RETURNING_USER } from './graphql/queries';
import LandingPage from './pages/Landing';
import RecipeBookPage from './pages/RecipeBook';
import CreateRecipePage from './pages/CreateRecipe';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import SampleRecipePage from './pages/SampleRecipe';
import SampleRecipeBookPage from './pages/SampleRecipeBook';
import { Recipe } from './utils/interfaces';
import './App.css';
import RecipePage from './pages/Recipe';
import EditRecipePage from './pages/EditRecipe';

export const UserLoggedInContext = React.createContext<{
  userLoggedIn: boolean, setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  userId: string, setUserId: React.Dispatch<React.SetStateAction<string>>,
  windowSize: number[]
}>({
  userLoggedIn: false, setUserLoggedIn: () => {},
  userId: '', setUserId: () => {},
  windowSize: []
})

const App = () => {
  const [_, startTransition] = useTransition()
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const { data } = useQuery(RETURNING_USER)
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])
  const [recipeSelected, setRecipeSelected] = useState<Recipe | null>(null)
  const [sampleRecipeSelected, setSampleRecipeSelected] = useState<Recipe | null>(null)
  const [editRecipeActive, setEditRecipeActive] = useState(false)


  useEffect(() => {
    window.addEventListener('resize', () => {
      startTransition(() => {
        setWindowSize([window.innerWidth, window.innerHeight])
      })
    })
    return () => {
      window.removeEventListener('resize', () => {
        setWindowSize([window.innerWidth, window.innerHeight])
      })
    }
  })

  useEffect(() => {
    if (data && data.returningUser) {
      setUserId(data.returningUser._id)
      setUserLoggedIn(true)
    }
  }, [data])

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/samplerecipebook', element: <SampleRecipeBookPage setSampleRecipeSelected={setSampleRecipeSelected} /> },
    { path: '/samplerecipe', element: <SampleRecipePage sampleRecipeSelected={sampleRecipeSelected} setSampleRecipeSelected={setSampleRecipeSelected} /> },
    { path: '/recipebook', element: <RecipeBookPage recipeSelected={recipeSelected} setRecipeSelected={setRecipeSelected} /> },
    { path: '/recipe', element: <RecipePage recipeSelected={recipeSelected} setRecipeSelected={setRecipeSelected} setEditRecipeActive={setEditRecipeActive} /> },
    { path: '/editrecipe', element: <EditRecipePage recipeSelected={recipeSelected} setRecipeSelected={setRecipeSelected} editRecipeActive={editRecipeActive} setEditRecipeActive={setEditRecipeActive} /> },
    { path: '/newrecipe', element: <CreateRecipePage /> },
    { path: '/profile', element: <ProfilePage /> },
  ])

  return (
    <div className="App">
      <UserLoggedInContext.Provider value={{userLoggedIn, setUserLoggedIn, userId, setUserId, windowSize}}>
        <RouterProvider router={router} />
      </UserLoggedInContext.Provider>
    </div>
  );
}

export default App;
