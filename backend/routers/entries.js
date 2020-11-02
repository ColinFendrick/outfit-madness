const express = require('express');
const router = new express.Router();

const entries =  require('../controllers/entry');

router.get('/entries', entries.getAllEntries);

router.get('/entries/:id', entries.getEntry);

router.post('/entries', entries.createEntry);

router.put('/entries/:id', entries.editEntry);

router.delete('/entries/:id', entries.deleteEntry);

router.delete('/entries', entries.deleteAll);

module.exports = router;
