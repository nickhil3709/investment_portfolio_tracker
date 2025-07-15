import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from './Navbar';
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const { tokens } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get('portfolio/summary/', {
          headers: {
            Authorization: `Bearer ${tokens.access}`
          }
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to fetch summary:', err);
      }
    };
    fetchSummary();
  }, [tokens]);

  if (!summary) return <p>Loading portfolio summary...</p>;

  const pieData = {
    labels: ['Stock', 'Bond'],
    datasets: [{
      data: [summary.asset_breakdown.stock, summary.asset_breakdown.bond],
      backgroundColor: ['#4e79a7', '#f28e2c'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 1
    }]
  };

  return (
    <div className="dashboard">
      {/* Navigation Buttons */}
      <div className="dashboard-header">
        <h2>📊 Portfolio Dashboard</h2>
         <Navbar />
      </div>

      {/* Overview Section */}
      <div className="dashboard-section">
        <h3>📊 Portfolio Summary</h3>
        <div className="summary-section">
          <div className="summary-item">💸 Total Invested: ₹{summary.total_invested}</div>
          <div className="summary-item">📈 Current Value: ₹{summary.current_value}</div>
          <div className="summary-item">💰 Total PnL: ₹{summary.total_pnl}</div>
        </div>

        <h3>🔍 Asset Breakdown</h3>
        <ul className="asset-list">
          <li>📉 Stock: ₹{summary.asset_breakdown.stock}</li>
          <li>🏦 Bond: ₹{summary.asset_breakdown.bond}</li>
        </ul>

        <h3>📊 Asset Allocation</h3>
        <div className="chart-wrapper" style={{ maxWidth: '280px', margin: '0 auto' }}>
  <Pie
    data={pieData}
    options={{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }}
    width={250}
    height={250}
  />
</div>

      </div>
    </div>
  );
};

export default Dashboard;
