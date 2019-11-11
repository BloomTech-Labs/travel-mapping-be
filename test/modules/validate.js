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

  describe('password function', () => {

    const VALID_PASSWORDS   = ['hkTQ%*03'];
    const INVALID_PASSWORDS = [
      'hkTQ%*0',                   // 0 Too short
      'hkTQ%*03hkTQ%*03hkTQ%*031', // 1 Too long
      '2%8@%*03',                  // 2 No letters
      'HKTQ%*03',                  // 3 No lower case letters
      'hktq%*03',                  // 4 No upper case letters
      'hkTQ%*G&',                  // 5 No numbers
      'hkTQg703',                  // 6 No symbols
      'hk TQ% *03',                // 7 Contains spaces
      '12PassWord!@',              // 8 Blacklisted
    ];               

    it('should return true when a password is valid', () => {

      const password = VALID_PASSWORDS[0];

      expect(validate.password(password, [])).to.equal(true);

    });

    it('should return false when a password is not at least 8 characters', () => {

      const password = INVALID_PASSWORDS[0];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password is more than 24 characters', () => {

      const password = INVALID_PASSWORDS[1];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password does not contain letters', () => {

      const password = INVALID_PASSWORDS[2];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password does not contain lower case letters', () => {

      const password = INVALID_PASSWORDS[3];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password does not contain upper case letters', () => {

      const password = INVALID_PASSWORDS[4];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password does not contain numbers', () => {

      const password = INVALID_PASSWORDS[5];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password does not contain symbols', () => {

      const password = INVALID_PASSWORDS[6];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when a password contains spaces', () => {

      const password = INVALID_PASSWORDS[7];

      expect(validate.password(password, [])).to.equal(false);

    });

    it('should return false when password matches a blacklisted password', () => {

      const password = INVALID_PASSWORDS[8];

      expect(validate.password(password, [password])).to.equal(false);

    });

  });

});