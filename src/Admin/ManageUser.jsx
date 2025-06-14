// src/admin/ManageUsers.jsx
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

const ManageUsers = () => {
  // Use state so you can add delete/edit functionality later
  const [users, setUsers] = useState([
    { id: 1, name: 'User A', email: 'a@gmail.com' },
    { id: 2, name: 'User B', email: 'b@gmail.com' }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

 

  return (
    <div style={{ padding: '20px' }}>
      <AdminNavbar />
      <h2>Manage Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1" cellPadding="10">
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ textAlign: 'center' }}>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>Delete</button>
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
