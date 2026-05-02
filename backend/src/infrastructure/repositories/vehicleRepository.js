const pool = require('../db/client');

async function list() {
  const { rows } = await pool.query(
    `SELECT v.*, c.name AS client_name
     FROM vehicles v
     LEFT JOIN clients c ON c.id = v.client_id
     ORDER BY v.created_at DESC`
  );
  return rows;
}

async function create(vehicle) {
  const { plateNumber, brand, model, arrivalDate, clientId } = vehicle;
  const { rows } = await pool.query(
    `INSERT INTO vehicles (plate_number, brand, model, arrival_date, client_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [plateNumber, brand, model, arrivalDate, clientId || null]
  );
  return rows[0];
}

async function update(id, vehicle) {
  const { plateNumber, brand, model, arrivalDate, clientId, status } = vehicle;
  const { rows } = await pool.query(
    `UPDATE vehicles
     SET plate_number=$1, brand=$2, model=$3, arrival_date=$4, client_id=$5, status=$6, updated_at=NOW()
     WHERE id=$7
     RETURNING *`,
    [plateNumber, brand, model, arrivalDate, clientId || null, status || 'available', id]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM vehicles WHERE id=$1', [id]);
  return rowCount > 0;
}

async function stats() {
  const [total, assigned, available] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS count FROM vehicles'),
    pool.query('SELECT COUNT(*)::int AS count FROM vehicles WHERE client_id IS NOT NULL'),
    pool.query("SELECT COUNT(*)::int AS count FROM vehicles WHERE client_id IS NULL")
  ]);
  return {
    total: total.rows[0].count,
    assigned: assigned.rows[0].count,
    available: available.rows[0].count
  };
}

module.exports = { list, create, update, remove, stats };
