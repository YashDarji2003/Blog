// src/pages/ResetPassword.jsx
import React from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import '../styles/main.css';

const ResetPassword = () => {
  const navigate = useNavigate();
const location = useLocation();
  const email = location.state?.email;
  const handleReset = async(e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    // 1. Ensure minimum length of 6 characters
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // 2. Ensure both entries match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

     try {
      const response = await fetch('http://localhost:4000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to reset password.');
        return;
      }

      alert('Your password has been reset successfully.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box neon-border teal-gold">
        <h3 className="text-center mb-4 text-white">RESET PASSWORD</h3>
        <form onSubmit={handleReset}>
          <div className="form-group mb-3">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              className="form-control neon-input"
              placeholder="At least 6 characters"
              required
              minLength="6"
            />
          </div>
          <div className="form-group mb-4">
            <label>Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control neon-input"
              placeholder="Re-enter your new password"
              required
              minLength="6"
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

export default ResetPassword;
