// src/admin/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './ManageUser.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

  // Delete user by id - calls backend DELETE API
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Delete failed');
          // Remove user from state after successful delete
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(err => {
          alert('Failed to delete user');
          console.error(err);
        });
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="manage-users-container" style={{ padding: '20px' }}>
      <AdminNavbar />
      <h2>Manage Users</h2>

      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table
          style={{ width: '100%', borderCollapse: 'collapse' }}
          border="1"
          cellPadding="10"
        >
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ textAlign: 'center' }}>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{ color: 'red', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
