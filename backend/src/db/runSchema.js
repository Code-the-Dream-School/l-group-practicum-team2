require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../config/db.postgres');

async function runSchema() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

    await pool.query(sql);
    console.log('Schema applied');
  } catch (err) {
    console.error('Schema error:', err);
  } finally {
    await pool.end();
  }
}

runSchema();
