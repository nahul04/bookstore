import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/admin/books">Manage Books</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/orders">View Orders</Link></li>
          <li><Link to="/admin/add-book">Add Book</Link></li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
