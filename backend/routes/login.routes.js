const router = require('express').Router();
const { logUser } = require('../controllers/login.controller');

router.post('/', logUser);

module.exports = router;
