import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/books">Manage Books</Link>
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/orders">View Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
