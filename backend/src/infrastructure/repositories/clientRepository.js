const pool = require('../db/client');

async function list() {
  const { rows } = await pool.query('SELECT * FROM clients ORDER BY name ASC');
  return rows;
}

module.exports = { list };
