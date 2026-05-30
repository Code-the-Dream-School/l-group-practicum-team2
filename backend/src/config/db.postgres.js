// PostgreSQL (pg) connection scaffold
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('neon.tech')
    ? { rejectUnauthorized: true }
    : false,
  idleTimeoutMillis: 30000, 
  max: 10                   

});


pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err.message);
});

module.exports = pool;
