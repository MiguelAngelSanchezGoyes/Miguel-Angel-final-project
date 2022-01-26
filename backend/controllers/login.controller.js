const auth = require('../helpers/auth.helpers');
const User = require('../models/user.model');

async function logUser(req, res) {
  const { userName, passwd, typeUser } = req.body;
  let user;
  try {
    user = await User.findOne({
      name: userName,
      typeUser: typeUser,
    });
  } catch (error) {}
  console.log(user);
  if (user && (await auth.checkPasswd(passwd, user))) {
    const jwToken = auth.createJWT(user);
    res.json({
      user: user,
      token: jwToken,
    });
    console.log(jwToken);
    return jwToken;
  } else {
    return res.status(401).json({ message: 'invalid user passwd' });
  }
}
module.exports = { logUser };
