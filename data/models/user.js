const validate  = require('../../modules/modules').validate;
const db        = require('../dbConfig');
const validator = require('validator');
const bcrypt    = require('bcrypt');
const salt      = 10;

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

      if (userArr.length === 0) cb(new Error('user does not exist'))
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
        done(new Error('invalid property'));
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

          if(displayNameExists)         done(new Error('display name already exists'));
          else if(emailExists)          done(new Error('email already exists'));
          else if(!displayNameIsValid)  done(new Error('display name is not valid'));
          else if(!emailIsValid)        done(new Error('email is not valid'));
          else if(!passwordIsValid)     done(new Error('password is not valid'));
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

module.exports = {
  retrieveUsers,
  retrieveUserBy,
  createUser,
};