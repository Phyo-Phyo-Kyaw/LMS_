const pool = require('../config/db');

exports.getAllNews = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news');
    const news = result.rows;
    res.render('news/index', { news }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
