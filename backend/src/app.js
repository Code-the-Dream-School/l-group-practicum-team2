const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const notFound = require("./middleware/not-found");
const helloRoutes = require('./routes/hello.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const favoritesRoutes = require('./routes/favorites.routes');

// Authentication Middleware
// Uncomment the below when ready to use in secured routes.
// const authenticateUser = require('./middleware/authentication');

// Security & best‑practice middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Error handler middleware
const errorHandlerMiddleware = require('./middleware/error-handler')

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});


app.use(notFound);
app.use(errorHandlerMiddleware);
module.exports = app;
