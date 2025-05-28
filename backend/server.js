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

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
//