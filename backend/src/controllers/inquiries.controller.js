const pool = require('../config/db.postgres');
const { BadRequestError, NotFoundError } = require('../errors');

const createInquiry = async (req, res, next) => {
  try {
    const { animal_id, message } = req.body;
    const user_id = req.user.id; // FIXED

    if (!animal_id) {
      throw new BadRequestError('animal_id is required');
    }

    if (typeof message !== 'string' || message.trim().length < 10) {
      throw new BadRequestError('Message must be at least 10 characters long');
    }

    const animalResult = await pool.query(
      'SELECT id FROM animals WHERE id = $1',
      [animal_id]
    );

    if (animalResult.rows.length === 0) {
      throw new NotFoundError('Animal not found');
    }

    const inquiryResult = await pool.query(
      `
      INSERT INTO inquiries (user_id, animal_id, message, status)
      VALUES ($1, $2, $3, 'SENT')
      RETURNING id, user_id, animal_id, message, status, created_at, updated_at
      `,
      [user_id, animal_id, message.trim()]
    );

    const inquiry = inquiryResult.rows[0];

    return res.status(201).json({
      ...inquiry,
      status: inquiry.status.toLowerCase(),
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    next(error); // using next error instead
  }
};

const getMyInquiries = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      `
      SELECT
        i.id,
        i.user_id,
        i.animal_id,
        i.message,
        i.status,
        i.created_at,
        i.updated_at,
        a.name AS animal_name,
        a.species,
        a.breed,
        a.photo_url
      FROM inquiries i
      JOIN animals a ON a.id = i.animal_id
      WHERE i.user_id = $1
      ORDER BY i.created_at DESC
      `,
      [user_id]
    );

    const inquiries = result.rows.map((inquiry) => ({
      ...inquiry,
      status: inquiry.status.toLowerCase(),
    }));

    return res.status(200).json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    next(error);
  }
};

module.exports = {
  createInquiry,
  getMyInquiries,
};
