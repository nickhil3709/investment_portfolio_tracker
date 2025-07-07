import React, { useContext, useState } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
const App = () => {
  const { token } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(!!token);

  return (
    <div>
      {!loggedIn ? <LoginForm onSuccess={() => setLoggedIn(true)} /> : <Dashboard />}
    </div>
  );
};

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;
