const bcrypt = require('bcrypt');

async function passwordVerify(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

const loggedIn = (req) => {
  if(req.session.logged_in) {
    return "dashboard"
  }
  return "main"
}

module.exports = passwordVerify