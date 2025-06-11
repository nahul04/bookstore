import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return setLoading(false);

    fetch(`http://localhost:5000/cart?user_id=${user.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not authorized or error fetching cart');
        return res.json();
      })
      .then(data => {
        setCart({
          items: Array.isArray(data.items) ? data.items : [],
          total: parseFloat(data.total) || 0
        });
        setLoading(false);
      })
      .catch(() => {
        setCart({ items: [], total: 0 });
        setLoading(false);
      });
  }, []);

  const total = cart.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handlePayNow = () => {
    navigate('/payment');
  };

  const handleClearCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) return;
    await fetch('http://localhost:5000/cart/clear', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    });
    setCart({ items: [], total: 0 });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Shopping Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cart.items.length === 0 ? (
        <div style={styles.emptyCart}>
          <p style={styles.emptyText}>🛒 Your cart is empty</p>
          <p style={styles.emptySubtext}>Add some books and come back!</p>
        </div>
      ) : (
        <>
          <div style={styles.cartItems}>
            {cart.items.map(item => (
              <div key={item.id || item.book_id} style={styles.item}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.image}
                  />
                )}
                <div style={styles.itemDetails}>
                  <h4 style={styles.title}>{item.title}</h4>
                  <p style={styles.author}>by {item.author}</p>
                  <p style={styles.price}>Rs. {Number(item.price).toFixed(2)}</p>
                  <p style={styles.quantity}>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <div style={styles.totalContainer}>
              <h3 style={styles.totalText}>Order Summary</h3>
              <div style={styles.totalRow}>
                <span>Subtotal:</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div style={{ ...styles.totalRow, ...styles.grandTotal }}>
                <span>Total:</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>
            <button style={styles.payButton} onClick={handlePayNow}>Pay Now</button>
            <button style={styles.clearButton} onClick={handleClearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333'
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#4B0082',
    borderBottom: '2px solid #eee',
    paddingBottom: '0.5rem'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#fce4ec',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  emptyText: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#880E4F',
    marginBottom: '0.5rem',
  },
  emptySubtext: {
    color: '#666',
    fontSize: '1rem',
  },
  cartItems: {
    marginBottom: '2rem',
  },
  item: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ddd',
  },
  image: {
    width: '90px',
    height: '130px',
    objectFit: 'cover',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '0.3rem',
    color: '#333',
  },
  author: {
    fontSize: '0.9rem',
    color: '#777',
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '1rem',
    color: '#000',
    fontWeight: '600',
  },
  quantity: {
    fontSize: '0.95rem',
    color: '#555',
  },
  summary: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  totalContainer: {
    marginBottom: '1.5rem',
  },
  totalText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '1rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    fontSize: '1rem',
    color: '#555',
  },
  grandTotal: {
    borderTop: '1px solid #ccc',
    marginTop: '1rem',
    paddingTop: '1rem',
    fontWeight: '700',
    fontSize: '1.2rem',
    color: '#000',
  },
  payButton: {
    padding: '0.9rem 2rem',
    backgroundColor: 'rgb(130, 0, 87)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '1rem',
    transition: 'background 0.3s ease',
  },
  clearButton: {
    padding: '0.9rem 2rem',
    backgroundColor: 'rgb(151, 5, 180)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  }
};

export default Cart;
