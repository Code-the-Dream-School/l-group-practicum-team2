const pool = require('../config/db.postgres');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getShelterInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = await pool.query(
      `SELECT id, name, address, city, state, email, phone FROM shelters WHERE id = $1`,
      [id]
    );
    if (query.rows.length === 0) {
      throw new NotFoundError('Shelter not found' );
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
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getShelterInfo,
};
