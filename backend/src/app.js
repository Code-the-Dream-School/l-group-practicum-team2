const crypto = require('crypto');
const pool = require('./config/db.postgres');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const notFound = require('./middleware/not-found');

const helloRoutes = require('./routes/hello.routes');
const authRoutes = require('./routes/auth.routes');
const inquiryRoutes = require('./routes/inquiries.routes');

const animalsRoutes = require('./routes/animals.routes');
const shelterInfoRoutes = require('./routes/shelters.routes');
const app = express();
const favoritesRoutes = require('./routes/favorites.routes');

// Check if required environment variables are set
const validateEnvVars = require('./validators/config');
validateEnvVars();
// Authentication Middleware
// Uncomment the below when ready to use in secured routes.
// const authenticateUser = require('./middleware/authentication');

// Security & best‑practice middleware
app.use(helmet());
app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Error handler middleware
const errorHandlerMiddleware = require('./middleware/error-handler');

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/animals', animalsRoutes);
app.use('/api/shelters', shelterInfoRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});
app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});

app.get('/healthz', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    return res.status(200).json({
      success: true,
      data: { db: true },
      meta: { requestId: req.requestId },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: error.message },
      meta: { requestId: req.requestId },
    });
  }
});

app.use(notFound);
app.use(errorHandlerMiddleware);
module.exports = app;
