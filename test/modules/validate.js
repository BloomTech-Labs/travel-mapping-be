const validate = require('../../modules/modules').validate;
const expect   = require('chai').expect;

describe('Testing the validation module functions', () => {

  describe('registerUserData function', () => {

    const VALID_USERS = [{
      display_name: 'test',
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke'
    }];

    const INVALID_USERS = [{
      display_name: 'test',
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke',
      invalidProp: '',
    }, {
      email: '',
      password: '',
    }, {
      display_name: '',
      password: '',
    }, {
      display_name: '',
      email: '',
    }];

    it('should return \'invalid registration type\'', () => {
      expect(validate.registerUserData(VALID_USERS[0], 'invalid type')).to.equal('invalid registration type');
    });

    it('should return \'user object contains too many properties\'', () => {
      expect(validate.registerUserData(INVALID_USERS[0], 'email')).to.equal('user object contains too many properties');
    });

    it('should return \'user object is missing required property: display_name\'', () => {
      expect(validate.registerUserData(INVALID_USERS[1], 'email')).to.equal('user object is missing required property: display_name');
    });

    it('should return \'user object is missing required property: email\'', () => {
      expect(validate.registerUserData(INVALID_USERS[2], 'email')).to.equal('user object is missing required property: email')
    });

    it('should return \'user object is missing required property: password\'', () => {
      expect(validate.registerUserData(INVALID_USERS[3], 'email')).to.equal('user object is missing required property: password')
    });

    it('should return \'valid\'', () => {
      expect(validate.registerUserData(VALID_USERS[0], 'email')).to.equal('valid');
    });

  });

});