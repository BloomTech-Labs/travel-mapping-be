const invitation      = require('../../data/models/models').invitation;
const errors      = require('../../modules/modules').errors;

const createInvitation = (req, res, next) => {

  const album_id = parseInt(req.params.album_id);
  const { user_id, invited_user_id } = req.body;

  if (!user_id || !invited_user_id || !album_id) next(new Error(errors.invalidProps));
  else if (user_id === invited_user_id) next(new Error(errors.selfInvitation));
  else {

    try {

      if (req.isOwner || req.isAdmin) {

        invitation.createInvitation(album_id, user_id, invited_user_id, (inviteErr, inviteObj) => {
          
          if (inviteErr) next(inviteErr);
          else {

            res.status(201).json(inviteObj);

          }

        });

      } else next(new Error(errors.unauthorized));

    } catch (err) {
      console.error(err);
      next(err);
    }

  }
};

module.exports = {
  createInvitation
};