const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const pool = require('../config/db.postgres');
const {
    BadRequestError,
    UnauthenticatedError,
    InternalServerError
} = require('../errors');


const register = async (req, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'JWT secret not configured' });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO users (name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, name`,
            [name, email, password_hash]
        );

        const user = newUser.rows[0];

        const token = jwt.sign(
            { userId: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try {

         if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'JWT secret not configured' });
        }
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await pool.query(
            'SELECT id, name, email, password_hash FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name
            }
        });

        } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateProfile = async (req, res, next) => {
        try {
           const { name, newPassword, currentPassword } = req.body;

if (!currentPassword) {
    return next(
        new BadRequestError('Current password is required')
    );
}

if (!name && !newPassword) {
    return next(
        new BadRequestError(
            'Please provide a name or new password'
        )
    );
}
const result = await pool.query(
    'SELECT id, name, email, password_hash FROM users WHERE id = $1',
    [req.user.id]
);

const user =result.rows[0];

if (!user) {
    return next(
        new UnauthenticatedError('Invalid credentials')
    );
}

const isMatch = await bcrypt.compare(
    currentPassword,
    user.password_hash
);

if (!isMatch) {
    return next(
        new UnauthenticatedError('Invalid credentials')
    );
}

if (newPassword) {
    if (newPassword.length < 6) {
        return next(
            new BadRequestError(
                'Password must be at least 6 characters long'
            )
        );
    }

     const passwordRegex = /^[a-zA-Z0-9]+$/;

    if (!passwordRegex.test(newPassword)) {
        return next(
            new BadRequestError(
                'Password must be alphanumeric'
            )
        );
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
    RETURNING id, name`,
    [name, updatedPasswordHash, req.user.id]
);
if (newPassword && !name) {
    return res.status(StatusCodes.OK).json({
        data: {
            message: 'User password updated successfully'
        }
    });
}
    return res.status(StatusCodes.OK).json({
        data: updatedUser.rows[0]
    });
        } catch (error) {
            return next(
                new InternalServerError(error.message || 'Server Error')
            );
        }

};



module.exports = { register, login, updateProfile };