const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');
const { checkDuplicateUsernameOrEmail } = require('../middleware/verifySignup');

router.post('/register', checkDuplicateUsernameOrEmail, users.createUser);

router.post('/authenticate', users.authenticateUser);

module.exports = router;
