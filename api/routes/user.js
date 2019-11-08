const express = require('express');
const router  = express.Router();
const api     = require('../middleware/middleware');
const Sentry  = require('@sentry/node');

// POST HTTP/1.1 201 CREATED
router.post('/users', (req, res, next) => {
  res.send('hello world');
});