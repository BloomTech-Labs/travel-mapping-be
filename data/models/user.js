const db = require('../dbConfig');

const retrieveUsers = done => {

  // db('users').select()
  done(null, []);

};

const createUser = (user, done) => {

  db('users').insert(user)
    .then(userIdArr  => done(null, userIdArr))
    .catch(insertErr => done(insertErr));

};

module.exports = {
  retrieveUsers,
  createUser,
};