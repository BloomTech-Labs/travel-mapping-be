const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const bcrypt   = require('bcrypt');
const expect   = require('chai').expect;
const salt     = process.env.PASS_SALT || 10;

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

    it(`should return ${ errors.invalidRegisterType }`, () => {
      expect(validate.registerUserData(VALID_USERS[0], 'invalid type')).to.equal(errors.invalidRegisterType);
    });

    it(`should return ${ errors.tooManyProps }`, () => {
      expect(validate.registerUserData(INVALID_USERS[0], 'email')).to.equal(errors.tooManyProps);
    });

    it(`should return ${ errors.missingDisplayName }`, () => {
      expect(validate.registerUserData(INVALID_USERS[1], 'email')).to.equal(errors.missingDisplayName);
    });

    it(`should return ${ errors.missingEmail }`, () => {
      expect(validate.registerUserData(INVALID_USERS[2], 'email')).to.equal(errors.missingEmail);
    });

    it(`should return ${ errors.missingPassword }`, () => {
      expect(validate.registerUserData(INVALID_USERS[3], 'email')).to.equal(errors.missingPassword);
    });

    it('should return valid', () => {
      expect(validate.registerUserData(VALID_USERS[0], 'email')).to.equal('valid');
    });

  });

  describe('loginUserData function', () => {

    const VALID_USERS = [{
      email: 'test@mail.com',
      password: 'gh43##5A!SG$u77*ke'
    }];

    const INVALID_USERS = [{
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

    it(`should return ${ errors.invalidRegisterType }`, () => {
      expect(validate.loginUserData(VALID_USERS[0], 'invalid type')).to.equal(errors.invalidRegisterType);
    });

    it(`should return ${ errors.tooManyProps }`, () => {
      expect(validate.loginUserData(INVALID_USERS[0], 'email')).to.equal(errors.tooManyProps);
    });

    it(`should return ${ errors.missingEmail }`, () => {
      expect(validate.loginUserData(INVALID_USERS[2], 'email')).to.equal(errors.missingEmail);
    });

    it(`should return ${ errors.missingPassword }`, () => {
      expect(validate.loginUserData(INVALID_USERS[3], 'email')).to.equal(errors.missingPassword);
    });

    it('should return valid', () => {
      expect(validate.loginUserData(VALID_USERS[0], 'email')).to.equal('valid');
    });

  });

  describe('password function', () => {

    const VALID_PASSWORDS   = ['hkTQ%*03', 'TQ%*03hk'];
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

      expect(validate.password(password)).to.equal(true);

    });

    it('should return false when a password is not at least 8 characters', () => {

      const password = INVALID_PASSWORDS[0];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password is more than 24 characters', () => {

      const password = INVALID_PASSWORDS[1];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain letters', () => {

      const password = INVALID_PASSWORDS[2];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain lower case letters', () => {

      const password = INVALID_PASSWORDS[3];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain upper case letters', () => {

      const password = INVALID_PASSWORDS[4];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain numbers', () => {

      const password = INVALID_PASSWORDS[5];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password does not contain symbols', () => {

      const password = INVALID_PASSWORDS[6];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when a password contains spaces', () => {

      const password = INVALID_PASSWORDS[7];

      expect(validate.password(password)).to.equal(false);

    });

    it('should return false when password matches a blacklisted password', () => {

      const password = INVALID_PASSWORDS[8];

      expect(validate.password(password, [password])).to.equal(false);

    });

    it('should return true when the password and hash match', () => {

      const password = VALID_PASSWORDS[0];
      const hash     = bcrypt.hashSync(password, salt);

      expect(validate.password(password, [], hash)).to.equal(true);

    });

    it('should return false when the password and hash don\'t match', () => {

      const passwordOne = VALID_PASSWORDS[0];
      const passwordTwo = VALID_PASSWORDS[1];
      const hash        = bcrypt.hashSync(passwordOne, salt);

      expect(validate.password(passwordTwo, [], hash)).to.equal(false);

    });

  });

});