
module.exports = {

  // Controller errors
  serverError: 'server error',

  // Module errors
  tooManyProps:        'user object contains too many properties',
  missingDisplayName:  'user object is missing required display_name property',
  missingEmail:        'user object is missing required email property',
  missingPassword:     'user object is missing required password property',
  invalidRegisterType: 'invalid registration type',
  incorrectPassword:   'password is not correct',

  // Model errors
  userDoesNotExist:        'user does not exist',
  userIdDoesNotExist:      'user id does not exist',
  displayNameDoesNotExist: 'display name does not exist',
  emailDoesNotExist:       'email does not exist',
  invalidProperty:         'invalid property',
  displayNameExists:       'display name already exists',
  emailExists:             'email already exists',
  invalidDisplayName:      'display name is not valid',
  invalidEmail:            'email is not valid',
  invalidPassword:         'password is not valid',
  passwordNotAssociated:   'a password is not associated with that account'

};