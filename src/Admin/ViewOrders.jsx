import React from 'react';
import AdminNavbar from './AdminNavbar';
import './ViewOrders.css'; // Optional: Add styling

const ViewOrders = () => {
  const orders = [
    {
      id: 1,
      user: 'User A',
      total: 250,
      date: '2025-06-10',
      status: 'Delivered'
    },
    {
      id: 2,
      user: 'User B',
      total: 300,
      date: '2025-06-11',
      status: 'Processing'
    }
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="orders-container">
        <h2>Customer Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total (Rs.)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
