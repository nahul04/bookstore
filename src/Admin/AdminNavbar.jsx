// src/admin/AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <Link to="/admin/dashboard"></Link>
        <Link to="/admin/add-book"></Link>
        <Link to="/admin/manage-books"></Link>
        <Link to="/admin/manage-users"></Link>
        <Link to="/admin/view-orders"></Link>
        <Link to="/admin"></Link>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
