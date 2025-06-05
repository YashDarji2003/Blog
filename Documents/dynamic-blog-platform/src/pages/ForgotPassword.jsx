// src/pages/ForgotPassword.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReset = async(e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

     try {
      const response = await fetch('http://localhost:4000/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Email not found.');
        return;
      }
    // TODO: Here you could dispatch your “send reset‐link to this email” API call.
    // For now, we simply navigate to the reset form.
    navigate('/reset-password', { state: { email } });
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box neon-border teal-gold">
        <h3 className="text-center mb-4 text-white">FORGOT PASSWORD</h3>
        <form onSubmit={handleReset}>
          <div className="form-group mb-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control neon-input"
              placeholder="Enter your account email"
              required
            />
          </div>
          <button type="submit" className="neon-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
