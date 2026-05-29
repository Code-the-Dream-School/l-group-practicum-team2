const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const pool = require('../config/db.postgres');
const {
  BadRequestError,
  UnauthenticatedError,
  InternalServerError,
} = require('../errors');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Name, email and password are required');
    }

    if (password.length < 6) {
      throw new BadRequestError('Password must be at least 6 characters long');
    }

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new BadRequestError('Email already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, password_hash]
    );

    const user = newUser.rows[0];

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(StatusCodes.CREATED).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new InternalServerError('JWT secret not configured');
    }

    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(StatusCodes.OK).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, newPassword, currentPassword } = req.body;

    if (!currentPassword) {
      throw new BadRequestError('Current password is required');
    }

    if (!name && !newPassword) {
      throw new BadRequestError('Please provide a name or new password');
    }
    if (name !== undefined && name.trim() === '') {
      throw new BadRequestError('Name cannot be empty');
    }
    if (newPassword !== undefined && newPassword.trim() === '') {
      throw new BadRequestError('New password cannot be empty');
    }
    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE id = $1',
      [req.user.id]
    );

    const user = result.rows[0];

    if (!user) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatch) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        throw new BadRequestError(
          'Password must be at least 6 characters long'
        );
      }

      const passwordRegex = /^[a-zA-Z0-9]+$/;

      if (!passwordRegex.test(newPassword)) {
        throw new BadRequestError('Password must be alphanumeric');
      }
    }

    let updatedPasswordHash = user.password_hash;

    if (newPassword) {
      updatedPasswordHash = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await pool.query(
      `UPDATE users
    SET name = COALESCE($1, name),
        password_hash = $2
    WHERE id = $3
    RETURNING id, name, email`,
      [name, updatedPasswordHash, req.user.id]
    );

    return res.status(StatusCodes.OK).json({
      user: updatedUser.rows[0],
      message: newPassword
        ? 'Password updated successfully'
        : 'Profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const { currentPassword } = req.body;

    if (!currentPassword) {
      return next(new BadRequestError('Current password is required'));
    }

    const result = await pool.query(
      'SELECT id, password_hash FROM users WHERE id = $1',
      [req.user.id]
    );

    const user = result.rows[0];

    if (!user) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatch) {
      return next(new UnauthenticatedError('Invalid credentials'));
    }

    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);

    return res.status(StatusCodes.OK).json({
      data: {
        message: 'User account deleted successfully',
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req, res) => {
  const { id, email, name } = req.user;

  return res.status(StatusCodes.OK).json({
    user: { id, name, email },
  });
};

module.exports = {
  register,
  login,
  updateProfile,
  getCurrentUser,
  deleteAccount,
};
