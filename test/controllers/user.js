const environment = process.env.NODE_ENV || 'development';
const chaiHttp    = require('chai-http');
const chai        = require('chai');
const expect      = chai.expect;
const server      = environment === 'testing' 
  ? require('../../server') 
  : 'http://localhost:4000';

chai.use(chaiHttp);

const VALID_USERS = [{
  display_name: 'tuser00',
  email: 'test.user@mail.com',
  password: ''
}];

const INVALID_USERS = [{
  invalidProps: '',
}];

const registerEmailUrl = '/users/register/?type=email';

describe('User endpoint tests', () => {

  describe('/users/register', () => {

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

    // it('should respond with a 201 status code', done => {

    //   const user = TEST_USER_DATA[0];

    //   chai.request(server)
    //     .post(registerEmailUrl)
    //     .send(user)
    //     .then(res => {
    //       expect(res).to.have.status(201);
    //       done();
    //     }).catch(err => done(err));

    // });

  });

});