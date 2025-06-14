import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';
import { FaCreditCard } from 'react-icons/fa';

const Payment = () => {
  const { clearCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const total = (subtotal * 1.05).toFixed(2);

  const clearBackendCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      const res = await fetch('http://localhost:5000/cart/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      });
      return res.ok;
    }
    return false;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');

    // Simulate payment processing delay
    setTimeout(async () => {
      const cleared = await clearBackendCart();
      setIsProcessing(false);
      if (cleared) {
        setPaymentSuccess(true);
        clearCart();
      } else {
        setPaymentError('Payment succeeded but failed to clear cart. Please refresh.');
      }
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setPaymentError('');
    // Simulate PayPal processing delay
    setTimeout(async () => {
      const cleared = await clearBackendCart();
      setIsProcessing(false);
      if (cleared) {
        setPaymentSuccess(true);
        clearCart();
      } else {
        setPaymentError('PayPal payment received but cart not cleared. Please refresh.');
      }
    }, 1500);
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;

  if (paymentSuccess) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <h2 style={styles.successTitle}>Payment Successful!</h2>
          <p style={styles.successText}>Thank you for your purchase.</p>
          <p style={styles.successText}>Your order has been placed successfully.</p>
          <p style={styles.successAmount}>Total Paid: Rs. {total}</p>
          <button 
            style={styles.continueShopping}
            onClick={() => window.location.href = '/'}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Payment Method</h2>
      {paymentError && (
        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
          {paymentError}
        </div>
      )}
      <div style={styles.paymentMethods}>
        <div
          style={{
            ...styles.methodCard,
            borderColor: paymentMethod === 'creditCard' ? '#6c0909' : '#ddd'
          }}
          onClick={() => setPaymentMethod('creditCard')}
        >
          <FaCreditCard style={styles.methodIcon} />
          <span>Credit/Debit Card</span>
        </div>
        <div
          style={{
            ...styles.methodCard,
            borderColor: paymentMethod === 'paypal' ? '#003087' : '#ddd'
          }}
          onClick={() => setPaymentMethod('paypal')}
        >
          <img 
            src="/paypal.png" 
            alt="PayPal" 
            style={{ width: '80px', height: 'auto', marginBottom: '10px' }}
          />
          <span>PayPal</span>
        </div>
      </div>

      {paymentMethod === 'creditCard' && (
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
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Tax:</span>
              <span>Rs. {(subtotal * 0.05).toFixed(2)}</span>
            </div>
            <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.payButton}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay Rs. ${total}`}
          </button>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div style={styles.altMethod}>
          <p>Click below to simulate PayPal payment.</p>
          <button 
            style={{ ...styles.payButton, backgroundColor: '#003087' }}
            onClick={handlePayPalPayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing PayPal...' : `Pay Rs. ${total} with PayPal`}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#6c0909'
  },
  paymentMethods: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1.5rem',
  },
  methodCard: {
    cursor: 'pointer',
    padding: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    width: '150px',
    userSelect: 'none',
    transition: 'border-color 0.3s',
  },
  methodIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#6c0909',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  row: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  summary: {
    backgroundColor: '#f7f7f7',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
  summaryTitle: {
    marginBottom: '0.5rem',
    color: '#6c0909',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.3rem',
  },
  totalRow: {
    fontWeight: '700',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
  },
  payButton: {
    padding: '0.75rem',
    backgroundColor: '#6c0909',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    userSelect: 'none',
  },
  altMethod: {
    textAlign: 'center',
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    padding: '2rem',
  },
  successCard: {
    border: '2px solid #6c0909',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '400px',
    backgroundColor: '#fff',
  },
  successTitle: {
    color: '#6c0909',
    marginBottom: '1rem',
  },
  successText: {
    marginBottom: '0.5rem',
  },
  successAmount: {
    fontWeight: '700',
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  continueShopping: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6c0909',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    userSelect: 'none',
  }
};

export default Payment;
