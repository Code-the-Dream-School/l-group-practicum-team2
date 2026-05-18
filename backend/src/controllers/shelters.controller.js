const pool = require('../config/db.postgres');

const getShelterInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await pool.query(
      `SELECT id, name, address, city, state, email, phone FROM shelters WHERE id = $1`,
      [id]
    );
    if (query.rows.length === 0) {
      return res.status(404).json({ error: 'Shelter not found' });
    }
    const shelter = query.rows[0];
    const response = {
      id: shelter.id,
      name: shelter.name,
      address: shelter.address,
      city: shelter.city,
      state: shelter.state,
      contact_email: shelter.email,
      phone: shelter.phone,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching shelter info:', error);
    if (error.code === '22P02') {
      return res.status(400).json({ error: `Invalid ID format` });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getShelterInfo,
};
