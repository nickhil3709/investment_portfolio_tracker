import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SIPCalculator from './components/SIPCalculator';

const App = () => {
  const { tokens } = useContext(AuthContext);
  const isAuthenticated = !!tokens?.access;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm onSuccess={() => { window.location.href = '/' }} />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sip" element={<SIPCalculator />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;
