import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/main.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);   
  const handleLogin = async(e) => {
    e.preventDefault();
     setLoading(true);
         
     const email = e.target.email.value;
     const password = e.target.password.value;

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
       setLoading(false);
      return;
    }

     try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Optional: Save JWT
        alert('Login successful!');
        navigate('/'); // ✅ Navigate to home page
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data?.msg) {
        alert(`Error: ${err.response.data.msg}`);
      } else {
        alert('Server error during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box neon-border cyan-yellow">
        <h3 className="text-center text-white mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3 input-icon">
            <label>Email</label>
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email" className="form-control neon-input" name="email" required />
          </div>
          <div className="form-group mb-4 input-icon">
            <label>Password</label>
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              className="form-control neon-input"
              name="password"
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="neon-button" disabled={loading}>{loading ? 'Logging in...' : 'LOGIN'}</button>
        </form>
        <div className="text-center mt-3 small-links">
          <Link to="/forgot-password">Forgot Password ?</Link> | <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
