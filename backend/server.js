const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'bookstore'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    
    return;
  }
  console.log('From backend side - Database connected successfully');
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API');
});

// Get all books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err.message);
      return res.status(500).json({ error: 'Failed to fetch books' });
    }
    res.json(results);
  });
});

// Add new book
app.post('/books', (req, res) => {
  const { title, author, price, image } = req.body;
  db.query(
    'INSERT INTO books (title, author, price, image) VALUES (?, ?, ?, ?)',
    [title, author, price, image],
    (err, result) => {
      if (err) {
        console.error('Error adding book:', err.message);
        return res.status(500).json({ error: 'Failed to add book' });
      }
      res.json({ message: 'Book added', id: result.insertId });
    }
  );
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err) => {
    if (err) {
      console.error('Error deleting book:', err.message);
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.json({ message: 'Book deleted' });
  });
});

// --- CART ENDPOINTS ---

// Get cart items for user_id=1
app.get('/cart', (req, res) => {
  const userId = 1; // Replace with real user id in production
  const sql = `
    SELECT c.id, c.user_id, c.book_id, c.quantity, b.title, b.author, b.price, b.image
    FROM cart c
    JOIN books b ON c.book_id = b.id
    WHERE c.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err.message);
      return res.status(500).json({ error: 'Failed to fetch cart' });
    }
    const total = results.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items: results, total });
  });
});

// Add book to cart (increments quantity if exists)
app.post('/cart', (req, res) => {
  const userId = 1; // Replace with real user id in production
  const { book_id } = req.body;
  if (!book_id) return res.status(400).json({ error: 'book_id required' });

  // Check if already in cart
  db.query(
    'SELECT * FROM cart WHERE user_id = ? AND book_id = ?',
    [userId, book_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length > 0) {
        // Increment quantity
        db.query(
          'UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND book_id = ?',
          [userId, book_id],
          (err2) => {
            if (err2) return res.status(500).json({ error: 'DB error' });
            res.json({ message: 'Cart updated' });
          }
        );
      } else {
        // Insert new row
        db.query(
          'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, 1)',
          [userId, book_id],
          (err2) => {
            if (err2) return res.status(500).json({ error: 'DB error' });
            res.json({ message: 'Added to cart' });
          }
        );
      }
    }
  );
});

// Remove a book from cart
app.delete('/cart', (req, res) => {
  const userId = 1; // Replace with real user id in production
  const { book_id } = req.body;
  if (!book_id) return res.status(400).json({ error: 'book_id required' });

  db.query(
    'DELETE FROM cart WHERE user_id = ? AND book_id = ?',
    [userId, book_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ message: 'Removed from cart' });
    }
  );
});

// Clear all items from cart for user
app.delete('/cart/clear', (req, res) => {
  const userId = 1; // Replace with real user id in production
  db.query('DELETE FROM cart WHERE user_id = ?', [userId], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Cart cleared' });
  });
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});