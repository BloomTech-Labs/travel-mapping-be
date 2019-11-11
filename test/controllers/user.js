const db          = require('../../data/dbConfig');
const environment = process.env.NODE_ENV || 'development';
const chaiHttp    = require('chai-http');
const chai        = require('chai');
const expect      = chai.expect;
const server      = environment === 'testing' 
  ? require('../../server')
  : 'http://localhost:4000';

chai.use(chaiHttp);

const TEST_DATA = {
  user_id: 0,
  display_name: 'jdoe25',
  email: 'john.doe@mail.com',
  password: 'jgt5^kY3%%@^&*',
};

const VALID_USERS = [{
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

const INVALID_USERS = [{
  invalidProps: '',
}];

const registerEmailUrl = '/users/register/?type=email';

describe('User endpoint tests', () => {

  describe('/users', () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    beforeEach('add data to users table', done => {
      db('users').insert(VALID_USERS)
        .then(data => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {

      chai.request(server)
        .get('/users')
        .then(res => {

          try {
            expect(res).to.be.json;
            done();
          } catch (err) {
            done(err);
          }

        }).catch(err => done(err));

    });

    it('should respond with a 200 status code', done => {

      chai.request(server)
        .get('/users')
        .then(res => {

          try {
            expect(res).to.have.status(200);
            done();
          } catch (err) {
            done(err);
          }

      }).catch(err => done(err));

    });

    it('should respond with an array with three elements', done => {

      chai.request(server)
        .get('/users')
        .then(res => {

          try {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(3);
            done();
          } catch (err) {
            done(err);
          }

      }).catch(err => done(err));

    });

    it('should respond with an array containing objects', done => {

      chai.request(server)
        .get('/users')
        .then(res => {

          try {

            expect(res.body).to.be.an('array');
            res.body.forEach(obj => {
              expect(obj).to.be.an('object');
            });
            done();

          } catch (err) {
            done(err);
          }

      }).catch(err => done(err));

    });

    it('should not contain is_superuser property', done => {

      chai.request(server)
        .get('/users')
        .then(res => {

          try {

            res.body.forEach(userObj => {
              expect(userObj).to.not.have.any.keys('is_superuser');
            });
            done();

          } catch (err) {

          }

        }).catch(err => done(err));

    });

  });

  describe('/users/register', () => {

    beforeEach('clear data in users table', done => {
      db.select()
        .from('users')
        .del()
        .then(()   => done())
        .catch(err => done(err));
    });

    it('should respond with json data', done => {

      const user = VALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(res).to.be.json;
          done();

        }).catch(err => done(err));

    });

    it('should respond with a 400 status code', done => {

      const user = INVALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(res).to.have.status(400);
          done();

        }).catch(err => done(err));

    });

    it('should respond with a single property', done => {

      const user = INVALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(Object.keys(res.body).length).to.equal(1);
          done();

        }).catch(err => done(err));
      
    });

    it('should respond with an error property', done => {

      const user = INVALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(res.body).to.haveOwnProperty('error');
          done();

        }).catch(err => done(err));

    });

    it('should respond with a string', done => {
      
      const user = INVALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(typeof res.body[Object.keys(res.body)[0]]).to.equal('string');
          done();

        }).catch(err => done(err));

    });

    it('should respond with a 201 status code', done => {

      const user = VALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {
          expect(res).to.have.status(201);
          done();
        }).catch(err => done(err));

    });

    it('should respond with a user_id property', done => {

      const user = VALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(res.body).to.haveOwnProperty('user_id');
          done();

        }).catch(err => done(err));

    });

    it('should respond with a token property', done => {

      const user = VALID_USERS[0];

      chai.request(server)
        .post(registerEmailUrl)
        .send(user)
        .then(res => {

          expect(res.body).to.haveOwnProperty('token');
          done();

        }).catch(err => done(err));

    });

  });

  describe('/users/:user_id', () => {

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

    it('should respond with json data', done => {
      
      const getUserId0 = '/users/0';

      chai.request(server)
        .get(getUserId0)
        .then(res => {

          expect(res).to.be.json;
          done();

        }).catch(err => done(err));

    });

    it('should respond with a 200 status code', done => {
      
      const getUserId0 = '/users/0';

      chai.request(server)
        .get(getUserId0)
        .then(res => {

          expect(res).to.have.status(200);
          done();

        }).catch(err => done(err));

    });

    it('should respond with an error message when user does not exist', done => {

      db.select()
        .from('users')
        .del()
        .then(()   => {
          
          const getUserId0 = '/users/0';

          chai.request(server)
            .get(getUserId0)
            .then(res => {

              expect(res.body).to.haveOwnProperty('error');
              done();

          }).catch(err => done(err));


        })
        .catch(err => done(err));

      

    });

    it('should respond with an object', done => {

      const getUserId0 = '/users/0';

      chai.request(server)
        .get(getUserId0)
        .then(res => {

          expect(res.body).to.be.an('object');
          done();

      }).catch(err => done(err));

    });

    it('should contain a user_id property', done => {

      const getUserId0 = '/users/0';

      chai.request(server)
        .get(getUserId0)
        .then(res => {

          expect(res.body).to.haveOwnProperty('user_id');
          done();

      }).catch(err => done(err));

    });

    it('should contain an email property', done => {

      const getUserId0 = '/users/0';

      chai.request(server)
        .get(getUserId0)
        .then(res => {

          expect(res.body).to.haveOwnProperty('email');
          done();

      }).catch(err => done(err));

    });

    it('should not contain is_superuser property', done => {

      chai.request(server)
        .get('/users')
        .then(res => {

          try {

            expect(res.body).to.not.have.any.keys('is_superuser');
            done();

          } catch (err) {

          }

        }).catch(err => done(err));

    });

  });

});