// src/admin/ManageBooks.jsx
import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const books = [
    { id: 1, title: 'Book One', author: 'Author A' },
    { id: 2, title: 'Book Two', author: 'Author B' }
  ];

  return (
    <div>
      <AdminNavbar />
      <h2>Manage Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
            <Link to={`/admin/edit-book/${book.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;
