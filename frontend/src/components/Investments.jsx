import React from 'react';
import InvestmentForm from './InvestmentForm';
import InvestmentList from './InvestmentList';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from './Navbar';
const Investments = () => {
    const navigate = useNavigate();
  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
      <h3>📥 Manage Your Investments</h3>
        <Navbar />
        </div>  
      <div className="investment-grid">
        <div className="investment-form-section">
          <InvestmentForm />
        </div>
        <div className="investment-list-section">
          <InvestmentList />
        </div>
      </div>
    </div>
  );
};

export default Investments;
