const passwordValidator = require('password-validator');

const registerUserData = (userObj, regType) => {
  // Verifies that the user object contains the required properties for each registration type.
  // Takes a user data object and a registration type string as parameters.
  // Returns 'valid' or an error message describing the invalid data.

  // Variables.
  const type               = regType.toLowerCase();
  const tooManyProps       = 'user object contains too many properties';
  const missingDisplayName = 'user object is missing required property: display_name';
  const missingEmail       = 'user object is missing required property: email';
  const missingPassword    = 'user object is missing required property: password';

  switch(type) {
    case 'email':

      if(Object.keys(userObj).length > 3)               return tooManyProps;
      else if(!userObj.hasOwnProperty('display_name'))  return missingDisplayName;
      else if(!userObj.hasOwnProperty('email'))         return missingEmail;
      else if(!userObj.hasOwnProperty('password'))      return missingPassword;
      else return 'valid';
  
    case 'google':
    default:
      return 'invalid registration type';
  }

};

const password = (password, blacklist) => {
  // Takes a password and an array of blacklisted passwords as arguments.
  // Checks if the password is valid and does not match blacklisted passwords.
  // Returns true if password is valid or false if password is not valid.

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

module.exports = {
  registerUserData,
  password,
}