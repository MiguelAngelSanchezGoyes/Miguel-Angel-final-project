const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkPasswd(passwd, user) {
  if (!passwd) {
    return false;
  } else if (!user) {
    return false;
  }
  return await bcrypt.compare(passwd, user.passwd);
}

function createJWT(user) {
  const tokenPayload = {
    name: user.name,
    typeUser: user.typeUser,
    id: user._id,
  };

  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}

module.exports = { checkPasswd, createJWT };
