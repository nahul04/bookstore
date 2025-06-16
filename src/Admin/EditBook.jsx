// src/admin/EditBook.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    // Fetch book by ID here (API)
    setBook({
      title: 'Sample Book',
      author: 'Sample Author',
      price: '200',
      category: 'Cartoon',
      image: 'https://via.placeholder.com/80'
    });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Book:', book);
    alert("Book updated!");
    navigate('/admin/manage-books');
  };

  return (
    <div>
      <AdminNavbar />
      <div className="edit-book-form">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={book.title} onChange={handleChange} required />
          <input name="author" value={book.author} onChange={handleChange} required />
          <input name="price" type="number" value={book.price} onChange={handleChange} required />
          <input name="category" value={book.category} onChange={handleChange} required />
          <input name="image" value={book.image} onChange={handleChange} required />
          <button type="submit">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
