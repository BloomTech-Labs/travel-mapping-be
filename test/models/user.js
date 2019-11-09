const db      = require('../../data/dbConfig');
const models  = require('../../data/models/models');
const expect  = require('chai').expect;

const TEST_DATA = {
  user_id: 0,
  display_name: 'jdoe25',
  email: 'john.doe@mail.com',
};

describe('User models tests', () => {

  describe('retrieveUsers model', () => {

    before('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    it('should pass an empty array of users to a callback function', done => {

      models.user.retrieveUsers((retrieveErr, usersArr) => {
        expect(usersArr.length).to.equal(0);
        done();
      });

    });

  });

  describe('createUser model', () => {

    before('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    it('should pass an array with one element to a callback function', done => {

      models.user.createUser(TEST_DATA, (createErr, userIdArr) => {
        expect(userIdArr).to.be.an('array');
        expect(userIdArr.length).to.equal(1);
        done();
      });

    });

    

  });

});