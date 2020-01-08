const express     = require('express');
const router      = express.Router();
const errors      = require('../../modules/modules').errors;
const routes      = require('../../modules/modules').routes;
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const Sentry      = require('@sentry/node');
const sentryError = Sentry.Handlers.errorHandler();
const api         = { ...controllers, ...middleware };

router.get(routes.getCollaborators(), api.auth.verifyToken, api.auth.verifyPermission, api.collaborator.getCollaborators);

router.delete(routes.deleteCollaborator(), api.auth.verifyToken, api.auth.verifyPermission, api.collaborator.deleteCollaborator);

// Error handler
router.use((err, req, res, next) => {

  switch (err.message) {
    case errors.unauthorized:
      res.status(401).json({ unauthorized: errors.unauthorized });
      break;
    case errors.collaboratorDoesNotExist:
      res.status(404).json({ collaboratorDoesNotExist: errors.collaboratorDoesNotExist });
      break;
    case errors.tooManyProps:
      res.status(400).json({ tooManyProps: errors.tooManyProps });
      break;
    case errors.noPropsFound:
      res.status(400).json({ noPropsFound: errors.noPropsFound });
      break;
    case errors.invalidProps:
      res.status(400).json({ invalidProps: errors.invalidProps });
      break;
    case errors.invalidAlbumDescription:
      res.status(400).json({ invalidAlbumDescription: errors.invalidAlbumDescription });
      break;
    case errors.invalidAlbumAccess:
      res.status(400).json({ invalidAlbumAccess: errors.invalidAlbumAccess });
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