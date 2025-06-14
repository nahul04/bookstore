import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import './BookList.css';


// Category-specific styling
const getCategoryStyle = (categoryName) => {
  const styles = {
    Fantasy: {
      bgColor: 'rgb(12, 3, 50)',
      textColor: '#075985',
      borderColor: '#bae6fd',
    },
    Fiction: {
      bgColor: 'rgb(129, 62, 222)',
      textColor: '#4b0082',
      borderColor: '#d9c7ff',
    },
    'Self-Help': {
      bgColor: 'rgb(17, 139, 215)',
      textColor: '#065f46',
      borderColor: '#a7f3d0',
    },
    Horror: {
      bgColor: 'rgb(58, 16, 244)',
      textColor: '#075985',
      borderColor: '#bae6fd',
    },
    Fashion: {
      bgColor: 'rgb(67, 194, 44)',
      textColor: '#065f46',
      borderColor: '#a7f3d0',
    },
  };

  return styles[categoryName] || {
    bgColor: 'rgb(199, 199, 199)',
    textColor: '#333',
    borderColor: '#ddd',
  };
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  // Handle view details
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

  const filteredCategories =
    selectedCategory === 'All'
      ? Object.entries(groupedBooks)
      : [[selectedCategory, groupedBooks[selectedCategory] || []]];

  return (
    <div className="booklist-container">
      <h2 className="booklist-title">Book Categories</h2>

      {/* Category Filter */}
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

      {/* Book List Display */}
      {filteredCategories.map(([categoryName, booksInCategory], index) => {
        const style = getCategoryStyle(categoryName);

        return (
          <section
            key={index}
            className={`category-section category-${categoryName.toLowerCase().replace(/\s/g, '')}`}
            style={{
              backgroundColor: style.bgColor,
              borderColor: style.borderColor,
            }}
          >
            <h3
              className="category-title"
              style={{
                color: style.textColor,
                borderLeftColor: style.textColor,
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
