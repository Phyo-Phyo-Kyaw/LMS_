const dbPromise = require('../config/db');

exports.getAllEvents = async (req, res) => {
  try {
    const db = await dbPromise;
    const [events] = await db.query('SELECT * FROM events');
    res.render('events/index', { events }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

