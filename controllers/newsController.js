const dbPromise = require('../config/db');

exports.getAllNews = async (req, res) => {
  try {
    const db = await dbPromise;
    const [news] = await db.query('SELECT * FROM news');
    res.render('news/index', { news }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

