const utils  = require('../../modules/modules').utils;
const expect = require('chai').expect;

describe('Testing the utils module functions', () => {

  describe('getEnvironmentHost function', () => {

    it('should return http://localhost:4000 when development is passed', () => {

      expect(utils.getEnvironmentHost('development')).to.equal('http://localhost:4000');

    });

    it('should return http://localhost:4000 when testing is passed', () => {

      expect(utils.getEnvironmentHost('development')).to.equal('http://localhost:4000');

    });

    it('should return https://piktorlogstaging-pr-0.herokuapp.com when review is passed', () => {

      expect(utils.getEnvironmentHost('review')).to.equal('https://piktorlogstaging-pr-0.herokuapp.com');

    });

    it('should return https://piktorlogstaging.herokuapp.com when staging is passed', () => {

      expect(utils.getEnvironmentHost('staging')).to.equal('https://piktorlogstaging.herokuapp.com');

    });

    it('should return https://piktorlog.herokuapp.com when production is passed', () => {

      expect(utils.getEnvironmentHost('production')).to.equal('https://piktorlog.herokuapp.com');

    });

    it('should return https://piktorlog.herokuapp.com when a number is passed', () => {

      expect(utils.getEnvironmentHost('production')).to.equal('https://piktorlog.herokuapp.com');

    });

    it('should return https://piktorlog.herokuapp.com when an invalid environment is passed', () => {

      expect(utils.getEnvironmentHost('not valid')).to.equal('https://piktorlog.herokuapp.com');

    });

  });

});