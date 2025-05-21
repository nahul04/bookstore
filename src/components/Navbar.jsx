
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h2> Online Bookstore</h2>
      </div>
      <div style={styles.searchBox}>
        <input type="text" placeholder="Search books..." style={styles.searchInput} />
        <button style={styles.searchButton}>Search</button>
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/categories" style={styles.link}>Categories</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>


      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(to right, #4B0082, #800080)',
    padding: '1rem 2rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
  },
  logo: {
    fontWeight: 'bold',
  },
  searchBox: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: '400px',
    margin: '0 2rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.5rem',
    border: 'none',
    borderRadius: '5px 0 0 5px',
    fontSize: '1rem',
  },
  searchButton: {
    backgroundColor: 'rgb(189, 52, 189)',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem',
    transition: '0.3s',
  },
};

export default Navbar;