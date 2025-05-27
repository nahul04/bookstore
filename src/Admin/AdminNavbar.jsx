// src/admin/AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/add-book">Add Book</Link></li>
        <li><Link to="/admin/manage-books">Manage Books</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
        <li><Link to="/admin/view-orders">View Orders</Link></li>
        <li><Link to="/admin">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
