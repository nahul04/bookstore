import React from 'react';
import './admin.css';

const ManageUsers = () => {
  const users = [
    { id: 1, name: 'Ramya', email: 'ramya@gmail.com' },
  ];

  return (
    <div className="admin-manage">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
