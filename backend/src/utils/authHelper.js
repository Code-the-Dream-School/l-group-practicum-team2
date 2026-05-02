const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

module.exports = { hashPassword };
// async function comparePassword(password, hashedPassword) {
//   return await bcrypt.compare(password, hashedPassword);
// }

// module.exports = { hashPassword, comparePassword };