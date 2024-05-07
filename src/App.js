import './App.css';
import React, { useEffect, useState } from 'react';

import MainHeader from './components/SideEffect/MainHeader/MainHeader';
import Login from './components/SideEffect/Login/Login';
import Home from './components/SideEffect/Home/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('로그인 검사 수행');
    const storedLoginFlag = localStorage.getItem('login-flag');

    if (storedLoginFlag === '1') {
      setIsLoggedIn(true);
    }
  });

  const loginHandler = (email, password) => {
    localStorage.setItem('login-flag', '1');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.setItem('login-flag', '0');
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {isLoggedIn && <Home />}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
      </main>
    </>
  );
};

export default App;
