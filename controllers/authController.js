const dbPromise = require('../config/db');
const bcrypt = require('bcrypt');
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    let { email, password} = req.body;
    const db = await dbPromise;
    const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (rows.length === 0) {
      res.redirect('/login');
    }
    const user = rows[0];
    
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // Password incorrect
      return res.redirect('/login');
    }

    // Password correct - save user info in session
    req.session.userId = user.id;
    req.session.userName = user.name;

    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
};

exports.createUser = async (req, res) => {
  try {
    // Use let here to allow reassignment
    let { name, email, phone, password, role } = req.body;
    const db = await dbPromise;
    role = role ?? 2;  // default role if not provided
    password = await bcrypt.hash(password, 10);  // hash password

    const [result] = await db.query(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, password, role]
    );

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
};


exports.updateUser = async (req, res) => {
  const { name, description, faculty, certified } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Users SET name = ?, description = ?, faculty = ?, certified = ? WHERE id = ?',
      [name, description, faculty, certified, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: req.params.id, name, description, faculty, certified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
