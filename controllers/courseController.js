const pool = require('../config/db');

exports.getAllCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    const courses = result.rows;
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
 res.render('courses/create'); 
};

exports.storeCourse = async (req, res) => {
  try {
    const { courseTitle, courseDescription, coursePrice, courseLevel } = req.body;

    // Validation
    if (!courseTitle || !courseDescription || !coursePrice || !courseLevel) {
      return res.status(400).json({ message: 'Fill all fields' });
    }
    if (!['beginner', 'intermediate', 'advanced'].includes(courseLevel)) {
      return res.status(400).json({ message: 'Invalid level' });
    }

    const query = `
      INSERT INTO courses (name, description, level, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [courseTitle, courseDescription, courseLevel, coursePrice];

    const result = await pool.query(query, values);

    res.redirect('/courses'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

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
