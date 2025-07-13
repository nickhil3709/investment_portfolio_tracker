import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('tokens');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (tokens) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
    }
  }, [tokens]);
  const saveTokens = (newTokens) => {
    setTokens(newTokens);
    localStorage.setItem('tokens', JSON.stringify(newTokens));
  };

  const logout = () => {
    setTokens(null);
    localStorage.removeItem('tokens');
  };
  return (
    <AuthContext.Provider value={{  tokens, setTokens: saveTokens, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
