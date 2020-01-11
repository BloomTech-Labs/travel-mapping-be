const passwordValidator = require('password-validator');
const validator         = require('validator');
const bcrypt            = require('bcrypt');
const errors            = require('./errors');

// Controllers
const registerUserData = (userObj, regType) => {
  // Verifies that the user object contains the required properties for each registration type.
  // Takes a user data object and a registration type string as parameters. Returns true if the
  // data is valid or an error message describing the invalid data.

  const type = regType.toLowerCase();

  switch (type) {
    case 'email':

      if (Object.keys(userObj).length > 3)               return errors.tooManyProps;
      else if (!userObj.hasOwnProperty('display_name'))  return errors.missingDisplayName;
      else if (!userObj.hasOwnProperty('email'))         return errors.missingEmail;
      else if (!userObj.hasOwnProperty('password'))      return errors.missingPassword;
      else                                               return true;
  
    case 'google':
    default:
      return errors.invalidRegisterType;
  }

};

const loginUserData = (userObj, regType) => {
  // Verifies that the user object contains the required properties for each registration type.
  // Takes a user data object and a registration type string as parameters. Returns true if the 
  // data is valid or an error message describing the invalid data.

  const type = regType.toLowerCase();

  switch (type) {
    case 'email':

      if (Object.keys(userObj).length > 2)          return errors.tooManyProps;
      else if (!userObj.hasOwnProperty('email'))    return errors.missingEmail;
      else if (!userObj.hasOwnProperty('password')) return errors.missingPassword;
      else                                          return true;
  
    case 'google':
    default:
      return errors.invalidRegisterType;
  }

};

const editUserData = (userObj) => {
  // Verifies the data in the user object is valid. Takes a user id
  // and an object as arguments. Returns true if the data is valid
  // or an error message describing the invalid data.

  const validProps = ['display_name', 'email', 'password'];
  const props = Object.keys(userObj);

  // Check if the userObj contains invalid props.
  const propsAreValid = (props.length === props.filter(prop => validProps.includes(prop)).length);

  if (props.length > validProps.length) return errors.tooManyProps;
  else if (props.length === 0)          return errors.noPropsFound;
  else if (!propsAreValid)              return errors.invalidProps;
  else                                  return true;

};

const createAlbumData = (albumObj) => {
  // Verifies that the album object contains the required properties.
  // Takes an album data object as an argument. Returns true if the
  // data is valid or an error message describing the invalid data.

  const props      = Object.keys(albumObj);
  const validProps = ['title', 'description', 'access', ];

  // Check if the userObj contains invalid props.
  const propsAreValid = (props.length === props.filter(prop => validProps.includes(prop)).length);

  if (props.length === 0)                       return errors.noPropsFound;
  else if (props.length > 3)                    return errors.tooManyProps;
  else if (!propsAreValid)                      return errors.invalidProps;
  else if (!albumObj.hasOwnProperty('title'))   return errors.missingAlbumTitle;
  else                                          return true;

};

const addAlbumMetaData = (metaArr) => {
  // Verifies that the objects in meta data array contains the required 
  // properties. Takes a meta object array as an argument. Returns true 
  // if the data is valid or an error message describing the invalid data.

  let validProps       = ['name', 'value'];
  let noPropsFound     = (metaArr.length === 0);
  let tooManyProps     = false;
  let propsAreValid    = true;
  let missingMetaName  = false;
  let missingMetaValue = false;

  // Validate meta data props.
  metaArr.forEach(metaObj => {

    const props = Object.keys(metaObj);
    
    props.forEach(prop => (!validProps.includes(prop) && (propsAreValid = false)));
    (props.length > validProps.length)  && (tooManyProps     = true);
    (!metaObj.hasOwnProperty('name'))   && (missingMetaName  = true);
    (!metaObj.hasOwnProperty('value'))  && (missingMetaValue = true);

  });
  
  if (noPropsFound)          return errors.noPropsFound;
  else if (tooManyProps)     return errors.tooManyProps;
  else if (!propsAreValid)   return errors.invalidProps;
  else if (missingMetaName)  return errors.missingMetaName;
  else if (missingMetaValue) return errors.missingMetaValue;
  else                       return true;

};

const editAlbumProps = (albumObj) => {
  // Verifies that the album data object contains the required properties.
  // Takes an album data object as an argument. Returns true if the data
  // is valid or an error message describing the invalid data.

  const validProps = ['title', 'description', 'access'];
  const props = Object.keys(albumObj);

  // Check if the userObj contains invalid props.
  const propsAreValid = (props.length === props.filter(prop => validProps.includes(prop)).length);
  const noPropsFound  = (props.length === 0);
  const tooManyProps  = (props.length > validProps.length);

  if (noPropsFound)        return errors.noPropsFound;
  else if (tooManyProps)   return errors.tooManyProps;
  else if (!propsAreValid) return errors.invalidProps;
  else                     return true;
};

const addMediaProps = (mediaObj) => {
  // Verifies that the media data object contains the required properties.
  // Takes a media data object as an argument. Returns true if the data
  // is valid or an error message describing the invalid data.

  const validBodyProps  = ['albums', 'media'];
  const validMediaProps = ['title', 'caption', 'keywords', 'meta'];
  const validMetaProps  = ['name', 'value'];

  const bodyProps = Object.keys(mediaObj) || [];
  const mediaArr  = mediaObj.media        || [];

  let noPropsFound  = false;
  let invalidProps  = false;
  let missingAlbums = false;
  let missingMedia  = false;
  let missingTitle  = false;
  let missingName   = false;
  let missingValue  = false;
  let tooManyProps  = false;

  (bodyProps.length === 0)        && (noPropsFound  = true);
  (!bodyProps.includes('albums')) && (missingAlbums = true);
  (!bodyProps.includes('media'))  && (missingMedia  = true);
  (bodyProps.length > validBodyProps.length) && (tooManyProps = true);
  bodyProps.forEach(prop => (!validBodyProps.includes(prop) && (invalidProps = true)));

  mediaArr.forEach(media => {

    const mediaProps = Object.keys(media);
    
    (!mediaProps.includes('title')) && (missingTitle = true);
    (mediaProps.length > validMediaProps.length) && (tooManyProps = true);
    mediaProps.forEach(prop => (!validMediaProps.includes(prop)) && (invalidProps = true));
    
    if (typeof media.meta !== 'undefined') {
      
      media.meta.forEach(meta => {
        
        const metaProps = Object.keys(meta);
        
        (!metaProps.includes('name'))  && (missingName  = true);
        (!metaProps.includes('value')) && (missingValue = true);
        (metaProps.length > validMetaProps.length) && (tooManyProps = true);
        metaProps.forEach(prop => (!validMetaProps.includes(prop)) && (invalidProps = true));
        
      });
      
    }
    
  });
  
  if (noPropsFound)       return errors.noPropsFound;
  else if (invalidProps)  return errors.invalidProps;
  else if (missingAlbums) return errors.missingAlbums;
  else if (missingMedia)  return errors.missingMedia;
  else if (missingTitle)  return errors.missingMediaTitle;
  else if (missingName)   return errors.missingMetaName;
  else if (missingValue)  return errors.missingMetaValue;
  else if (tooManyProps)  return errors.tooManyProps;
  else                    return true;

};

// Models
const displayName = (name) => {

};

const email = (email) => {

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
  
};

const albumTitle = (title) => {
  // Validates an album title. Takes a title string
  // as an argument. Returns true or false.

  if (typeof title !== 'string') return false;
  else if (title.length > 120)   return false;
  else                           return true;

};

const albumDescription = (description) => {
  // Validates an album description. Takes a description string
  // as an argument. Returns true or false.

  if (typeof description !== 'string') return false;
  else if (description.length > 300)   return false;
  else                                 return true;

};

const albumAccess = (access) => {
  // Validates an album access type. Takes an access string
  // as an argument. Returns true or false.

  const accessTypes = ['public', 'private'];

  if (typeof access !== 'string')         return false;
  else if (!accessTypes.includes(access)) return false;
  else                                    return true;

}

const metaName = (name) => {
  // Validates a meta field name. Takes a meta name string
  // as an argument. Returns true or false.

  if (typeof name !== 'string') return false;
  else if (name.length < 2)     return false;
  else if (name.length > 120)   return false;
  else                          return true;

};

const metaValue = (value) => {
  // Validates a meta field description. Takes a 
  // meta description string as arguments. Returns
  // true or false.

  if (typeof value !== 'string') return false;
  else if (value.length < 2)     return false;
  else if (value.length > 300)   return false;
  else                           return true;

};

const mediaTitle = (title) => {
  // Validates a media title. Takes a title string
  // as an argument. Returns true or false.

  if (typeof title !== 'string') return false;
  else if (title.length > 120)   return false;
  else                           return true;

};

const mediaCaption = (caption) => {
  // Validates a media caption. Takes a description 
  // string as an argument. Returns true or false.

  if (typeof caption !== 'string') return false;
  else if (caption.length > 300)   return false;
  else                             return true;

};

const keyword = (keyword) => {
  // Takes a keyword string as a parameter.
  // Returns true or false.

  if (typeof keyword !== 'string')      return false;
  if (keyword.length < 2)               return false;
  if (keyword.length > 120)             return false;
  if (validator.contains(keyword, ' ')) return false;
  else                                  return true;

};

const removeAlbumMetaData = (metaArr) => {

  let invalid = false;

  metaArr.forEach(e => {
    if (typeof e !== 'string') {
      invalid = true;
    }
  });

  if (invalid) return errors.invalidProps;
  else return true;

};

module.exports = {
  registerUserData,
  loginUserData,
  editUserData,
  password,
  createAlbumData,
  albumTitle,
  albumDescription,
  albumAccess,
  metaName,
  metaValue,
  addAlbumMetaData,
  editAlbumProps,
  mediaTitle,
  mediaCaption,
  addMediaProps,
  keyword,
  removeAlbumMetaData,
};