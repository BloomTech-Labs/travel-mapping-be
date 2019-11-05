const testRouter = require('./routes/test/test');
const express    = require('express');
const router     = express.Router();

const routers = [testRouter, ];

router.use(routers);

module.exports = router;