const jwt = require('jsonwebtoken');
const pool = require('../config/db.postgres');
const {
  UnauthenticatedError,
  InternalServerError,
  NotFoundError,
} = require('../errors');

const auth = async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    throw new InternalServerError('JWT secret not configured');
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [payload.userId]
    );

    const user = result.rows[0];
    if (!user) {
      throw new NotFoundError(`No user with id ${payload.userId}`);
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = auth;
