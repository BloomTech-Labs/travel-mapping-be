const { invitation, collaborator, user }      = require('../../data/models/models');
const errors      = require('../../modules/modules').errors;
const { genCoverPromiseArray } = require('../../modules/coverAlbum');

const createInvitation = (req, res, next) => {

  const album_id = parseInt(req.params.album_id);
  const { invited_email } = req.body;

  if (!invited_email || !album_id) next(new Error(errors.invalidProps));

  user.retrieveUserBy({ email: invited_email }, (userErr, invitedUser) => {
    
    if(userErr) next(userErr);
    else if (req.current_user.user_id === invitedUser.user_id) next(new Error(errors.selfInvitation));
    else {

      try {

        if (req.isOwner || req.isAdmin) {

          invitation.createInvitation(album_id, req.current_user.user_id, invitedUser.user_id, (inviteErr, inviteObj) => {
        
            if (inviteErr) next(inviteErr);
            else res.status(201).json(inviteObj);

          });

        }

      } catch (err) {
        console.error(err);
        next(err);
      }

    }

  });

};

const getInvitesByAlbum = (req, res, next) => {

  const album_id = parseInt(req.params.album_id);

  if (!album_id) next(new Error(errors.invalidProps))
  else {

    try {

      if (req.isOwner || req.isAdmin) {

        invitation.getInvitesByAlbum(album_id, (inviteErr, inviteArr) => {

          if (inviteErr) next(inviteErr);
          else res.status(200).json(inviteArr);

        });

      } else next(new Error(errors.unauthorized));

    } catch (err) {
      console.error(err);
      next(err);
    }

  }
};

const getInvitesByUser = (req, res, next) => {

  const user_id = parseInt(req.params.user_id);

  if (!user_id) next(new Error(errors.missingUserId));
  else {

    try {

      invitation.getInvitesByUser(user_id, (inviteErr, inviteArr) => {

        if (inviteErr) next(inviteErr);
        else res.status(200).json(inviteArr);

      });

    } catch (err) {
      console.error(err);
      next(err);
    }

  }

};

const getInvitesForUser = (req, res, next) => {

  const user_id = parseInt(req.params.user_id);

  if (!user_id) next(new Error(errors.missingUserId));
  else {

    try {
      
      invitation.getInvitesForUser(user_id, async (inviteErr, inviteArr) => {

        if (inviteErr) next(inviteErr);
        else {

          const invitesWithCovers = await genCoverPromiseArray(inviteArr);
          res.status(200).json(invitesWithCovers);

        }

      });

    } catch (err) {
      console.error(err);
      next(err);
    }

  }

};

const removeInvite = (req, res, next) => {

  const invite_id = parseInt(req.params.invite_id);

  try {

    if (req.isOwner || req.isAdmin) {

      invitation.deleteInviteById(invite_id, (inviteErr, removed) => {

        if (inviteErr) next(inviteErr);
        else res.status(200).json(removed);

      });

    } else next(new Error(errors.unauthorized));

  } catch (err) {
    console.error(err);
    next(err);
  }

};

const acceptInvite = (req, res, next) => {

  const invite_id = parseInt(req.params.invite_id);

  try {

    if (req.isOwner || req.isAdmin) {

      invitation.acceptInvite(invite_id, (inviteErr, collab) => {

        if (inviteErr) next(inviteErr);
        else res.status(201).json(collab);

      });

    } else next(new Error(errors.unauthorized));

  } catch (err) {
    console.error(err);
    next(err);
  }

};

module.exports = {
  createInvitation,
  getInvitesByAlbum,
  getInvitesByUser,
  getInvitesForUser,
  removeInvite,
  acceptInvite,
};