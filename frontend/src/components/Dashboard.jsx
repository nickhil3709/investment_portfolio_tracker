import React, { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { tokens } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('portfolio/summary/', {
          headers: {
            Authorization: `Bearer ${tokens?.access}`
          }
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, [tokens]);

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>📊 Portfolio Summary</h2>

      <div className="summary-section">
        <div className="summary-item">💸 <strong>Total Invested:</strong> ₹{summary.total_invested}</div>
        <div className="summary-item">📈 <strong>Current Value:</strong> ₹{summary.current_value}</div>
        <div className="summary-item">💰 <strong>Total PnL:</strong> ₹{summary.total_pnl}</div>
      </div>

      <h3>🔍 Asset Breakdown</h3>
      <ul className="asset-list">
        <li>📉 <strong>Stock:</strong> ₹{summary.asset_breakdown.stock}</li>
        <li>🏦 <strong>Bond:</strong> ₹{summary.asset_breakdown.bond}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
