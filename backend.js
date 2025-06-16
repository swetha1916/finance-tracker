const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Allow cross-origin requests from React frontend
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'swetha10',
  database: 'financeapp'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO useraccounts (username, password, joindate) VALUES (?, ?, CURRENT_DATE)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: 'User already exists or error occurred.' });
    }
    return res.json({ success: true });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM useraccounts WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false });
    }
    if (results.length > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});