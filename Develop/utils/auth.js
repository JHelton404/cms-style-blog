const bcrypt = require('bcrypt');

async function passwordVerify(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

module.exports = passwordVerify