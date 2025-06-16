import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

// Adjust the path to your default image in the assets folder
import defaultBookImage from '../assets/harry.jpg';

const BookCard = ({ id, book, title, image, author, price }) => {
  const navigate = useNavigate();

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
    } catch {
      alert('Failed to add to cart');
    }
  };

  const handleViewDetails = () => {
    navigate(`/book/${id}`);
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

  // Use the image from DB if present, else use the default image from assets
  const bookImage = image && image.trim() !== '' ? image : defaultBookImage;
    // const bookImage = defaultBookImage;

  return (
    <div className="book-card" style={styles.card}>
      <img src={bookImage} alt={title} style={styles.image} />
      <h3 className="book-title">{book?.title || title}</h3>
      <p className="book-author">by {book?.author || author}</p>
      <p className="book-price" style={styles.price}>Rs.{book?.price || price}</p>
      
      <button className="view-details-button" onClick={handleViewDetails}>
        View Details
      </button>
      <button className="add-cart-button" onClick={handleAdd} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
