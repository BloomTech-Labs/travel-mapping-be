const passwordValidator = require('password-validator');
const bcrypt            = require('bcrypt');
const errors            = require('./errors');

const registerUserData = (userObj, regType) => {
  // Verifies that the user object contains the required properties for each registration type.
  // Takes a user data object and a registration type string as parameters.
  // Returns 'valid' or an error message describing the invalid data.

  const type = regType.toLowerCase();

  switch(type) {
    case 'email':

      if(Object.keys(userObj).length > 3)               return errors.tooManyProps;
      else if(!userObj.hasOwnProperty('display_name'))  return errors.missingDisplayName;
      else if(!userObj.hasOwnProperty('email'))         return errors.missingEmail;
      else if(!userObj.hasOwnProperty('password'))      return errors.missingPassword;
      else return 'valid';
  
    case 'google':
    default:
      return errors.invalidRegisterType;
  }

};

const loginUserData = (userObj, regType) => {
  // Verifies that the user object contains the required properties for each registration type.
  // Takes a user data object and a registration type string as parameters.
  // Returns 'valid' or an error message describing the invalid data.

  const type = regType.toLowerCase();

  switch(type) {
    case 'email':

      if(Object.keys(userObj).length > 2)          return errors.tooManyProps;
      else if(!userObj.hasOwnProperty('email'))    return errors.missingEmail;
      else if(!userObj.hasOwnProperty('password')) return errors.missingPassword;
      else return 'valid';
  
    case 'google':
    default:
      return errors.invalidRegisterType;
  }

};

const password = (password, blacklist = [], hash = null) => {
  // Takes a password, an array of blacklisted passwords, and a hash as arguments.
  // Checks if the password is valid and does not match blacklisted passwords.
  // Returns true if password is valid or false if password is not valid.

  // Check if password matches hashed password.
  if (hash) return bcrypt.compareSync(password, hash);
  else {

    // Create password schema.
    const passwordSchema = new passwordValidator();

    // Set schema rules.
    passwordSchema
      .is().min(8)                  // Minimum length 8
      .is().max(24)                 // Maximum length 24
      .has().letters()              // Must contain letters
      .has().lowercase()            // Must contain lower case letters
      .has().uppercase()            // Must contain upper case letters
      .has().digits()               // Must contain digits
      .has().symbols()              // Must contain symbols
      .has().not().spaces()         // Must not contain spaces
      .is().not().oneOf(blacklist); // Must not match a blacklisted password

    return passwordSchema.validate(password);
  }
  
}

module.exports = {
  registerUserData,
  loginUserData,
  password,
};