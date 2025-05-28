import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const getCategoryStyle = (categoryName) => {
  const styles = {
    Fantasy: {
      bgColor: '#e6f7ff',
      textColor: '#075985',
      borderColor: '#bae6fd'
    },
    Novels: {
      bgColor: '#f5eeff',
      textColor: '#4b0082',
      borderColor: '#d9c7ff'
    },
    'Self-Help': {
      bgColor: '#f0fff4',
      textColor: '#065f46',
      borderColor: '#a7f3d0'
    },  
  };
  
  return styles[categoryName] || {
    bgColor: '#f5f5f5',
    textColor: '#333',
    borderColor: '#ddd'
  };
};

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from API
    fetch('http://localhost:5000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  // Group books by category
  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>Categories</h2>
      {Object.entries(groupedBooks).map(([categoryName, booksInCategory], catIndex) => {
        const categoryStyle = getCategoryStyle(categoryName);
        return (
          <div
            key={catIndex}
            style={{
              ...styles.categorySection,
              backgroundColor: categoryStyle.bgColor,
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: `1px solid ${categoryStyle.borderColor}`
            }}
          >
            <h3 style={{
              ...styles.categoryTitle,
              color: categoryStyle.textColor,
              borderLeft: `4px solid ${categoryStyle.textColor}`
            }}>
              {categoryName}
            </h3>
            <div style={styles.grid}>
              {booksInCategory.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id} // Pass id prop
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

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '0 1rem',
  },
  mainTitle: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  categorySection: {
    marginBottom: '3rem',
  },
  categoryTitle: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'left',
    paddingLeft: '1rem',
    fontWeight: '500',
  },
};

export default BookList;