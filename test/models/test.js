const db      = require('../../data/dbConfig');
const models  = require('../../data/models/models');
const expect  = require('chai').expect;

const TEST_DATA = {
  test_id: 0,
  name: 'John Doe',
  title: 'John Doe\'s Test',
  description: 'John Doe\'s test data API endpoint awesome'
};

describe('Test models tests', () => {

  describe('retrieveTests function', () => {

    beforeEach('clear data in tests table', done => {
      db.select()
        .from('tests')
        .del()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should pass an empty array to a callback function', done => {

      models.test.retrieveTests((retrieveErr, testsArr) => {

        expect(testsArr).to.be.an('array');
        expect(testsArr.length).to.equal(0);
        done(retrieveErr);
      });

    });

    it('should pass null to a callback function', done => {

      models.test.retrieveTests((retrieveErr, testsArr) => {
        expect(retrieveErr).to.equal(null);
        done(retrieveErr);
      });
      
    });

  });

  describe('createTest model', () => {

    beforeEach('clear data in tests table', done => {
      db.select()
        .from('tests')
        .del()
        .then(() => done())
        .catch(err => done(err));
    });

    it('should pass an array with one number element to a callback function', done => {

      models.test.createTest(TEST_DATA, (createErr, testIdArr) => {

        expect(testIdArr).to.be.an('array');
        expect(testIdArr.length).to.equal(1);
        expect(typeof testIdArr[0]).to.equal('number');
        done(createErr);
      
      });

    });

    it('should pass an array to a callback function that contains one number', done => {

      models.test.createTest(TEST_DATA, (createErr, testIdArr) => {

        expect(testIdArr.length).to.equal(1);
        expect(testIdArr).to.be.an('array');
        expect(typeof testIdArr[0] === 'number').to.equal(true);
        done(createErr);

      });

    });

    it('should pass null to a callback function', done => {

      models.test.createTest(TEST_DATA, (createErr, testIdArr) => {

        expect(createErr).to.equal(null);
        done(createErr);

      });

    });

    it('should pass an error to a callback function', done => {

      models.test.createTest(TEST_DATA, (createErrOne, testIdArrOne) => {

        if (createErrOne) done(createErrOne);
        else {
          models.test.createTest(TEST_DATA, (createErr, testIdArr) => {
            expect(createErr).to.be.an('error');
            done();
          });
        }

      });

    });

  });

});