// PostgreSQL (pg) connection scaffold
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
  idleTimeoutMillis: 30000, 
  max: 10                   

});


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle database client:', err.message);
});

module.exports = pool;
