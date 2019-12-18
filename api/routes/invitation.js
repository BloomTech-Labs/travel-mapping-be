const express     = require('express');
const router      = express.Router();
const errors      = require('../../modules/modules').errors;
const routes      = require('../../modules/modules').routes;
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const api         = { ...controllers, ...middleware };

router.post(routes.createInvitation(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.createInvitation);

router.get(routes.getInvitesByAlbum(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.getInvitesByAlbum);

router.get(routes.getInvitesByUser(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.getInvitesByUser);

router.get(routes.getInvitesForUser(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.getInvitesForUser);

// Error handler
router.use((err, req, res, next) => {

  switch (err.message) {
    case errors.unauthorized:
      res.status(401).json({ unauthorized: errors.unauthorized });
      break;
    case errors.userIdDoesNotExist:
      res.status(404).json({ userIdDoesNotExist: errors.userIdDoesNotExist });
      break;
    case errors.inviteeIdDoesNotExist:
      res.status(404).json({ inviteeIdDoesNotExist: errors.inviteeIdDoesNotExist });
      break;
    case errors.selfInvitation:
      res.status(400).json({ selfInvitation: errors.selfInvitation });
      break;
    case errors.invitationAlreadyexists:
      res.status(400).json({ invitationAlreadyexists: errors.invitationAlreadyexists });
      break;
    case errors.noPropsFound:
      res.status(400).json({ noPropsFound: errors.noPropsFound });
      break;
    case errors.invalidProps:
      res.status(400).json({ invalidProps: errors.invalidProps });
      break;
    case errors.albumIdDoesNotExist:
      res.status(404).json({ albumIdDoesNotExist: errors.albumIdDoesNotExist });
      break;
    case errors.serverError:
      res.status(500).json({ serverError: errors.serverError });
      break;
    default:
      console.error(err);
      res.status(500).json({ serverError: errors.serverError });
      break;
  };
});

module.exports = router;