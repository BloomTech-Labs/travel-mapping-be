const validate = require('../../modules/modules').validate;

const registerUser = (req, res, next) => {

  const validString = validate.registerUserData(req.body, req.query.type);

  if(validString !== 'valid') res.status(400).json({ error: validString });
  else {

    res.json({});

  }

};

module.exports = {
  registerUser,
};