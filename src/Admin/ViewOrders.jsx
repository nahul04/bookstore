import React, { useEffect, useState } from 'react';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/orders')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch orders: ' + res.status);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setError('Invalid data format received');
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders.length) {
    return <div>No orders found.</div>;
  }

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          {/* display order details */}
          <p>Order ID: {order.id}</p>
          <p>Customer: {order.customer_name}</p>
          <p>Book: {order.book_title}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total: {order.total_price}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewOrders;
