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

  // Fetch cart items from backend to ensure accurate subtotal
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

  // Calculate total including quantity
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Calcula
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
    // Fake payment processing
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
              placeholder="Uzair"
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
            {isProcessing ? 'Processing...' : `Pay Rs. ${total}`}
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  paymentMethods: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  methodCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
  },
  methodIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: '#6c0909',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  row: {
    display: 'flex',
    gap: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    margin: '2rem 0',
  },
  summaryTitle: {
    marginTop: 0,
    marginBottom: '1rem',
    color: '#333',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    color: '#555',
  },
  totalRow: {
    borderTop: '1px solid #ddd',
    paddingTop: '0.75rem',
    fontWeight: '600',
    color: '#333',
  },
  payButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#6c0909',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  altMethod: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  bankDetails: {
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem 0',
  },
  note: {
    fontSize: '0.9rem',
    color: '#777',
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    padding: '2rem',
  },
  successCard: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '500px',
  },
  successTitle: {
    color: '#6c0909',
    marginBottom: '1rem',
  },
  successText: {
    color: '#555',
    marginBottom: '0.5rem',
  },
  successAmount: {
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '1.5rem 0',
    color: '#333',
  },
  continueShopping: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6c0909',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default Payment;