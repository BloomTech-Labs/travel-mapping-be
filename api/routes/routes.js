const express = require('express');
const router  = express.Router();

router.use([ 
  require('./user'),
  require('./upload'),
  require('./album'),
  require('./media'),
  require('./invitation'),
  require('./collaborator'),
]);

module.exports = router;