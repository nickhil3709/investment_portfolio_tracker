import React from 'react';
import PredictionResults from './PredictionResults';
import './Dashboard.css';
import Navbar from './Navbar';
const Predictions = () => {
  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
      <h3>📊 Stock Predictions</h3>
        <Navbar />
        </div>
      <PredictionResults />
    </div>
  );
};

export default Predictions;
