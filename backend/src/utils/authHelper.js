const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
// uncomment and export if needed
// async function comparePassword(password, hashedPassword) {
//   return await bcrypt.compare(password, hashedPassword);
// }

module.exports = { hashPassword };

