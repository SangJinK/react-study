import './App.css';
import React, { useEffect, useState, useContext } from 'react';

import MainHeader from './components/SideEffect/MainHeader/MainHeader';
import Login from './components/SideEffect/Login/Login';
import Home from './components/SideEffect/Home/Home';
import AuthContext from './components/store/auth-context';

const App = () => {
  const { isLoggedIn, onLogin } = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        {isLoggedIn && <Home />}
        {!isLoggedIn && <Login />}
      </main>
    </>
  );
};

export default App;
