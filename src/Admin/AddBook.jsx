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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    alert("Book added!");
  };

  return (
    <div className="add-book-container">
      <AdminNavbar />
      <h2>Add Book</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={e => setBook({...book, title: e.target.value})} required />
        <input type="text" placeholder="Author" onChange={e => setBook({...book, author: e.target.value})} required />
        <input type="number" placeholder="Price" onChange={e => setBook({...book, price: e.target.value})} required />
        <input type="text" placeholder="Category" onChange={e => setBook({...book, category: e.target.value})} required />
        <input type="text" placeholder="Image " onChange={e => setBook({...book, image: e.target.value})} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
