import React, { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import InvestmentForm from './InvestmentForm';
import InvestmentList from './InvestmentList';
import PredictionResults from './PredictionResults';
ChartJS.register(ArcElement, Tooltip, Legend);

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


  const pieData = {
  labels: ['Stock', 'Bond'],
  datasets: [
    {
      label: '₹ Value',
      data: [summary.asset_breakdown.stock, summary.asset_breakdown.bond],
      backgroundColor: ['#4e79a7', '#f28e2c'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 1,
    },
  ],
};

const pieOptions = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

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
      <h3>📊 Asset Allocation</h3>
     <div style={{ maxWidth: '400px', marginTop: '10px' }}>
    <Pie data={pieData} options={pieOptions} />
   </div>
   <PredictionResults />
   <InvestmentForm onAdded={() => {
  // Trigger the same fetch function again to update the summary
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
}} />

<InvestmentList />
    </div>
   
  );
};

export default Dashboard;
