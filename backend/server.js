require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db.postgres')

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    // test DB connection
    await pool.query('SELECT 1');

    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    })
  } catch (error) {
    console.error('Database connection failed');
    console.error(error.message);
    console.error(error)
    process.exit(1); // stop app if DB fails
  }
}

start();
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
