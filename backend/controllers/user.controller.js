const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { logUser } = require('./login.controller');

function getAllUsers(req, res, next) {
  User.find({})
    .populate('projects')
    .then((result) => res.send(result))
    .catch((err) => next(err));
}

function addUser(req, res, next) {
  const user = req.body;
  if (!user.name || !user.passwd) {
    next(new Error('Repeaatttt'));
    return;
  }

  const initialPasswd = user.passwd;

  console.log(user);
  const salt = bcrypt.genSaltSync(10);

  user.passwd = bcrypt.hashSync(user.passwd, salt);

  const newUser = User.create(user);
  newUser
    .then((result) => {
      req.body = {
        userName: user.name,
        passwd: initialPasswd,
        typeUser: user.typeUser,
      };
      logUser(req, res);
    })
    .catch((err) => next(err));
}

function getUserById(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Id not found or invalid'));
  }
  User.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

function updateUser(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Id not found or invalid'));
  }
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

function deleteUser(req, res, next) {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(202).json({ deleteId: req.params.id });
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((err) => next(err));
}

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};
