// src/admin/ManageUsers.jsx
import React from 'react';
import AdminNavbar from './AdminNavbar';

const ManageUsers = () => {
  const users = [
    { id: 1, name: 'User A', email: 'a@gmail.com' },
    { id: 2, name: 'User B', email: 'b@gmail.com' }
  ];

  return (
    <div>
      <AdminNavbar />
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
