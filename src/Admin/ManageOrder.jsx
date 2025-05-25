import React from 'react';
import './admin.css';

const ViewOrders = () => {
  const orders = [
    { id: 1, user: 'Ramya', total: 500, status: 'Delivered' },
  ];

  return (
    <div className="admin-manage">
      <h2>View Orders</h2>
      <table>
        <thead>
          <tr><th>User</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.user}</td><td>{order.total}</td><td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
