const errors = require('../../modules/modules').errors
const models = require('../../data/models/models');
const jwt    = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const verifyUserAuth = (req, res, next) => {

  // Verify that the Authorization header exists and that it contains a token.
  if(!req.get('Authorization')) next(new Error(errors.unauthorized));
  else {
    const token = req.get('Authorization').split(' ')[1];
    if(!token) next(new Error(errors.unauthorized));
    else {
      try {
        
        const payload = jwt.verify(token, secret);
        const { email } = payload;
        models.user.retrieveUserBy({ email }, (retrieveErr, userObj) => {

          const user_id = req.params.user_id ? parseInt(req.params.user_id) : null;
          
          // Authorize user.
          if (user_id !== null) {
            const isOwner = (userObj.user_id === user_id);
            if (isOwner)               next();  // Check resource owner
            else if (userObj.is_admin) next();  // Check admin
            else                       next(new Error(errors.unauthorized));
          } else if (userObj.is_admin) next();  // Check admin
          else                         next(new Error(errors.unauthorized));

        });

      } catch (err) {
        console.error(err);
        next(new Error(errors.unauthorized));
      }      
    } 
  }

};

module.exports = {
  verifyUserAuth,
};