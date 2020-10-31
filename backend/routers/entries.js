const express = require('express');
const router = new express.Router();

const entries =  require('../controllers/entry');

router.get('/entries', entries.getAllEntries);

router.post('/entries', entries.createEntry);

router.put('/entries:id', entries.voteOnEntry);

module.exports = router;
