const validate = require('../../modules/modules').validate;
const errors   = require('../../modules/modules').errors;
const user     = require('../../data/models/models').user;
const jwt      = require('jsonwebtoken');

const getUserList = (req, res, next) => {

  try {

    user.retrieveUsers((retrieveErr, userObjArr) => {

      if (retrieveErr) {
        console.error(retrieveErr);
        next(retrieveErr);
      } else {

        const userList = userObjArr.map(userObj => {
          delete userObj.is_superuser;
          return userObj;
        });

        res.status(200).json(userList);
      }

    });

  } catch (err) {
    console.error(err);
    next(new Error(errors.serverError));
  }

};

const getUserById = (req, res, next) => {

  const user_id = req.params.user_id;
  
  try {

    user.retrieveUserBy({ user_id }, (retrieveErr, userObj) => {

      if (retrieveErr) next(retrieveErr);
      else {
        delete userObj.is_superuser;
        res.status(200).json(userObj);
      }

    });

  } catch (err) {
    console.error(err);
    next(new Error(errors.serverError));
  }

};

const registerUser = (req, res, next) => {

  const validString = validate.registerUserData(req.body, req.params.type);

  if(validString !== 'valid') next(new Error(validString));
  else {

    try {

      user.createUser(req.body, (createErr, userIdArr) => {

        if(createErr) next(createErr);
        else if (userIdArr.length === 1) {
  
          const user_id = userIdArr[0];

          user.retrieveUserBy({ user_id }, (retrieveErr, userObj) => {

            if(retrieveErr) next(retrieveErr);
            else {
              const { user_id, email, is_admin, } = userObj;
              const secret = process.env.JWT_SECRET;
              const token  = jwt.sign({ email, is_admin }, secret);
              res.status(201).json({ user_id, token });
            }

          });
          
        }
  
      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }

};

const loginUser = (req, res, next) => {
  
  const validString = validate.loginUserData(req.body, req.params.type);

  if(validString !== 'valid') next(new Error(validString));
  else {

    try {

      const { email, password, } = req.body;

      user.retrieveUserBy({ email }, (retrieveErr, userObj) => {
        
        if(retrieveErr) next(retrieveErr);
        else {

          const { user_id, is_admin, } = userObj;

          user.verifyUserPassword(user_id, password, (verifyErr, isMatch) => {

            if(verifyErr) next(verifyErr);
            else {
              if(!isMatch) next(new Error(errors.incorrectPassword));
              else {
                const secret = process.env.JWT_SECRET;
                const token  = jwt.sign({ email, is_admin }, secret);
                res.status(200).json({ user_id, token, });
              }
            }

          });

        }

      });

    } catch (err) {
      console.error(err);
      next(new Error(errors.serverError));
    }

  }

};

const editUser = (req, res, next) => {

};

const removeUser = (req, res, next) => {

};

module.exports = {
  getUserList,
  getUserById,
  registerUser,
  loginUser,
  editUser,
  removeUser,
};