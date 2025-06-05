import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  return (
    <nav className="clean-navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="To-Let Logo" className="nav-logo-img" />
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/property">Property Listing</Link>
          <Link to="/create">Add Blog</Link>
        </div>

        <div className="nav-auth">
          <Link to="/login" className="auth-btn">Login / Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
