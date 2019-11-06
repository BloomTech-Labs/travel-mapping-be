const models = require('../../../data/models/models');
const expect = require('chai').expect;

describe('Test model', () => {
  describe('createTest function', () => {

    it('should return \'Hello World!\'', () => {
      expect(models.test.createTest()).to.equal('Hello World!');
    });
      
  });

});