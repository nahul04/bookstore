// src/admin/AddBook.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './AddBook.css';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Book:', book);
    alert("Book added successfully!");
    navigate('/admin/manage-books');
  };

  return (
    <div>
      <AdminNavbar />
      <div className="add-book-form">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="author" placeholder="Author" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="category" placeholder="Category" onChange={handleChange} required />
          <input name="image" placeholder="Image " onChange={handleChange} required />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
