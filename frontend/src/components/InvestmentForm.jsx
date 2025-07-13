import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const InvestmentForm = ({ onAdded, editing, setEditing }) => {
  const [form, setForm] = useState({
    symbol: '',
    quantity: '',
    buy_price: '',
    asset_type: 'STOCK',
    buy_date: ''
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`investments/${editing.id}/`, form);
        setEditing(null);
      } else {
        await API.post('investments/', form);
      }
      setForm({
        symbol: '',
        quantity: '',
        buy_price: '',
        asset_type: 'STOCK',
        buy_date: ''
      });
      onAdded(); // Refresh
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editing ? '✏️ Edit Investment' : '➕ Add Investment'}</h3>
      <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="📘 Symbol (e.g. AAPL)" required />
      <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="📘 Quantity" required />
      <input name="buy_price" value={form.buy_price} onChange={handleChange} type="number" placeholder="📗 Buy Price" required />
      <select name="asset_type" value={form.asset_type} onChange={handleChange}>
        <option value="STOCK">Stock</option>
        <option value="BOND">Bond</option>
      </select>
      <input name="buy_date" value={form.buy_date} onChange={handleChange} type="date" required />
      <button type="submit" style={{ backgroundColor: editing ? '#4CAF50' : '#22a6b3', color: 'white' }}>
        {editing ? '✅ Update' : '➕ Add'}
      </button>
    </form>
  );
};

export default InvestmentForm;
