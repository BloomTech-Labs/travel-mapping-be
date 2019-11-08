const environment = process.env.NODE_ENV || 'development';
const server = environment === 'testing' 
  ? require('../../server') 
  : 'http://localhost:4000';
const chaiHttp = require('chai-http');
const chai     = require('chai');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('Users endpoint integration tests', () => {

  describe('/users', () => {

    it('should respond with hello world', done => {

      chai.request(server)
        .post('/users')
        .then(res => {

          // res.text
          // res.body

          // console.log(res.body);

          expect(res.text).to.equal('hello world');

          done();
        }).catch(err => console.log(err));

    });

  });

});