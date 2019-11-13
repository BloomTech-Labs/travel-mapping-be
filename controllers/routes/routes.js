const testRouter = require('./test');
const uploadRouter = require('./upload');
const express    = require('express');
const router     = express.Router();

const routers = [testRouter, uploadRouter];

router.use(routers);

module.exports = router;