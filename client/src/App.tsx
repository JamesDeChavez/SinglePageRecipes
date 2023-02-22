import React, { useState } from 'react';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <div className="App">
    {!userLoggedIn ?
      <div>NonAuthBranch</div>
    :
      <div>AuthBranch</div>
    }
    </div>
  );
}

export default App;
