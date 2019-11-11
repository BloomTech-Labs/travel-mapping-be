const db      = require('../../data/dbConfig');
const models  = require('../../data/models/models');
const expect  = require('chai').expect;

const TEST_DATA = {
  user_id: 0,
  display_name: 'jdoe25',
  email: 'john.doe@mail.com',
  password: 'jgt5^kY3%%@^&*',
};

const VALID_USERS = [{
  display_name: 'jdoe25',
  email: 'john.doe@mail.com',
  password: 'hkTQ%*03',
}, {
  display_name: 'jdoe25',
  email: 'doe.john@mail.com',
  password: 'hkTQ%*03',
}, {
  display_name: 'djoe25',
  email: 'john.doe@mail.com',
  password: 'hkTQ%*03',
}];

const INVALID_USERS =  [{
  display_name: 'not valid',
  email: 'john.doe@mail.com',
  password: 'hkTQ%*03',
}, {
  display_name: 'jdoe25',
  email: 'not valid',
  password: 'hkTQ%*03',
}, {
  display_name: 'jdoe25',
  email: 'john.doe@mail.com',
  password: 'not valid',
}];

describe('User models tests', () => {

  describe('retrieveUsers model', () => {

    before('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    it('should pass an empty array to a callback function', done => {

      models.user.retrieveUsers((retrieveErr, usersArr) => {
        expect(usersArr).to.be.an('array');
        expect(usersArr.length).to.equal(0);
        done();
      });

    });

    it('should pass null to a callback function', done => {
      
      models.user.retrieveUsers((retrieveErr, usersArr) => {
        expect(retrieveErr).to.equal(null);
        done();
      });

    });

  });

  describe('retrieveUserBy model', () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(TEST_DATA)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should pass an error when retrieving by an invalid property', done => {

      const invalidProp = 'not valid';

      models.user.retrieveUserBy({ invalidProp }, (retrieveErr, userObj) => {
          
        try {
          expect(retrieveErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an object when retrieving by user_id', done => {

      const user_id = 0;

      models.user.retrieveUserBy({ user_id }, (retrieveErr, userObj) => {

        try {
          expect(userObj).to.be.an('object');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an object when retrieving by display_name', done => {

      const display_name = 'jdoe25';

      models.user.retrieveUserBy({ display_name }, (retrieveErr, userObj) => {

        if (retrieveErr) done(retrieveErr);
        else {

          try {
            expect(userObj).to.be.an('object');
            done();
          } catch (err) {
            done(err);
          }

        }

      });

    });

    it('should pass an object when retrieving by email', done => {

      const email = 'john.doe@mail.com';

      models.user.retrieveUserBy({ email }, (retrieveErr, userObj) => {

        if (retrieveErr) done(retrieveErr);
        else {

          try {
            expect(userObj).to.be.an('object');
            done();
          } catch (err) {
            done(err);
          }

        }

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
      
      const user = VALID_USERS[0];

      models.user.createUser(user, (createErr, userIdArr) => {

        try {
          expect(createErr).to.equal(null);
          done();
        } catch (err) {
          done(err);
        }
        
      });

    });

    it('should pass an error to a callback function when display_name is not valid', done => {

      const user = INVALID_USERS[0];

      models.user.createUser(user, (createErr, userIdArr) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });
    });

    it('should pass an error to a callback function when email is not valid', done => {

      const user = INVALID_USERS[1];

      models.user.createUser(user, (createErr, userIdArr) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when password is not valid', done => {

      const user = INVALID_USERS[2];

      models.user.createUser(user, (createErr, userIdArr) => {

        try {
          expect(createErr).to.be.an('error');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an error to a callback function when a user with a specific display name already exists', done => {
      
      const userOne = VALID_USERS[0];
      const userTwo = VALID_USERS[1];
      
      models.user.createUser(userOne, (createErrOne, userIdArrOne) => {

          models.user.createUser(userTwo, (createErr, userIdArr) => {

            try {
              expect(createErr).to.be.an('error');
              done();
            } catch (err) {
              done(err);
            }
            
          });

      });

    });

    it('should pass an error to a callback function when a user with a specific email already exists', done => {

      const user = VALID_USERS[0];

      models.user.createUser(user, (createErrOne, userIdArrOne) => {

          models.user.createUser(user, (createErr, userIdArr) => {

            try {
              expect(createErr).to.be.an('error');
              done();
            } catch (err) {
              done(err);
            }
            
          });

      });

    });

  });

});