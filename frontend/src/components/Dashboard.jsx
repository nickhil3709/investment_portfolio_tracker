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
  const [rebalancingResult, setRebalancingResult] = useState(null);
  const [rebalanceError, setRebalanceError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get('portfolio/summary/', {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to fetch summary:', err);
      }
    };
    fetchSummary();
  }, [tokens]);

  const handleRebalance = async () => {
    try {
      const res = await API.post(
        'portfolio/rebalance/',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );
      setRebalancingResult(res.data);
      setRebalanceError('');
    } catch (err) {
      console.error(err);
      setRebalanceError('Rebalancing failed. Please try again.');
    }
  };

  if (!summary) return <p>Loading portfolio summary...</p>;

  const pieData = {
    labels: ['Stock', 'Bond'],
    datasets: [
      {
        data: [summary.asset_breakdown.stock, summary.asset_breakdown.bond],
        backgroundColor: ['#4e79a7', '#f28e2c'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  const rebalanceData = rebalancingResult?.rebalanced || {};

  return (
    <div className="dashboard">
      {/* Header & Navigation */}
      <div className="dashboard-header">
        <h2>📊 Portfolio Dashboard</h2>
        <Navbar />
      </div>

      {/* Summary Section */}
      <div className="dashboard-section">
        <h3>📊 Portfolio Summary</h3>
        <div className="summary-section">
          <div className="summary-item">💸 Total Invested: ₹{summary.total_invested}</div>
          <div className="summary-item">📈 Current Value: ₹{summary.current_value}</div>
          <div className="summary-item">💰 Total PnL: ₹{summary.total_pnl}</div>
        </div>

        {/* Breakdown */}
        <h3>🔍 Asset Breakdown</h3>
        <ul className="asset-list">
          <li>📉 Stock: ₹{summary.asset_breakdown.stock}</li>
          <li>🏦 Bond: ₹{summary.asset_breakdown.bond}</li>
        </ul>

        {/* Pie Chart */}
        <h3>📊 Asset Allocation</h3>
        <div className="chart-wrapper" style={{ maxWidth: '280px', margin: '0 auto' }}>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
            width={250}
            height={250}
          />
        </div>

        {/* Rebalancing Section */}
        <h3>🔄 Rebalance Portfolio</h3>
        <button onClick={handleRebalance}>Rebalance Now</button>

        {rebalanceError && (
          <p style={{ color: 'red', marginTop: '10px' }}>{rebalanceError}</p>
        )}

        {rebalancingResult && (
          <div className="rebalance-result" style={{ marginTop: '16px' }}>
            {Object.keys(rebalanceData).length === 0 ? (
              <p style={{ color: '#16a34a', fontSize: '16px' }}>
                ✅ No rebalancing needed. Your portfolio is already balanced.
              </p>
            ) : (
              <>
                <h4>📋 Recommended Actions</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Current Value (₹)</th>
                      <th>Target Value (₹)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(rebalanceData).map(([symbol, data], index) => (
                      <tr key={index}>
                        <td>{symbol}</td>
                        <td>{data.current_value}</td>
                        <td>{data.target_value}</td>
                        <td>{data.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;