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
      case routes.getUsersMedia():
      case routes.createAlbum():
      case routes.removeUser():
      case routes.editUser():
      case routes.getInvitesByUser():
      case routes.getInvitesForUser():

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
      case routes.getAlbum():
      case routes.editAlbumMeta():
      case routes.createInvitation():
      case routes.getInvitesByAlbum():
      case routes.getCollaborators():
      case routes.deleteMedia():
        
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

                  models.collaborator.checkCollaboration(album_id, userObj.user_id, (collabErr, isCollab) => {

                    if (collabErr) next(collabErr);
                    else {

                      req.isOwner      = (userObj.user_id === albumObj.user_id);
                      req.isAdmin      = userObj.is_admin;
                      req.isCollab     = isCollab;
                      req.current_user = userObj;
                      req.collabAlbums = [];
                      next();
                      
                    }

                  });   
    
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

      // check that user is either the creator or the recipient of the invite, and assigns them permission to delete it
      case routes.removeInvitation():
        
        if (email !== null) {
          models.user.retrieveUserBy({ email }, (userRetrieveErr, userObj) => {

            if (userRetrieveErr) next(userRetrieveErr);
            else {

              const invite_id = parseInt(req.params.invite_id);
              models.invitation.getInviteById(invite_id, (inviteRetrieveErr, inviteObj) => {

                if (inviteRetrieveErr) next(inviteRetrieveErr);
                else if (!inviteObj) next(new Error(errors.invitationDoesNotExist));
                else {

                  req.isOwner = userObj.user_id === inviteObj.user_id || userObj.user_id === inviteObj.invited_user_id;
                  res.isAdmin = userObj.is_admin;
                  next();

                }

              });

            }

          });
        } else next(new Error(errors.unauthorized));
        break;

      // check that the user is the recipient of the invite, and assigns them permission to accept it
      case routes.acceptInvitation():

        if (email !== null) {
          models.user.retrieveUserBy({ email }, (userRetrieveErr, userObj) => {

            if (userRetrieveErr) next(userRetrieveErr);
            else {

              const invite_id = parseInt(req.params.invite_id);
              models.invitation.getInviteById(invite_id, (inviteRetrieveErr, inviteObj) => {

                if (inviteRetrieveErr) next(inviteRetrieveErr);
                else if (!inviteObj) next(new Error(errors.invitationDoesNotExist));
                else {

                  req.isOwner = userObj.user_id === inviteObj.invited_user_id;
                  req.isAdmin = userObj.is_admin;
                  next();

                }

              });

            }

          });
        } else next(new Error(errors.unauthorized));
        break;

      case routes.deleteCollaborator():

        if (email !== null) {

          const album_id = parseInt(req.params.album_id);
          const collaborator_id = parseInt(req.params.collaborator_id);

          models.user.retrieveUserBy({ email }, (userErr, userObj) => {

            if (userErr) next(userErr);
            else {

              models.album.retrieveAlbumById(album_id, (albumErr, albumObj) => {

                if (albumErr) next(albumErr)
                else {

                  models.collaborator.getCollaboratorById(collaborator_id, (collabErr, collabObj) => {

                    if (collabErr) next(collabErr);
                    else {

                      req.isOwner = userObj.user_id === albumObj.user_id || userObj.user_id === collabObj.user_id;
                      req.isAdmin = userObj.is_admin;
                      next();

                    }

                  });
              
                }

              });

            }

          });

        } else next(new Error(errors.unauthorized));
        break;

      case routes.getMediaData():
      case routes.editMedia():

        if (email !== null) {

          const media_id = parseInt(req.params.media_id);

          models.user.retrieveUserBy({ email }, (userErr, userObj) => {

            if (userErr) next(userErr);
            else {

              models.media.isOwnerOrCollaborator(media_id, userObj.user_id, (mediaErr, isOwner, isCollab) => {

                if (mediaErr) next(mediaErr);
                else {

                  req.isAdmin = userObj.isAdmin;
                  req.isOwner = isOwner;
                  req.isCollab = isCollab;

                  next();

                }

              });

            }

          });

        } else next(new Error(errors.unauthorized));
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