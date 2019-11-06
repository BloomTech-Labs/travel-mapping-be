const express = require('express');
const router  = express.Router();
const api = require('../controllers/controllers');

router.get('/test', api.test.greeting);

module.exports = router;