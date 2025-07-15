// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css' ;// Optional: separate styling

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={() => navigate('/investments')}>Investments</button>
        <button onClick={() => navigate('/predictions')}>Predictions</button>
        <button onClick={() => navigate('/sip')}>SIP Calculator</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
