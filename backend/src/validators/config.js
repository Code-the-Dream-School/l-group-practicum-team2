// process.env configuration
require('dotenv').config();

const validateEnvVars = () => {
  const requiredVars = ['DATABASE_URL', 'PORT', 'JWT_SECRET', 'FRONTEND_URL'];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error(`Missing required env var: ${missingVars.join(', ')}`);
    process.exit(1);
  }
};

module.exports = validateEnvVars;
