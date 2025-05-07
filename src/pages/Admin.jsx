import React, { useState } from 'react';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image file
      if (!file.type.match('image.*')) {
        setError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Image size should be less than 2MB');
        return;
      }

      setError('');
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddBook = () => {
    if (!title || !author || !price || !imageFile) {
      setError('Please fill all fields');
      return;
    }

    const newBook = { 
      title, 
      author, 
      price, 
      image: imagePreview,
      imageFile 
    };
    
    setBooks([...books, newBook]);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setPrice('');
    setImageFile(null);
    setImagePreview('');
    setError('');
  };

  const handleDeleteBook = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Panel - Manage Books</h2>
      
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Book Title</label>
          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Author</label>
          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price (Rs.)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            min="0"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Book Cover Image</label>
          <div style={styles.imageUpload}>
            <label htmlFor="image-upload" style={styles.uploadButton}>
              Choose Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={styles.previewImage} 
              />
            )}
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
        </div>

        <button onClick={handleAddBook} style={styles.addButton}>
          Add Book
        </button>
      </div>

      <h3 style={styles.subHeader}>Books List</h3>
      {books.length === 0 ? (
        <p style={styles.emptyText}>No books added yet</p>
      ) : (
        <div style={styles.booksGrid}>
          {books.map((book, index) => (
            <div key={index} style={styles.bookCard}>
              <img 
                src={book.image} 
                alt={book.title} 
                style={styles.bookImage} 
              />
              <div style={styles.bookDetails}>
                <h4 style={styles.bookTitle}>{book.title}</h4>
                <p style={styles.bookAuthor}>{book.author}</p>
                <p style={styles.bookPrice}>Rs. {book.price}</p>
                <button 
                  onClick={() => handleDeleteBook(index)} 
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: '1.4rem',
    margin: '2rem 0 1rem',
    color: '#444',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem',
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  imageUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  uploadButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgb(159, 8, 30)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  previewImage: {
    width: '60px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgb(123, 3, 71)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    width: '100%',
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  bookImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  bookDetails: {
    padding: '1rem',
  },
  bookTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    color: '#333',
  },
  bookAuthor: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem',
    color: '#666',
  },
  bookPrice: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6c0909',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
};

export default AdminPanel;