const express    = require('express');
const router     = express.Router();

router.use([ 
  require('./test'),
  require('./user'),
  require('./upload'),
  require('./album'),
]);

module.exports = router;