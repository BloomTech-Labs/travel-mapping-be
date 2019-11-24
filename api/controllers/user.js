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

  const errorMsgOrTrue = validate.registerUserData(req.body, req.params.type);

  if(errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    try {

      user.createUser(req.body, (createErr, userIdArrOrObj) => {

        if(createErr) next(createErr);
        else {
  
          const user_id = !userIdArrOrObj[0].user_id ? userIdArrOrObj[0] : userIdArrOrObj[0].user_id;

          user.retrieveUserBy({ user_id }, (retrieveErr, userObj) => {

            if(retrieveErr) next(retrieveErr);
            else {
              const { email, } = userObj;
              const secret = process.env.JWT_SECRET;
              const token  = jwt.sign({ email }, secret);
              delete userObj.is_superuser;
              res.status(201).json({ ...userObj, token });
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
  
  const errorMsgOrTrue = validate.loginUserData(req.body, req.params.type);

  if(errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    try {

      const { email, password, } = req.body;

      user.retrieveUserBy({ email }, (retrieveErr, userObj) => {
        
        if(retrieveErr) next(retrieveErr);
        else {

          const { user_id, } = userObj;

          user.verifyUserPassword(user_id, password, (verifyErr, isMatch) => {

            if(verifyErr) next(verifyErr);
            else {
              if(!isMatch) next(new Error(errors.incorrectPassword));
              else {
                const secret = process.env.JWT_SECRET;
                const token  = jwt.sign({ email }, secret);
                delete userObj.is_superuser;
                res.status(200).json({ ...userObj, token, });
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
  
  const errorMsgOrTrue = validate.editUserData(req.body);

  if(errorMsgOrTrue !== true) next(new Error(errorMsgOrTrue));
  else {

    try {

      const user_id = parseInt(req.params.user_id);
      const userObj = req.body;

      user.updateUserById(user_id, userObj, (editErr, userIdArr) => {

        if(editErr) next(editErr);
        else {

          user.retrieveUserBy({ user_id }, (retrieveErr, userObj) => {

            if(retrieveErr) next(retrieveErr);
            else {
              delete userObj.is_superuser;
              res.status(200).json({ ...userObj });
            }

          });

        }

      });

    } catch(err) {
      console.log(err);
      next(new Error(errors.serverError));
    }
  }

};

const removeUser = (req, res, next) => {

  try {

    const user_id = parseInt(req.params.user_id);

    user.deleteUserById(user_id, (deleteErr, userIdArr) => {

      if(deleteErr) next(deleteErr);
      else {
        res.status(200).json({ user_id });
      }

    });

  } catch(err) {
    console.error(err);
    next(new Error(errors.serverError));
  }
  

};

module.exports = {
  getUserList,
  getUserById,
  registerUser,
  loginUser,
  editUser,
  removeUser,
};