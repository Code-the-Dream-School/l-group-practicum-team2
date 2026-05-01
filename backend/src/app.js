const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const notFound = require('./middleware/not-found');
const helloRoutes = require('./routes/hello.routes');
const authRoutes = require('./routes/auth.routes');
const shelterInfoRoutes = require('./routes/shelters.routes');
const app = express();

// Security & best‑practice middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shelters', shelterInfoRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

app.use(notFound);

module.exports = app;
