// src/admin/EditBook.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: 'Sample Title',
    author: 'Sample Author',
    price: 100,
    category: 'Fiction',
    image: 'url'
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Book:", book);
    alert('Book updated!');
  };

  return (
    <div>
      <AdminNavbar />
      <h2>Edit Book {id}</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={book.title} onChange={e => setBook({...book, title: e.target.value})} required />
        <input type="text" value={book.author} onChange={e => setBook({...book, author: e.target.value})} required />
        <input type="number" value={book.price} onChange={e => setBook({...book, price: e.target.value})} required />
        <input type="text" value={book.category} onChange={e => setBook({...book, category: e.target.value})} required />
        <input type="text" value={book.image} onChange={e => setBook({...book, image: e.target.value})} required />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
