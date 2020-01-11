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

const removeCollaborator = (collaborator_id, done) => {

  db('collaborators').where({ collaborator_id })
    .del()
    .then(deleted => {

      if (deleted) done(null, deleted);
      else done(new Error(errors.collaboratorDoesNotExist))

    }).catch(err => done(err));

};

const getCollaborators = (album_id, done) => {

  db('collaborators').where('collaborators.album_id', album_id)
    .join('users', 'collaborators.user_id', 'users.user_id')
    .select(
      'collaborator_id',
      'collaborators.user_id',
      'album_id',
      'permissions',
      'expires_on',
      'collaborators.created_at',
      'display_name',
      'email',
    )
    .then(collabs => {
    
      done(null, collabs);

    }).catch(err => done(err));

};

const getCollaboratorById = (collaborator_id, done) => {

  db('collaborators').where({ collaborator_id })
    .first()
    .then(collab => {

      done(null, collab);

    })
    .catch(err => done(err));
    
};

module.exports = {
  retrieveCollabAlbums,
  checkCollaboration,
  removeCollaborator,
  getCollaborators,
  getCollaboratorById,
};