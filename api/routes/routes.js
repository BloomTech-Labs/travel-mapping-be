const testRouter = require('./test');
const userRouter = require('./user');
const express    = require('express');
const router     = express.Router();

const routers = [userRouter, testRouter, ];

router.use(routers);

module.exports = router;