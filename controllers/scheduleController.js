const pool = require('../config/db');

exports.getAllSchedule = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedules');
    const schedules = result.rows;
    res.render('schedules/index', { schedules }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
