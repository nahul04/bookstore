import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';
import { FaCreditCard } from 'react-icons/fa';

const Payment = () => {
  const { clearCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/cart?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      })
      .catch(() => {
        setCartItems([]);
        setLoading(false);
      });
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const total = (subtotal * 1.05).toFixed(2);

  const clearBackendCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) return false;

    const res = await fetch('http://localhost:5000/cart/clear', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    });
    return res.ok;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');

    setTimeout(async () => {
      const cleared = await clearBackendCart();
      setIsProcessing(false);
      if (cleared) {
        setPaymentSuccess(true);
        clearCart();
      } else {
        setPaymentError('Payment succeeded but failed to clear cart.');
      }
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;

  if (paymentSuccess) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <h2 style={styles.successTitle}>Payment Successful!</h2>
          <p style={styles.successText}>Thank you for your purchase.</p>
          <p style={styles.successText}>Order placed successfully.</p>
          <p style={styles.successAmount}>Total Paid: Rs. {total}</p>
          <button style={styles.continueShopping} onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
const handlePlaceOrder = async () => {
  const orderData = {
    user: "User A", // Replace with actual logged-in user
    total: 550.00,
    date: new Date().toISOString().split("T")[0], // format: yyyy-mm-dd
    status: "Processing"
  };

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      alert("Order placed successfully!");
    } else {
      alert("Order failed");
    }
  } catch (err) {
    console.error("Error placing order:", err);
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Payment</h2>
      {paymentError && (
        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{paymentError}</div>
      )}

      <form onSubmit={handlePaymentSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Card Number</label>
          <input
            type="text"
            name="number"
            value={cardDetails.number}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            style={styles.input}
            required
            maxLength={19}
            pattern="\d{4} \d{4} \d{4} \d{4}"
            title="Enter card number in format: 1234 5678 9012 3456"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cardholder Name</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            placeholder="Name"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.row}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Expiry Date</label>
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              style={styles.input}
              required
              maxLength={5}
              pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
              title="Enter expiry date in MM/YY format"
            />
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>CVV</label>
            <input
              type="password"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              placeholder="123"
              style={styles.input}
              required
              maxLength={4}
              pattern="\d{3,4}"
              title="Enter 3 or 4 digit CVV"
            />
          </div>
        </div>

        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          <div style={styles.summaryRow}><span>Subtotal:</span><span>Rs. {subtotal.toFixed(2)}</span></div>
          <div style={styles.summaryRow}><span>Shipping:</span><span>Free</span></div>
          <div style={styles.summaryRow}><span>Tax:</span><span>Rs. {(subtotal * 0.05).toFixed(2)}</span></div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}><span>Total:</span><span>Rs. {total}</span></div>
        </div>

        <button type="submit" style={styles.payButton} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `Pay Rs. ${total}`}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontFamily: "'Poppins', sans-serif",
    background: '#fff',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#b52323',
    fontSize: '1.8rem',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    background: '#fdfdfd',
  },
  formGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#444',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.6rem 0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    background: '#fff',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.2rem',
  },
  summary: {
    background: '#f3f4f6',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  summaryTitle: {
    marginBottom: '0.75rem',
    fontWeight: '700',
    fontSize: '1.1rem',
    color: '#b52323',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
  totalRow: {
    fontWeight: '700',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
  },
  payButton: {
    padding: '0.9rem',
    backgroundColor: '#b52323',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  successCard: {
    border: '3px solid #28a745',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
  },
  successTitle: {
    color: '#28a745',
    marginBottom: '1rem',
    fontSize: '1.6rem',
    fontWeight: '700',
  },
  successText: {
    marginBottom: '0.5rem',
    color: '#333',
  },
  successAmount: {
    fontWeight: '700',
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  continueShopping: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#b52323',
    color: '#fff',
    fontWeight: '700',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default Payment;
