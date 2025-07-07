import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setTokens } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('token/', { username, password });
      setTokens(res.data); // Save to context
      onSuccess();         // Switch to dashboard
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🔐 Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
