const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('Connected to MySQL database.');
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // stop app if no db connection
  }
}

module.exports = initializeDatabase();
