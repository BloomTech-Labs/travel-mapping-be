const api      = require('../../../controllers/middleware/middleware');
const server   = require('../../../server');
const chaiHttp = require('chai-http');
const chai     = require('chai');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('API Test endpoints', () => {


});

// chai.request(server).get('/')