import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi'; // Import trash icon from react-icons

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p style={styles.emptyText}>Your cart is empty</p>
          <p style={styles.emptySubtext}>Add some books to get started!</p>
        </div>
      ) : (
        <>
          <div style={styles.cartItems}>
            {cartItems.map((item, index) => (
              <div key={index} style={styles.item}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={styles.image} 
                />
                <div style={styles.itemDetails}>
                  <h4 style={styles.title}>{item.title}</h4>
                  <p style={styles.author}>by {item.author}</p>
                  <p style={styles.price}>Rs. {item.price.toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(index)} 
                    style={styles.removeButton}
                  >
                    <FiTrash2 style={{ marginRight: '5px' }} />
                    Remove
                  </button>
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
            
            <div style={styles.actionButtons}>
              <button 
                onClick={clearCart} 
                style={styles.clearButton}
              >
                Clear Cart
              </button>
              <button 
                style={styles.checkoutButton}
                onClick={() => window.location.href = '/payment'}
              >
                Proceed to Checkout
              </button>
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
  removeButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    color: '#d32f2f',
    border: '1px solid #d32f2f',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.9rem',
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
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  clearButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: 1,
  },
  checkoutButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6c0909',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: 2,
    fontWeight: '600',
  },
};

export default Cart;