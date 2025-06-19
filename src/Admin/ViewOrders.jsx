import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './ViewOrders.css';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="view-orders-container">
        <h2>Customer Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Book Title</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_name}</td>
                <td>{order.book_title}</td>
                <td>{order.quantity}</td>
                <td>Rs. {order.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
