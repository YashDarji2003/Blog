// src/pages/Home.jsx
import React from 'react';
import { FaHome } from 'react-icons/fa';
import '../styles/main.css';

const Home = () => {
  return (
    <div className="home-page-container">
      <div className="home-icon-container">
        <FaHome className="home-icon" />
      </div>
      <h1 className="home-heading">Welcome to To-Let Globe</h1>
      <p className="home-subtext">
        "Find your perfect rental — no brokers, no hassle, just smart living."
      </p>
    </div>
  );
};

export default Home;
