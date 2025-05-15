const dbPromise = require('../config/db');

exports.getAllCourses = async (req, res) => {
  try {
    const db = await dbPromise;
    const [courses] = await db.query('SELECT * FROM courses');
    res.render('courses/index', { courses }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  const { name, description, faculty, certified } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO courses (name, description, faculty, certified) VALUES (?, ?, ?, ?)',
      [name, description, faculty, certified]
    );
    res.status(201).json({ id: result.insertId, name, description, faculty, certified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { name, description, faculty, certified } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE courses SET name = ?, description = ?, faculty = ?, certified = ? WHERE id = ?',
      [name, description, faculty, certified, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ id: req.params.id, name, description, faculty, certified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
