const errors = require('../../modules/modules').errors;
const routes = require('../../modules/modules').routes;
const models = require('../../data/models/models');
const jwt    = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {

  // Verify that the Authorization header exists and that it contains a token.
  if(!req.get('Authorization')) next();
  else {
    const token = req.get('Authorization').split(' ')[1];
    if(!token) next(new Error(errors.unauthorized));
    else {
      try {
        
        req.payload = jwt.verify(token, secret);
        next();

      } catch (err) {
        console.error(err);
        next();
      }      
    } 
  }

};

const verifyPermission = (req, res, next) => {

  const email = (typeof req.payload !== 'undefined' ? req.payload.email : null);

  try {

    switch(req.route.path) {

      // Uses the users ID and email to check permissions and authorize users.
      case routes.addAlbumsMedia():
      case routes.createAlbum():
      case routes.removeUser():
      case routes.editUser():

        if (email !== null) {

          models.user.retrieveUserBy({ email }, (retrieveErr, userObj) => {

            const user_id = req.params.user_id ? parseInt(req.params.user_id) : null;

            if (retrieveErr) next(retrieveErr);
            else {

              const isOwner = (userObj.user_id === user_id);
              const isAdmin = userObj.is_admin;

              if (isOwner || isAdmin) next();
              else next(new Error(errors.unauthorized));

            }

          });
        } else next(new Error(errors.unauthorized));
        break;

      // Uses the album ID and users email to check permissions and authorize users.
      case routes.addAlbumMetaData():
      case routes.getAlbumsMedia():
      case routes.removeAlbum():
      case routes.editAlbum():
        
        const album_id = parseInt(req.params.album_id);

        // Get the album.
        models.album.retrieveAlbumById(album_id, (retrieveErr, albumObj) => {

          if (retrieveErr) next(retrieveErr);
          else {

            // Get the user.
            if (email !== null) {
              models.user.retrieveUserBy({ email }, (retrieveErr, userObj) => {
    
                if (retrieveErr) next(retrieveErr);
                else {
    
                  req.isOwner      = (userObj.user_id === albumObj.user_id);
                  req.isAdmin      = userObj.is_admin;
                  req.collabAlbums = [];
                  next();
    
                }
    
              });
            } else next(new Error(errors.unauthorized));

          }

        });
        break;

      // Uses the user ID and users email to check permissions and sets the permission on the request.
      case routes.getUsersAlbums():

        if (email !== null) {
          models.user.retrieveUserBy({ email }, (retrieveErr, userObj) => {

            const user_id = req.params.user_id ? parseInt(req.params.user_id) : null;

            if (retrieveErr) next(retrieveErr);
            else {

              req.isOwner      = (userObj.user_id === user_id);
              req.isAdmin      = userObj.is_admin;
              req.collabAlbums = [];
              next();

            }

          });
        } else next();
        break;
      default:
        next(new Error(errors.unauthorized));
        break;
    }

  } catch (err) {
    console.error(err);
    next(new Error(errors.serverError));
  }

};

module.exports = {
  verifyToken,
  verifyPermission,
};