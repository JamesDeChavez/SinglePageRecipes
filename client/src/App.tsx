import React, { useEffect, useState, useTransition, lazy, Suspense } from 'react';
import NonAuthBranch from './branches/NonAuth';
import { useQuery } from '@apollo/client';
import { RETURNING_USER } from './graphql/queries';
import Loading from './components/Loading';
import './App.css';
import SuspenseLoad from './components/SuspenseLoad';

const AuthBranch = lazy(() => import('./branches/Auth'))

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

  return (
    <div className="App">
      <UserLoggedInContext.Provider value={{userLoggedIn, setUserLoggedIn, userId, setUserId, windowSize}}>
      {!userLoggedIn ?
        <NonAuthBranch/>
      :
        <Suspense fallback={<SuspenseLoad/>}>
          <AuthBranch/>
        </Suspense>
      }
      </UserLoggedInContext.Provider>
    </div>
  );
}

export default App;
