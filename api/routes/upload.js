const express = require('express');
const router  = express.Router();
const api     = require('../controllers/controllers');

router.post('/upload', api.upload);

module.exports = router;