const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
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

// Get cart items for a user
app.get('/cart', (req, res) => {
  const userId = parseInt(req.query.user_id, 10);
  if (!userId) return res.status(400).json({ error: 'user_id required' });
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
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) return res.status(400).json({ error: 'user_id and book_id required' });

  db.query(
    'SELECT * FROM cart WHERE user_id = ? AND book_id = ?',
    [user_id, book_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length > 0) {
        db.query(
          'UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND book_id = ?',
          [user_id, book_id],
          (err2) => {
            if (err2) return res.status(500).json({ error: 'DB error' });
            res.json({ message: 'Cart updated' });
          }
        );
      } else {
        db.query(
          'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, 1)',
          [user_id, book_id],
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
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) return res.status(400).json({ error: 'user_id and book_id required' });

  db.query(
    'DELETE FROM cart WHERE user_id = ? AND book_id = ?',
    [user_id, book_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ message: 'Removed from cart' });
    }
  );
});

// Clear all items from cart for user
app.delete('/cart/clear', (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id required' });
  db.query('DELETE FROM cart WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Cart cleared' });
  });
});

// --- USER REGISTRATION ENDPOINT ---
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  // Check if user exists
  db.query(
    'SELECT id FROM users WHERE name = ? OR email = ?',
    [name, email],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length > 0)
        return res.status(409).json({ error: 'User already exists' });

      // Save password directly (no hashing)
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err2) => {
          if (err2) return res.status(500).json({ error: 'Registration failed' });
          res.json({ message: 'Registration successful' });
        }
      );
    }
  );
});

// --- USER LOGIN ENDPOINT ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  db.query(
    'SELECT id, name, email, password, role FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length === 0)
        return res.status(401).json({ error: 'Incorrect email or password' });

      const user = results[0];
      // Compare plain password (since you store it as plain text)
      if (user.password !== password)
        return res.status(401).json({ error: 'Incorrect email or password' });

      // Remove password before sending user object
      delete user.password;
      res.json({ user });
    }
  );
});

// Fake payment endpoint (optional, not required for your current flow)
app.post('/payment', (req, res) => {
  // Simulate payment processing delay
  setTimeout(() => {
    res.json({ success: true, message: 'Payment processed successfully' });
  }, 1000);
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});