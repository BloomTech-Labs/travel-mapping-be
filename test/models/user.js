const db      = require('../../data/dbConfig');
const models  = require('../../data/models/models');
const bcrypt  = require('bcrypt');
const expect  = require('chai').expect;
const salt    = parseInt(process.env.PASS_SALT) || 10;

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

describe('Testing user models', () => {

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

  describe('retrieveUsers model', () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {

      const USERS = [{
        display_name: 'tuser00',
        email: 'test.user00@mail.com',
        password: 'hkTQ%*03'
      }, {
        display_name: 'tuser01',
        email: 'test.user01@mail.com',
        password: 'hkTQ%*03'
      }, {
        display_name: 'tuser02',
        email: 'test.user02@mail.com',
        password: 'hkTQ%*03'
      }];

      db('users').insert(USERS)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should pass an array to a callback function', done => {

      models.user.retrieveUsers((retrieveErr, usersArr) => {

        try {
          expect(usersArr).to.be.an('array');
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass null to a callback function', done => {
      
      models.user.retrieveUsers((retrieveErr, usersArr) => {

        try {
          expect(retrieveErr).to.equal(null);
          done();
        } catch (err) {
          done(err);
        }
        
      });

    });

    it('should pass an array with three elements', done => {

      models.user.retrieveUsers((retrieveErr, userObjArr) => {

        try {

          expect(userObjArr.length).to.equal(3);
          done();
  
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass an array of objects to a callback function', done => {

        models.user.retrieveUsers((retrieveErr, userObjArr) => {

          try {

            userObjArr.forEach(obj => {
              expect(obj).to.be.an('object');
            });
            done();

          } catch (err) {
            done(err);
          }

        });

    });

    it('should not contain a password property', done => {

      models.user.retrieveUsers((retrieveErr, userObjArr) => {

        try {

          userObjArr.forEach(userObj => {
            expect(userObj).to.not.have.any.keys('password');
          });
          done();

        } catch (err) {
          done(err);
        }

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

    it('should not contain a password property', done => {

      const email = 'john.doe@mail.com';

      models.user.retrieveUserBy({ email }, (retrieveErr, userObj) => {

        try {

          expect(userObj).to.not.have.any.keys('password');
          done();

        } catch (err) {
          done(err);
        }

      });

    });

  });

  describe('updateUserById model', () => {

    const PASS = 'hkTQ%*03';

    const validUsers = [{
      user_id: 0,
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id: 1,
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id: 2,
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id: 3,
      display_name: 'tuser03',
      email:        'test.user03@mail.com',
    }];

    const invalidUsers = [{

    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(validUsers)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should pass null to a callback function after updating a user', done => {

      const { user_id } = validUsers[0];

      const updateUserObj = {
        display_name: '00tuser',
        email:        '00test.user@mail.com',
        password:     'TQhk03%*',
      };

      models.user.updateUserById(user_id, updateUserObj, (updateErr, userIdObj) => {

        try {

          expect(updateErr).to.equal(null);
          done();

        } catch(err) {
          done(err);
        }

      });

    });

    it('should pass an array to a callback function after updating a user', done => {

      const { user_id } = validUsers[0];

      const updateUserObj = {
        display_name: '00tuser',
        email:        '00test.user@mail.com',
        password:     'TQhk03%*',
      };

      models.user.updateUserById(user_id, updateUserObj, (updateErr, userIdArr) => {

        if(updateErr) done(updateErr);
        else {

          try {

            expect(userIdArr).to.be.an('array');
            done();
  
          } catch(err) {
            done(err);
          }

        }

      });

    });

  });

  describe('deleteUserById model', () => {

    const PASS = 'hkTQ%*03';

    const validUsers = [{
      user_id: 0,
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id: 1,
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id: 2,
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id: 3,
      display_name: 'tuser03',
      email:        'test.user03@mail.com',
    }];

    const invalidUsers = [{

    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(validUsers)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should pass null to a callback function after deleting a user', done => {

      const user_id = validUsers[0].user_id;

      models.user.deleteUserById(user_id, (deleteErr, userIdArr) => {

        try {
          expect(deleteErr).to.equal(null);
          done();
        } catch(err) {
          done(err);
        }

      });

    });

    it('should pass an array to a callback function after deleting a user', done => {

      const user_id = validUsers[0].user_id;

      models.user.deleteUserById(user_id, (deleteErr, userIdArr) => {

        try {

          expect(userIdArr).to.be.an('array');
          done();

        } catch(err) {
          done(err);
        }

      });
      
    });

    it('should pass an error to a callback function when a user id does not exist', done => {

      const user_id = 404;

      models.user.deleteUserById(user_id, (deleteErr, userIdArr) => {

        try {
          expect(deleteErr).to.be.an('error');
          done();
        } catch(err) {
          done(err);
        }

      });

    });

  });

  describe('verifyUserPassword model', () => {

    const PASS = 'hkTQ%*03';

    const USERS = [{
      user_id:      0,
      display_name: 'tuser00',
      email:        'test.user00@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      1,
      display_name: 'tuser01',
      email:        'test.user01@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }, {
      user_id:      2,
      display_name: 'tuser02',
      email:        'test.user02@mail.com',
      password:     bcrypt.hashSync(PASS, salt),
    }];

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {

      db('users').insert(USERS)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should pass null to a callback function', done => {

      const { user_id } = USERS[0];

      models.user.verifyUserPassword(user_id, PASS, (verifyErr, isMatch) => {

        try {
          expect(verifyErr).to.equal(null);
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass true to a callback function when passwords match', done => {

      const { user_id } = USERS[0];

      models.user.verifyUserPassword(user_id, PASS, (verifyErr, isMatch) => {

        try {
          expect(isMatch).to.equal(true);
          done();
        } catch (err) {
          done(err);
        }

      });

    });

    it('should pass false to a callback function when password don\'t match', done => {

      const { user_id } = USERS[0];

      models.user.verifyUserPassword(user_id, 'incorrect password', (verifyErr, isMatch) => {

        try {
          expect(isMatch).to.equal(false);
          done();
        } catch (err) {
          done(err);
        }

      });

    });

  });

});