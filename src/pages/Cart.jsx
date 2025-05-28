import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch cart items from backend
  useEffect(() => {
    fetch('http://localhost:5000/backend/cart.php', {
      method: 'GET',
      headers: {
        // Remove Content-Type for GET requests to PHP backend
        // 'Authorization': 'Bearer ' + localStorage.getItem('token'), // Uncomment if using JWT
      },
      credentials: 'include', // If using cookies/session
    })
      .then(res => res.json())
      .then(data => {
        // Defensive: handle if data is not as expected
        setCart({
          items: Array.isArray(data.items) ? data.items : [],
          total: parseFloat(data.total) || 0
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Shopping Cart</h2>
      {loading ? (
        <div>Loading...</div>
      ) : cart.items.length === 0 ? (
        <div style={styles.emptyCart}>
          <p style={styles.emptyText}>Your cart is empty</p>
          <p style={styles.emptySubtext}>Add some books to get started!</p>
        </div>
      ) : (
        <>
          <div style={styles.cartItems}>
            {cart.items.map((item) => (
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
                  <p style={styles.price}>Qty: {item.quantity}</p>
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
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  emptyText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  emptySubtext: {
    color: '#888',
  },
  cartItems: {
    marginBottom: '2rem',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #eee',
  },
  image: {
    width: '80px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    margin: '0 0 0.25rem 0',
    fontSize: '1.1rem',
    color: '#333',
  },
  author: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem',
    color: '#666',
  },
  price: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#222',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
  },
  totalContainer: {
    marginBottom: '1.5rem',
  },
  totalText: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    color: '#555',
  },
  grandTotal: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #ddd',
    fontWeight: '600',
    color: '#222',
    fontSize: '1.1rem',
  },
};

export default Cart;