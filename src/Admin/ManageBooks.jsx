import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageBooks.css';

const ManageBooks = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 499,
      category: 'Story',
      image: '/assets/alchemist.jpg',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 699,
      category: 'Self Help',
      image: '/assets/atomic.jpg',
    },
  ]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-book/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <div className="manage-books">
      <h2>Manage Books</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> Rs{book.price}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <div className="book-actions">
              <button onClick={() => handleEdit(book.id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
