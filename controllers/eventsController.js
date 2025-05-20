const pool = require('../config/db');

exports.getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    const events = result.rows;
    res.render('events/index', { events }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
