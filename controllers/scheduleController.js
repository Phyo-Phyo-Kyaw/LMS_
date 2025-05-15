const dbPromise = require('../config/db');

exports.getAllSchedule = async (req, res) => {
  try {
    const db = await dbPromise;
    const [schedules] = await db.query('SELECT * FROM schedules');
    res.render('schedules/index', { schedules }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

