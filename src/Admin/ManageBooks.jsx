
import React, { useState } from 'react';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  const handleAddBook = () => {
    //add a book
    alert("Add Book Clicked");
  };

  const handleEditBook = id => {
    //  edit a book
    alert("Edit Book ID: " + id);
  };

  const handleDeleteBook = id => {
    // delete a book
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div>
      <h2>Manage Books</h2>
      <button onClick={handleAddBook}>Add New Book</button>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => handleEditBook(book.id)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;
