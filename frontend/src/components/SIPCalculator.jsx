import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const SIPCalculator = () => {
  const { tokens } = useContext(AuthContext);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState(null);

  const handleSimulate = async () => {
    try {
      const res = await API.post('sip/', {
        monthly_investment: monthlyInvestment,
        expected_annual_return: annualRate,
        years: years,
      }, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      console.log('SIP simulation response:', res.data);

      setResult(res.data);
    } catch (err) {
      console.error('SIP simulation failed:', err);
    }
  };

  return (
    <div>
      <h2>📊 SIP Simulation</h2>
      <input type="number" value={monthlyInvestment} onChange={e => setMonthlyInvestment(+e.target.value)} />
      <input type="number" value={annualRate} onChange={e => setAnnualRate(+e.target.value)} />
      <input type="number" value={years} onChange={e => setYears(+e.target.value)} />
      <button onClick={handleSimulate}>Simulate</button>

      {result && (
        <div>
          <h3>📈 Results</h3>
          <p><strong>Total Invested:</strong> ₹{result.total_invested}</p>
          <p><strong>Future Value:</strong> ₹{result.future_value}</p>
          <p><strong>Profit:</strong> ₹{result.profit}</p>

          <h4>📅 Yearly Breakdown:</h4>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Year</th>
                <th>Invested</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {result.yearly_breakdown?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.year}</td>
                  <td>₹{item.invested}</td>
                  <td>₹{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;
