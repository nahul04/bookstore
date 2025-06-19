import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading book details...</p>;

  if (!book) return <p style={{ textAlign: 'center' }}>Book not found</p>;

  return (
    <div style={styles.container}>
      <img src={book.image} alt={book.title} style={styles.image} />
      <div style={styles.info}>
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Price:</strong> Rs. {book.price}</p>
        <p style={styles.description}>{book.description}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
  },
  image: {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  info: {
    flex: 1,
  },
  description: {
    marginTop: '1rem',
    lineHeight: '1.6',
    color: '#555',
  }
};

export default BookDetails;
