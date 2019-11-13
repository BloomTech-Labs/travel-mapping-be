const express = require('express');
const router  = express.Router();
const api     = require('../middleware/middleware');

router.post('/upload', api.upload);

module.exports = router;