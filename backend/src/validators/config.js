// process.env configuration
require('dotenv').config();

const validateEnvVars = () => {
  const requiredVars = ['DATABASE_URL', 'PORT', 'JWT_SECRET', 'FRONTEND_URL'];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);
  if (missingVars.length === 1) {
    console.error(`Missing required env var: ${missingVars[0]}`);
    process.exit(1);
  } else if (missingVars.length > 1) {
    console.error(`Missing required env vars: ${missingVars.join(', ')}`);
    process.exit(1);
  }
};

module.exports = validateEnvVars;
