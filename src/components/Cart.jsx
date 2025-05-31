import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetch('/backend/cart.php', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // adjust as needed
      }
    })
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.title} by {item.author} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <div>Total: ${cart.total}</div>
    </div>
  );
};

export default Cart;
