const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const user     = require('../../data/models/models').user;
const jwt      = require('jsonwebtoken');

const addAlbumsMedia = (req, res, next) => {
  
  console.log(req.body);
  console.log(req.files);
  res.send('test');

};

module.exports = {
  addAlbumsMedia,
};