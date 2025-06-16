// src/admin/ManageBooks.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './ManageBooks.css';

const ManageBooks = () => {
  const navigate = useNavigate();

  const books = [
    { id: 1, title: 'Book A', author: 'Author A', price: 300, category: 'Story', image: 'https://via.placeholder.com/80' },
    { id: 2, title: 'Book B', author: 'Author B', price: 400, category: 'Cartoon', image: 'https://via.placeholder.com/80' }
  ];

  const handleEdit = (id) => {
    navigate(`/admin/edit-book/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      alert(`Book with ID ${id} deleted`);
    }
  };

  const handleAddBook = () => {
    navigate('/admin/add-book');
  };

  return (
    <div>
      <AdminNavbar />
      <div className="books-container">
        <div className="books-header">
          <h2>Manage Books</h2>
          <button onClick={handleAddBook} className="add-book-btn">+ Add Book</button>
        </div>
        <div className="table-responsive">
          <table className="books-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price (Rs.)</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td><img src={book.image} alt={book.title} className="book-img" /></td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>{book.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(book.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
