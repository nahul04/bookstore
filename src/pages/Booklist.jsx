// src/components/BookList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import './BookList.css';

// Category styling function
const getCategoryStyle = (categoryName) => {
  const styles = {
    Fantasy: {
      bgColor: 'rgb(17, 1, 88)',
      textColor: 'rgb(31, 3, 110)',
      borderColor:  'rgb(23, 84, 117)',
    },
    Fiction: {
      bgColor: 'rgb(25, 3, 55)',
      textColor: 'rgb(71, 6, 117)',
      borderColor: 'rgb(112, 6, 110)',
    },
    Horror: {
      bgColor: 'rgb(58, 16, 244)',
      textColor: 'rgb(4, 9, 91)',
      borderColor: 'rgb(130, 6, 113)',
    },
    Fashion: {
      bgColor: 'rgb(67, 194, 44)',
      textColor: 'rgb(3, 52, 38)',
      borderColor: 'rgb(111, 120, 5)',
    },
    Cartoon:{
      bgColor: 'rgb(7, 128, 156)',
      textColor: 'rgb(46, 10, 108)',
      borderColor: '#a7f3d0',

    },
    novels:{
      bgColor:'rgb(143, 54, 6)',
      textColor: 'rgb(6, 51, 37)',
      borderColor: 'rgb(4, 82, 8)0',
    },
    Selfhelp:{
      bgColor: 'rgb(220, 118, 198)',
      textColor: 'rgb(30, 6, 95)',
      borderColor: '    #a7f3d0',
    }
  };

  return styles[categoryName] || {
    bgColor: 'rgb(129, 16, 16)',
    textColor: ' #333',
    borderColor: '#ddd',
  };
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Fetch book data from backend
  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  // Navigate to book details page
  const handleViewDetails = (id) => {
    navigate(`/book/${id}`);
  };

  // Group books by category
  const groupedBooks = books.reduce((acc, book) => {
    const category = book.category?.trim() || 'Others';
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    if (!acc[formattedCategory]) acc[formattedCategory] = [];
    acc[formattedCategory].push(book);
    return acc;
  }, {});

  const categories = ['All', ...Object.keys(groupedBooks).sort()];

  // Filtered categories
  const filteredCategories =
    selectedCategory === 'All'
      ? Object.entries(groupedBooks)
      : [[selectedCategory, groupedBooks[selectedCategory] || []]];

  return (
    <div
      className="booklist-container"
      style={{
        minHeight: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        background: '#f8f8fc',
        overflowX: 'hidden'
      }}
    >
      <h2 className="booklist-title">Book Categories</h2>

      {/* Category Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Book Sections by Category */}
      {filteredCategories.map(([categoryName, booksInCategory], index) => {
        const style = getCategoryStyle(categoryName);

        return (
          <section
            key={index}
            className={`category-section category-${categoryName.toLowerCase().replace(/\s/g, '')}`}
            style={{
              backgroundColor: style.bgColor,
              borderColor: style.borderColor,
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
          >
            <h3
              className="category-title"
              style={{
                color: style.textColor,
                borderBottom: `2px solid ${style.textColor}`,
                paddingBottom: '10px'
              }}
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
                  onViewDetails={() => handleViewDetails(book.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default BookList;
