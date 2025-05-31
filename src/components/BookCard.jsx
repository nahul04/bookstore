import React from 'react';

const BookCard = ({ id, title, image, author, price }) => {
  const handleAdd = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('Please login to add to cart');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, book_id: id })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || 'Failed to add to cart');
      } else {
        alert('Book added to cart!');
      }
    } catch (err) {
      alert('Failed to add to cart');
    }
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

export default BookCard;
