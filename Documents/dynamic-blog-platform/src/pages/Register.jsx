import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async(e) => {
    e.preventDefault();
    setLoading(true);
     // 1. Extract form data
    const firstName   = e.target.firstName.value.trim();
    const lastName    = e.target.lastName.value.trim();
    const email       = e.target.email.value.trim();
    const role        = e.target.role.value;           // "creator" or "viewer"
    const password    = e.target.password.value.trim();
   // const phoneNumber = e.target.phoneNumber.value.trim();
     // 2. Basic client-side validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    if (!role) {
      alert('Please select a role.');
      setLoading(false);
      return;
    }
      const payload = {
      username:  `${firstName} ${lastName}`, // or send separate fields if your API expects them separately
      email,
      password,
      role,           // must be either "creator" or "viewer"
      // If you want to store phoneNumber in the DB, add it to your schema and controller as well.
      // phoneNumber,
    };

  try {
      // 4. Make POST request to backend
      const res = await axios.post(
        'http://localhost:4000/api/auth/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        // In case your backend returns a 200 with a message
        alert(res.data.msg || 'Registered, but please verify your email.');
        navigate('/login');
      }
    }
    catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data?.msg) {
        alert(`Error: ${err.response.data.msg}`);
      } else {
        alert('Server error during registration.');
      }
    } finally {
      setLoading(false);
    }

    // ✅ Valid password - proceed to login
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box neon-border cyan-yellow">
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label>First Name</label>
            <input type="text" 
            className="form-control neon-input" 
            name="firstName"
            required />
          </div>
          <div className="form-group mb-3">
            <label>Last Name</label>
            <input type="text"
             className="form-control neon-input"
             name="lastName"
             required />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" 
            className="form-control neon-input" 
            name="email"
            required />
          </div>
           <div className="form-group mb-3">
            <label>Select Role</label>
            <select name="role" 
            className="form-control neon-input" 
            required>
              <option value="">-- Choose Role --</option>
              <option value="creator">Blog Creator</option>
              <option value="viewer">Blog Viewer</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control neon-input"
              placeholder="At least 6 characters"
              required
              minLength="6"
            />
          </div>
          <div className="form-group mb-4">
            <label>Phone Number</label>
            <input type="text" 
            className="form-control neon-input" 
            name="phoneNumber"
            required />
          </div>
          <button type="submit"
           className="neon-button"
           disabled={loading}>REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
