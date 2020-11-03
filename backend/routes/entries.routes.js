const express = require('express');
const router = new express.Router();

const entries = require('../controllers/entry.controller');
const { verifyToken } = require('../middleware/authJwt');

router.get('/entries', verifyToken, entries.getAllEntries);

router.get('/entries/:id', verifyToken, entries.getEntry);

router.put('/entries/:id', verifyToken, entries.editEntry);

module.exports = router;
