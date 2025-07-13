import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import InvestmentForm from './InvestmentForm';

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [editing, setEditing] = useState(null);
  const { tokens } = useContext(AuthContext);

  const fetchInvestments = async () => {
    try {
      const res = await API.get('investments/', {
        headers: {
          Authorization: `Bearer ${tokens?.access}`
        }
      });
      setInvestments(res.data);
    } catch (err) {
      console.error('Fetch failed', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`investments/${id}/`, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`
        }
      });
      fetchInvestments();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <div>
      <InvestmentForm onAdded={fetchInvestments} editing={editing} setEditing={setEditing} />

      <h3>📄 Your Investments</h3>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Type</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.symbol}</td>
              <td>{inv.quantity}</td>
              <td>₹{inv.buy_price}</td>
              <td>{inv.asset_type}</td>
              <td>{inv.buy_date}</td>
              <td>
                <button onClick={() => handleEdit(inv)} style={{ marginRight: '8px' }}>✏️ Edit</button>
                <button onClick={() => handleDelete(inv.id)} style={{ backgroundColor: 'red', color: 'white' }}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentList;
