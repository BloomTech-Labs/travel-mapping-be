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
        expect(usersArr).to.be.an('array');
        expect(usersArr.length).to.equal(0);
        done();
      });

    });

  });

  describe('createUser model', () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    it('should pass an array with one number element to a callback function', done => {

      models.user.createUser(TEST_DATA, (createErr, userIdArr) => {
        expect(userIdArr).to.be.an('array');
        expect(userIdArr.length).to.equal(1);
        expect(typeof userIdArr[0]).to.equal('number');
        done();
      });

    });

    it('should pass null to a callback function after creating a user', done => {
      
      models.user.createUser(TEST_DATA, (createErr, userIdArr) => {
        expect(userIdArr[0]).to.equal(0);
        expect(createErr).to.equal(null);
        done();
      });

    });

    it('should pass an error object to a callback function when a user is not created', done => {

      models.user.createUser(TEST_DATA, (err, userIdArr) => {
        if (err) throw new Error();
        else {
          models.user.createUser(TEST_DATA, (createErr, userIdArr) => {
            expect(createErr).to.be.an('error');
            done();
          });
        }
      });

    });

  });

});