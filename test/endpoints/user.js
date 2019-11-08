const environment = process.env.NODE_ENV || 'development';
const server = environment === 'testing' 
  ? require('../../server') 
  : 'http://localhost:4001';
const chaiHttp = require('chai-http');
const chai     = require('chai');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('User endpoint integration tests', () => {

  describe('/users', () => {

    it('should respond with hello world', done => {
      chai.request(server)
          .post('/users')
          .then(() => {
            done();
          });
    });

  });

});