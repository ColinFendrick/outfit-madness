const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');
const entries = require('../controllers/entry.controller');
const { verifyToken } = require('../middleware/authJwt');
const { confirmAdmin } = require('../middleware/confirmAdmin');

router.get('/admin/users', [verifyToken, confirmAdmin], users.getAllUsers);

router.delete('/admin/users/:id', [verifyToken, confirmAdmin], users.deleteUser);

router.delete('/admin/users', [verifyToken, confirmAdmin], users.deleteAllUsers);

router.post('/admin/entries', [verifyToken, confirmAdmin], entries.createEntry);

router.delete('/admin/entries/:id', [verifyToken, confirmAdmin], entries.deleteEntry);

router.delete('/admin/entries', [verifyToken, confirmAdmin], entries.deleteAllEntries);

module.exports = router;
