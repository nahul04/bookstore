import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import './BookList.css';

const getCategoryStyle = (categoryName) => {
  const styles = {
    Fantasy: {
      bgColor: 'rgb(202, 7, 241)',
      textColor: '#075985',
      borderColor: '#bae6fd',
    },
    Novels: {
      bgColor: '#f5eeff',
      textColor: '#4b0082',
      borderColor: '#d9c7ff',
    },
    'Self-Help': {
      bgColor: 'rgb(26, 184, 68)',
      textColor: '#065f46',
      borderColor: '#a7f3d0',
    },
  };

  return styles[categoryName] || {
    bgColor: '#f5f5f5',
    textColor: '#333',
    borderColor: '#ddd',
  };
};

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const groupedBooks = books.reduce((acc, book) => {
    const category = book.category || 'Others';
    if (!acc[category]) acc[category] = [];
    acc[category].push(book);
    return acc;
  }, {});

  return (
    <div className="booklist-container">
      <h2 className="booklist-title">Categories</h2>
      {Object.entries(groupedBooks).map(([categoryName, booksInCategory], index) => {
        const style = getCategoryStyle(categoryName);
        return (
          <div
            key={index}
            className={`category-section category-${categoryName.toLowerCase().replace(/\s/g, '')}`}
            style={{ backgroundColor: style.bgColor, borderColor: style.borderColor }}
          >
            <h3
              className="category-title"
              style={{ color: style.textColor, borderLeftColor: style.textColor }}
            >
              {categoryName}
            </h3>
            <div className="booklist-grid">
              {booksInCategory.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  image={book.image}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
