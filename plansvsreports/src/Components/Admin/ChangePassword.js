import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put('http://localhost:3000/change-password', passwords, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setMessage(res.data.Message);
          setError('');
        } else {
          setMessage('');
          setError(res.data.Error);
        }
      })
      .catch((err) => {
        setMessage('');
        setError('An error occurred while changing the password');
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <div className="text-success">{message}</div>}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default ChangePassword;
