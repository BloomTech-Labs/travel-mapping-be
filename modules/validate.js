
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

module.exports = {
  registerUserData,
}