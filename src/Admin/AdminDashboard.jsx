import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/admin/manage-books')}>Manage Books</button>
        <button onClick={() => navigate('/admin/manage-users')}> Manage Users</button>
        <button onClick={() => navigate('/admin/view-orders')}> View Orders</button>
        <button className="logout-button" onClick={handleLogout}> Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
