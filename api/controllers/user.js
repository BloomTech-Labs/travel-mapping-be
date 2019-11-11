const validate = require('../../modules/modules').validate;
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
    next(new Error('server error'));
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
    next(new Error('server error'));
  }

};

const registerUser = (req, res, next) => {

  const validString = validate.registerUserData(req.body, req.query.type);

  if(validString !== 'valid') next(new Error(validString));
  else {

    try {

      user.createUser(req.body, (createErr, userIdArr) => {

        if(createErr) next(createErr);
        else if (userIdArr.length === 1) {
  
          const secret       = process.env.JWT_SECRET;
          const user_id      = userIdArr[0];
          const display_name = req.body.display_name;
          const email        = req.body.email;
          const token        = jwt.sign({ display_name, email }, secret);
  
          res.status(201).json({ user_id, token });
        }
  
      });

    } catch (err) {
      console.error(err);
      next(new Error('server error'));
    }

  }

};

module.exports = {
  getUserList,
  getUserById,
  registerUser,
};