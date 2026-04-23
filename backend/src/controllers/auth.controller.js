const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const pool   = require('../config/db.postgres');

const register = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        if (!name || !email || !password) {
            return resizeTo.status(400),json({error: 'Name, email and password are required' });
        }

        const existingUser = await pool.query(
            'Select id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0){
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

    }   catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ error: 'Server error'});
    }

};

module.exports = { register };






    
