const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const user     = require('../../data/models/models').user;
const jwt      = require('jsonwebtoken');

const createAlbum = (req, res, next) => {
  res.send('New Album');
}; 

module.exports = {
  createAlbum,
};