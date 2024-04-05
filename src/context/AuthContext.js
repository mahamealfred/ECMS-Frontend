import React, { createContext, useState, useContext } from 'react';

// Create a new context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('authKey'));


  const login = (token) => {
    localStorage.setItem('authKey', token);
    setAuth(token);
  };

  const logout = () => {
    localStorage.removeItem('authKey');
    setAuth(null);

  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
