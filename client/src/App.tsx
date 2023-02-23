import React, { useState } from 'react';
import NonAuthBranch from './branches/NonAuth';
import AuthBranch from './branches/Auth';
import './App.css';

export const UserLoggedInContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}])

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <div className="App">
      <UserLoggedInContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      {!userLoggedIn ?
        <NonAuthBranch/>
      :
        <AuthBranch/>
      }
      </UserLoggedInContext.Provider>
    </div>
  );
}

export default App;
