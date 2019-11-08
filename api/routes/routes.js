const testRouter = require('./test');
const express = require('express');
const router = express.Router();

const routers = [testRouter];

router.use(routers);

module.exports = router;
