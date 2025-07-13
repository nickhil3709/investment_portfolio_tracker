import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const PredictionResults = () => {
  const { tokens } = useContext(AuthContext);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await API.get('predict/', {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        setPredictions(res.data);
      } catch (err) {
        console.error('Prediction fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [tokens]);

  if (loading) return <p>Loading predictions...</p>;

  return (
    <div className="prediction-section">
      <h3>📈 Stock Predictions</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price (₹)</th>
            <th>7-Day Forecast (₹)</th>
            <th>30-Day Forecast (₹)</th>
            <th>MAE</th>
            <th>RMSE</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(predictions).map(([symbol, data]) => (
            <tr key={symbol}>
              <td>{symbol}</td>
              <td>{data.current_price ?? 'N/A'}</td>
              <td>{data.predicted_price_7d ?? 'N/A'}</td>
              <td>{data.predicted_price_30d ?? 'N/A'}</td>
              <td>{data.backtest_mae ?? 'N/A'}</td>
              <td>{data.backtest_rmse ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📊 Backtest Charts */}
      {Object.entries(predictions).map(([symbol, data]) => {
        if (
          data.backtest_actual?.length > 0 &&
          data.backtest_predicted?.length > 0
        ) {
          const chartData = {
            labels: data.backtest_actual.map((_, i) => `Day ${i + 1}`),
            datasets: [
              {
                label: 'Actual',
                data: data.backtest_actual,
                borderColor: 'green',
                tension: 0.3,
                fill: false,
              },
              {
                label: 'Predicted',
                data: data.backtest_predicted,
                borderColor: 'red',
                tension: 0.3,
                fill: false,
              },
            ],
          };

          const options = {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `📉 Backtesting for ${symbol}`,
              },
              legend: {
                position: 'bottom',
              },
            },
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          };

          return (
            <div key={`${symbol}-chart`} style={{ marginTop: '2rem' }}>
              <Line data={chartData} options={options} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PredictionResults;
