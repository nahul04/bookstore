import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.webp';
import './Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("userLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <h2 className="logo-text">Bookstore</h2>
      </div>

      <div className="nav-links">
        <Link to="/" className="link">Home</Link>
        <Link to="/aboutus" className="link">AboutUs</Link>
        <Link to="/categories" className="link">Categories</Link>
        <Link to="/cart" className="link">Cart</Link>

        {isUserLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <Link to="/login" className="link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
