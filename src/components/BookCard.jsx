import React, { useContext } from 'react';
import CartContext from '../context/CartContext';


const BookCard = ({ title, image, author, price }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart({ title, image, author, price });
  };

  const styles = {
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    image: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      marginBottom: '12px'
    },
    price: {
      fontWeight: 'bold',
      marginTop: '8px'
    },
    button: {
      marginTop: '10px',
      padding: '8px 12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>by {author}</p>
      <p style={styles.price}>Rs.{price}</p>
      <button style={styles.button} onClick={handleAdd}>Add to Cart</button>
    </div>
  );
};

export default BookCard;//this comment
