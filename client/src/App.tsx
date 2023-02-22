import React, { useState } from 'react';
import './App.css';
import NonAuthBranch from './branches/NonAuth';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <div className="App">
    {!userLoggedIn ?
      <NonAuthBranch/>
    :
      <div>AuthBranch</div>
    }
    </div>
  );
}

export default App;
