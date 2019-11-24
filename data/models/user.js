const validate    = require('../../modules/modules').validate;
const errors      = require('../../modules/modules').errors;
const db          = require('../dbConfig');
const validator   = require('validator');
const bcrypt      = require('bcrypt');
const salt        = parseInt(process.env.PASS_SALT) || 10;
const environment = process.env.NODE_ENV || 'development';
const returning   = (environment === 'review'  ||   
                     environment === 'staging' ||
                     environment === 'production');

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
            }, returning ? ['user_id'] : null)
            .then(userIdArrOrObj  => done(null, userIdArrOrObj))
            .catch(insertErr => done(insertErr));
          }

        }).catch(retrieveEmailErr => done(retrieveEmailErr));

    }).catch(retrieveDisplayNameErr => done(retrieveDisplayNameErr));

};

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
          user_id:      parseInt(userObj.user_id),
          is_admin:     userObj.is_admin     ? true : false,
          is_superuser: userObj.is_superuser ? true : false,
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
          user_id:      parseInt(userObj.user_id),
          is_admin:     userObj.is_admin     ? true : false,
          is_superuser: userObj.is_superuser ? true : false,
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

const updateUserById = (user_id, userObj, done) => {
  // Takes a user_id, an object of user data, and a callback function as arguments.
  // Updates the user data in the database and passes null and the user
  // id to the callback funcion.

  const { display_name = null, email = null, password = null } = userObj;

  // Check if user_id exists
  db('users').where({ user_id })
    .select('user_id')
    .then(userIdArr => {

      // Check if display_name already exists
      db('users').where({ display_name })
        .select('display_name')
        .then(displayNameArr => {

          // Check if email already exists
          db('users').where({ email })
            .select('email')
            .then(emailArr => {

              // Validate user data
              const userIdExists       = (userIdArr.length > 0)
              const displayNameExists  = (displayNameArr.length > 0);
              const emailExists        = (emailArr.length > 0);
              const displayNameIsValid = (display_name ? (!validator.contains(display_name, ' ') && validator.isAlphanumeric(display_name)) : true);
              const emailIsValid       = (email ? validator.isEmail(email) : true);
              const passwordIsValid    = password ? (validate.password(password, [])) : true;

              if(!userIdExists)             done(new Error(errors.userIdDoesNotExist));
              else if(displayNameExists)    done(new Error(errors.displayNameExists));
              else if(emailExists)          done(new Error(errors.emailExists));
              else if(!displayNameIsValid)  done(new Error(errors.invalidDisplayName));
              else if(!emailIsValid)        done(new Error(errors.invalidEmail));
              else if(!passwordIsValid)     done(new Error(errors.invalidPassword));
              else {

                const updateUserObj = Object.assign({ updated_at: db.fn.now() }, userObj, password ? { password: bcrypt.hashSync(password, salt) } : {});

                db('users').update(updateUserObj)
                .where({ user_id })
                .then(updatedNum => done(null, [{ user_id }]))
                .catch(insertErr => done(insertErr));
              }

            }).catch(retrieveEmailErr => done(retrieveEmailErr));

        }).catch(retrieveDisplayNameErr => done(retrieveDisplayNameErr));

      }).catch(userIdErr => done(userIdErr));

};

const deleteUserById = (user_id, done) => {
  // Takes a user id and a callback function as arguments.
  // Deletes a user from the database and passes null and 
  // the user id to the callback funcion.

  // Check if user_id exists
  db('users').where({ user_id })
    .select('user_id')
    .then(userIdArr => {

      // Validate user data
      const userIdExists = (userIdArr.length === 1);

      if(!userIdExists) done(new Error(errors.userIdDoesNotExist));
      else {

        db('users').where({ user_id })
          .delete()
          .then(numDeleted => {
            done(null, [{ user_id }]);
          }).catch(deleteErr => done(deleteErr));

      }

    })
    .catch(userIdErr => done(userIdErr));
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
      else if (!userArr[0].password) done(new Error(errors.passwordNotAssociated));
      else {
        done(null, validate.password(password, [], userArr[0].password));
      }

    }).catch(err => done(err));

};

module.exports = {
  createUser,
  retrieveUsers,
  retrieveUserBy,
  updateUserById,
  deleteUserById,
  verifyUserPassword,
};