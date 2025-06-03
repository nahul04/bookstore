import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h2>SR Bookstore</h2>
      </div>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search books..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/aboutus" style={styles.link}>AboutUs</Link>
        <Link to="/categories" style={styles.link}>Categories</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </nav>
  );
}

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
    fontWeight: '700',
    fontSize: '1.6rem',
    cursor: 'default',
  },
  searchBox: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: '400px',
    margin: '0 2rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.6rem 0.8rem',
    border: 'none',
    borderRadius: '5px 0 0 5px',
    fontSize: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    outline: 'none',
  },
  searchButton: {
    backgroundColor: 'rgb(189, 52, 189)',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
    fontWeight: '700',
    color: 'white',
    transition: 'background-color 0.3s ease',
  },
  navLinks: {
    display: 'flex',
    gap: '1.2rem',
    flexWrap: 'wrap',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '0.5rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
