const validate  = require('../../modules/modules').validate;
const errors    = require('../../modules/modules').errors;
const db        = require('../dbConfig');
const validator = require('validator');
const bcrypt    = require('bcrypt');
const salt      = parseInt(process.env.PASS_SALT) || 10;

const retrieveUsers = done => {
  // Takes a callback function as an argument. Gets all
  // users from the database and passes them as an array
  // to the callback function.

  db.select()
    .table('users')
    .then(userObjArr   => {

      const userList = userObjArr.map(userObj => {

        // Delete the password from the object.
        userObj.password && (delete userObj.password);

        return Object.assign({}, userObj, {
          is_admin:     userObj.is_admin     === 0 ? false : true,
          is_superuser: userObj.is_superuser === 0 ? false : true,
         });
      });


      done(null, userList);
    })
    .catch(retrieveErr => done(retrieveErr));

};

const retrieveUserBy = (typeObj, done) => {
  // Takes a type object and a callback function as arguments.
  // Checks the property type and value and returns the appropiate
  // user data. typeObj: { email: 'test@mail.com' }

  const type = Object.keys(typeObj)[0];

  const retrieveuser = (obj, cb) => {

    db('users').where(obj)
    .select()
    .then(userArr => {

      if (userArr.length === 0) {
        switch (type) {
          case 'user_id':
            cb(new Error(errors.userIdDoesNotExist));
            break;
          case 'display_name':  
            cb(new Error(errors.displayNameDoesNotExist));
            break;
          case 'email':         
            cb(new Error(errors.emailDoesNotExist));
            break;
          default:
            cb(new Error(errors.invalidProperty));
            break;
        }
      } 
      else {

        const userObj = userArr[0];

        // Delete the password from the object.
        userObj.password && (delete userObj.password);
        
        cb(null, Object.assign({}, userObj, {
          is_admin:     userObj.is_admin     === 0 ? false : true,
          is_superuser: userObj.is_superuser === 0 ? false : true,
        }));

      }

    }).catch(retrieveErr => cb(retrieveErr));

  };

  switch(type) {
    case 'user_id':

      retrieveuser(typeObj, (retrieveUserErr, userObj) => {
        if (retrieveUserErr) done(retrieveUserErr);
        else done(null, userObj);
      });
      break;

    case 'display_name':

        retrieveuser(typeObj, (retrieveUserErr, userObj) => {
          if (retrieveUserErr) done(retrieveUserErr);
          else done(null, userObj);
        });
        break;

    case 'email':

        retrieveuser(typeObj, (retrieveUserErr, userObj) => {
          if (retrieveUserErr) done(retrieveUserErr);
          else done(null, userObj);
        });
        break;

      default:
        done(new Error(errors.invalidProperty));
        break;
  };

};

const createUser = (user, done) => {
  // Takes a user object and a callback function as arguments.
  // Validates the user data, creates a user in the database, and
  // passes the id to the callback function. 

  const { display_name, email, password } = user;

  // Check if display_name already exists
  db('users').where({ display_name })
    .select('display_name')
    .then(displayNameArr => {

      // Check if email already exists
      db('users').where({ email })
        .select('email')
        .then(emailArr => {

          // Validate user data
          const displayNameExists  = (displayNameArr.length > 0);
          const emailExists        = (emailArr.length > 0);
          const displayNameIsValid = (!validator.contains(display_name, ' ') && validator.isAlphanumeric(display_name));
          const emailIsValid       = validator.isEmail(email);
          const passwordIsValid    = password ? (validate.password(password, [])) : true;

          if(displayNameExists)         done(new Error(errors.displayNameExists));
          else if(emailExists)          done(new Error(errors.emailExists));
          else if(!displayNameIsValid)  done(new Error(errors.invalidDisplayName));
          else if(!emailIsValid)        done(new Error(errors.invalidEmail));
          else if(!passwordIsValid)     done(new Error(errors.invalidPassword));
          else {
            db('users').insert({
              display_name,
              email,
              password: password ? bcrypt.hashSync(password, salt) : null
            })
            .then(userIdArr  => done(null, userIdArr))
            .catch(insertErr => done(insertErr));
          }

        }).catch(retrieveEmailErr => done(retrieveEmailErr));

    }).catch(retrieveDisplayNameErr => done(retrieveDisplayNameErr));

};

const verifyUserPassword = (user_id, password, done) => {
  // Takes a user_id, password, and callback function as arguments.
  // Tests the users password against the stored password in the database.
  // Passes true if password matches and false if it doesn't match.

  // Get users password.
  db('users').where({ user_id })
    .select()
    .then(userArr => {
      
      if (userArr.length === 0)      done(new Error(errors.userIdDoesNotExist));
      else if (!userArr[0].password) done(new Error(error.passwordNotAssociated));
      else {
        done(null, validate.password(password, [], userArr[0].password));
      }

    }).catch(err => done(err));

};

module.exports = {
  retrieveUsers,
  retrieveUserBy,
  createUser,
  verifyUserPassword,
};