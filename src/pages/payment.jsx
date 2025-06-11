import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';


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

//subtotal
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/cart?user_id=${user.id}`, {
      method: 'GET',
    })
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

  
  const total =(subtotal * 1.05).toFixed(2);

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

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  }

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
            borderColor: paymentMethod === 'cashOnDelivery' ? 'rgb(136, 16, 143)' : '#ddd'
          }}
          onClick={() => setPaymentMethod('cashOnDelivery')}
        >
          <FaMoneyBillWave style={styles.methodIcon} />
          <span>Cash on Delivery</span>
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
              />
            </div>
            
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                placeholder="123"
                style={styles.input}
                required
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
            {isProcessing ? 'Processing...' : ` Rs. ${total}`}
          </button>
        </form>
      )}
      
      {paymentMethod === 'cashOnDelivery' && (
        <div style={styles.altMethod}>
          <p>Pay cash when your order is delivered</p>
          <button 
            style={styles.payButton}
            onClick={async () => {
              setIsProcessing(true);
              setPaymentError('');
              setTimeout(async () => {
                const cleared = await clearBackendCart();
                setIsProcessing(false);
                if (cleared) {
                  setPaymentSuccess(true);
                  clearCart();
                } else {
                  setPaymentError('Order placed but failed to clear cart. Please refresh.');
                }
              }, 1000);
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Confirm Order (Rs. ${total})`}
          </button>
        </div>
      )}
    </div>
  );
}; 
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    backgroundColor: '#fafafa',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#880E4F',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  paymentMethods: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem',
    marginBottom: '2rem',
  },
  methodCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: '0.3s ease',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  methodIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.75rem',
    color: '#880E4F',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontSize: '1rem',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: '0.2s',
    outline: 'none',
  },
  summary: {
    backgroundColor: '#fff0f5',
    padding: '1.75rem',
    borderRadius: '12px',
    margin: '2rem 0',
    border: '1px solid #f0d9e7',
  },
  summaryTitle: {
    marginTop: 0,
    marginBottom: '1.2rem',
    color: '#880E4F',
    fontSize: '1.3rem',
    fontWeight: '700',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    color: '#444',
  },
  totalRow: {
    borderTop: '1px solid #ccc',
    paddingTop: '0.75rem',
    fontWeight: '700',
    fontSize: '1.15rem',
    color: '#000',
  },
  payButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#880E4F',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  altMethod: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    padding: '2rem',
  },
  successCard: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '14px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
    textAlign: 'center',
    maxWidth: '500px',
  },
  successTitle: {
    color: '#880E4F',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  successText: {
    color: '#444',
    fontSize: '1.05rem',
    marginBottom: '0.75rem',
  },
  successAmount: {
    fontSize: '1.4rem',
    fontWeight: '700',
    margin: '1.5rem 0',
    color: '#000',
  },
  continueShopping: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2810c4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};



export default Payment;