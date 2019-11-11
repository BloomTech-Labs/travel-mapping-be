const validate = require('../../modules/modules').validate;
const user     = require('../../data/models/models').user;
const jwt      = require('jsonwebtoken');

const registerUser = (req, res, next) => {

  const validString = validate.registerUserData(req.body, req.query.type);

  if(validString !== 'valid') res.status(400).json({ error: validString });
  else {

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

  }

};

module.exports = {
  registerUser,
};