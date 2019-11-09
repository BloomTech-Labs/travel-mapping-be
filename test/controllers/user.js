const environment = process.env.NODE_ENV || 'development';
const server = environment === 'testing' 
  ? require('../../server') 
  : 'http://localhost:4000';
const chaiHttp = require('chai-http');
const chai     = require('chai');
const expect   = chai.expect;

chai.use(chaiHttp);

const TEST_USER_DATA = [{
  user_id: 100,
  display_name: 'tuser00',
  email: 'test.user@mail.com',
}];

describe('User endpoint tests', () => {

  describe('/users/register', () => {


    it('should respond with a 201 status code', done => {

      const user = TEST_USER_DATA[0];

      chai.request(server)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(201);
          done();
        }).catch(err => {
          // console.log(err);
          done(err);
        });

    });

    it('should respond with hello world', done => {

      chai.request(server)
        .post('/users/register')
        .then(res => {

          // res.text
          // res.body

          expect(res.text).to.equal('hello world');

          done();
        }).catch(err => {
          // console.log(err);
          done(err);
        });

    });

  });

});