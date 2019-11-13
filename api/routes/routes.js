const express    = require('express');
const router     = express.Router();

router.use([ 
  require('./test'),
  require('./user'),
]);

module.exports = router;