// src/components/BookCard.jsx
import React from 'react';
import './BookCard.css';

const BookCard = ({  title, author, price, image, onViewDetails }) => {
  return (
    <div className="book-card">
      <img src={image} alt={title} className="book-image" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">by {author}</p>
      <p className="book-price">${price}</p>
      <button onClick={onViewDetails} className="view-button">
        View Details
      </button>
    </div>
    
  );
};

export default BookCard;
