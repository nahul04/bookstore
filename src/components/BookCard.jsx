import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

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
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  const handleViewDetails = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="book-card">
      <img src={book?.image || image} alt={book?.title || title} className="book-image" />
      <h3 className="book-title">{book?.title || title}</h3>
      <p className="book-author">by {book?.author || author}</p>
      <p className="book-price">Rs.{book?.price || price}</p>
      
      <button className="view-details-button" onClick={handleViewDetails}>
        View Details
      </button>
      <button className="add-cart-button" onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
