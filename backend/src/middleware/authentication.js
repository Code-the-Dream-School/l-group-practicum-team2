const jwt = require('jsonwebtoken');
const {
  UnauthenticatedError,
  InternalServerError,
} = require('../errors');

const auth = async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return next(new InternalServerError('JWT secret not configured'));
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // FIX: standartize user object
    req.user = {
      id: payload.userId,
      name: payload.name,
    };

    next();
  } catch (error) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = auth;