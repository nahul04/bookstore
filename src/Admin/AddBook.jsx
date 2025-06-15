import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './AddBook.css'; 

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!book.title || !book.author || !book.price) {
      setError('Title, Author, and Price are required.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          price: book.price,
          category: book.category,
          image: book.image
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Book added successfully!');
        setBook({ title: '', author: '', price: '', category: '', image: '' });
      } else {
        setError(data.error || 'Failed to add book.');
      }
    } catch {
      setError('Failed to add book.');
    }
  };

  return (
    <div className="add-book-container">
      <AdminNavbar />
      <h2 className="add-book-header">Add New Book</h2>
      {/* Show error or success message below the form */}
      {error && <h2 style={{ color: 'red', marginTop: 10 }}>{error}</h2>}
      {success && <h2 style={{ color: 'green', marginTop: 10 }}>{success}</h2>}
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          className="add-book-input"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="add-book-input"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          className="add-book-input"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleChange}
          className="add-book-input"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={book.image}
          onChange={handleChange}
          className="add-book-input"
        />
        <button type="submit" className="add-book-button">Add Book</button>
      </form>
      
    </div>
  );
};

export default AddBook;
