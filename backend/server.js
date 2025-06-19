// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- DATABASE CONNECTION ---
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookstore'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('✅ Database connected successfully');
});

// --- ROOT ROUTE ---
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Bookstore API');
});

// --- BOOK ROUTES ---
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch books' });
    res.json(results);
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch book' });
    if (result.length === 0) return res.status(404).json({ message: 'Book not found' });
    res.json(result[0]);
  });
});

app.post('/books', (req, res) => {
  const { title, author, price, category, image } = req.body;
  db.query(
    'INSERT INTO books (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)',
    [title, author, price, category, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to add book' });
      res.json({ message: 'Book added', id: result.insertId });
    }
  );
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete book' });
    res.json({ message: 'Book deleted' });
  });
});

// --- USER ROUTES ---
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

  db.query(
    'SELECT id FROM users WHERE name = ? OR email = ?',
    [name, email],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length > 0) return res.status(409).json({ error: 'User already exists' });

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  db.query(
    'SELECT id, name, email, password, role FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length === 0 || results[0].password !== password)
        return res.status(401).json({ error: 'Incorrect email or password' });

      const user = results[0];
      delete user.password;
      res.json({ user });
    }
  );
});

app.get('/users', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.json(results);
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete user' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  });
});

// --- CART ROUTES ---
app.get('/cart', (req, res) => {
  const userId = parseInt(req.query.user_id, 10);
  if (!userId) return res.status(400).json({ error: 'user_id required' });

  db.query(
    `SELECT c.id, c.user_id, c.book_id, c.quantity, b.title, b.author, b.price, b.image
     FROM cart c
     JOIN books b ON c.book_id = b.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch cart' });
      const total = results.reduce((sum, item) => sum + item.price * item.quantity, 0);
      res.json({ items: results, total });
    }
  );
});

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

app.delete('/cart', (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) return res.status(400).json({ error: 'user_id and book_id required' });

  db.query('DELETE FROM cart WHERE user_id = ? AND book_id = ?', [user_id, book_id], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Removed from cart' });
  });
});

app.delete('/cart/clear', (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id required' });

  db.query('DELETE FROM cart WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Cart cleared' });
  });
});

// --- VIEW ORDERS ROUTE (ADMIN) ---
app.get('/orders', (req, res) => {
  const sql = `
    SELECT 
      orders.id AS order_id,
      users.name AS customer_name,
      books.title AS book_title,
      orders.quantity,
      orders.total_price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN books ON orders.book_id = books.id
    ORDER BY orders.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch orders' });
    res.json(results);
  });
});

// --- SIMULATED PAYMENT ROUTE ---
app.post('/payment', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, message: 'Payment processed successfully' });
  }, 1000);
});



// --- START SERVER ---
app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
});
