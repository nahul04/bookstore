
import React from 'react';
import AdminNavbar from './AdminNavbar';

const ViewOrders = () => {
  const orders = [
    { id: 1, user: 'User A', total: 250 },
    { id: 2, user: 'User B', total: 300 }
  ];

  return (
    <div>
      <AdminNavbar />
      <h2>View Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Order #{order.id} - {order.user} - Rs.{order.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrders;
