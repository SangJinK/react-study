import React, { Children, useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
