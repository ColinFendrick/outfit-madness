const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');
const { checkDuplicateUsernameOrEmail } = require('../middleware/verifySignup');
const { verifyToken, isTokenSameAsTarget } = require('../middleware/authJwt');

router.post('/register', checkDuplicateUsernameOrEmail, users.createUser);

router.post('/authenticate', users.authenticateUser);

router.get('/users/:id', [verifyToken, isTokenSameAsTarget], users.getUser);

router.put('/users/:id', [verifyToken, isTokenSameAsTarget], users.updateUser);

module.exports = router;
