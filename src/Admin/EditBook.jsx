// src/Admin/EditBook.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    // Load book details by ID (fetch from backend if needed)
    // Dummy data:
    setBook({
      title: 'Sample Book',
      author: 'Sample Author',
      category: 'Sample Category',
      price: 200,
      description: 'Sample description'
    });
  }, [id]);

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Updated Book:', book);
    alert('Book updated successfully!');
    // Update book in backend using API
  };

  return (
    <div className="form-container">
      <h2>Edit Book - ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={book.title} onChange={handleChange} required />
        <input type="text" name="author" value={book.author} onChange={handleChange} required />
        <input type="text" name="category" value={book.category} onChange={handleChange} required />
        <input type="number" name="price" value={book.price} onChange={handleChange} required />
        <textarea name="description" value={book.description} onChange={handleChange} required />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
