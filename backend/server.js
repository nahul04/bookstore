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

// --- ROUTES START ---

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API');
});

// BOOK ROUTES
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch books' });
    res.json(results);
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

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, price, category, image } = req.body;
  const sql = "UPDATE books SET title=?, author=?, price=?, category=?, image=? WHERE id=?";
  db.query(sql, [title, author, price, category, image, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book updated successfully" });
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete book' });
    res.json({ message: 'Book deleted' });
  });
});

// CART ROUTES
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
    if (err) return res.status(500).json({ error: 'Failed to fetch cart' });
    const total = results.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items: results, total });
  });
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

  db.query(
    'DELETE FROM cart WHERE user_id = ? AND book_id = ?',
    [user_id, book_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ message: 'Removed from cart' });
    }
  );
});

app.delete('/cart/clear', (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id required' });
  db.query('DELETE FROM cart WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Cart cleared' });
  });
});

// USER AUTH ROUTES
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  db.query(
    'SELECT id FROM users WHERE name = ? OR email = ?',
    [name, email],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (results.length > 0)
        return res.status(409).json({ error: 'User already exists' });

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
      if (user.password !== password)
        return res.status(401).json({ error: 'Incorrect email or password' });

      delete user.password;
      res.json({ user });
    }
  );
});

// Fake payment
app.post('/payment', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, message: 'Payment processed successfully' });
  }, 1000);
});

// --- ADMIN: Get all orders ---
app.get('/api/admin/orders', (req, res) => {
  const sql = `
    SELECT 
      orders.id AS order_id,
      orders.user_id,
      users.name AS user_name,
      orders.total_amount,
      orders.status,
      orders.created_at,
      order_items.book_id,
      books.title AS book_title,
      order_items.quantity
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN order_items ON orders.id = order_items.order_id
    JOIN books ON order_items.book_id = books.id
    ORDER BY orders.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err.message);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }

    const orders = {};
    results.forEach(row => {
      if (!orders[row.order_id]) {
        orders[row.order_id] = {
          order_id: row.order_id,
          user_id: row.user_id,
          user_name: row.user_name,
          total_amount: row.total_amount,
          status: row.status,
          created_at: row.created_at,
          items: [],
        };
      }
      orders[row.order_id].items.push({
        book_id: row.book_id,
        book_title: row.book_title,
        quantity: row.quantity,
      });
    });

    res.json(Object.values(orders));
  });
});

// START SERVER
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
