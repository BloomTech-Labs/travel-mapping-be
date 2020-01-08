const db       = require('../dbConfig');
const errors   = require('../../modules/modules').errors;

const retrieveCollabAlbums = (user_id, done) => {

  db('collaborators').where('collaborators.user_id', user_id)
    .join('albums', 'collaborators.album_id', 'albums.album_id')
    .then(albums => {

      done(null, albums);

    }).catch(err => done(err));

};

const checkCollaboration = (album_id, user_id, done) => {

  db('collaborators').where({ user_id, album_id })
    .first()
    .then(collab => {

      done(null, collab ? true : false);

    }).catch(err => done(err));

};

module.exports = {
  retrieveCollabAlbums,
  checkCollaboration,
};