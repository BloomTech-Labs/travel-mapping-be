const express     = require('express');
const router      = express.Router();
const errors      = require('../../modules/modules').errors;
const routes      = require('../../modules/modules').routes;
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const Sentry      = require('@sentry/node');
const sentryError = Sentry.Handlers.errorHandler();
const api         = { ...controllers, ...middleware };

// GET HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /albums/:album_id/collaborators Get all collaborators belonging to an album
 *  @apiName Get-collaborators
 *  @apiGroup Collaborators
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission owner
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The album ID
 * 
 *  @apiSuccess {Object[]} collaborators A list of the album's collaborators
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{
 *        "collaborator_id": 8,
 *        "user_id": 2,
 *        "album_id": 1,
 *        "permissions": "view",
 *        "expires_on": null,
 *        "created_at": "2020-01-08 13:45:02",
 *        "display_name": "test2",
 *        "email": "test2@test.com"
 *      }]
 * 
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} collaboratorDoesNotExist The collaborator_id does not exist in the database
 *   @apiError {Object} invalidAlbumAccess You lack sufficient permissions with that album to perform that action
 *   @apiError {Object} unauthorized Not logged in, or not authorized to interact with that album
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Album Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "albumIdDoesNotExist": "album_id does not exist"
 *      }
 * 
 */
// #endregion
router.get(routes.getCollaborators(), api.auth.verifyToken, api.auth.verifyPermission, api.collaborator.getCollaborators);

// DELETE HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {delete} /albums/:album_id/collaborators/:collaborator_id/remove Remove this collaborator's association with the album
 *  @apiName Remove-collaborator
 *  @apiGroup Collaborators
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission owner
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The album ID
 * 
 *  @apiSuccess {Integer} deleted The collaborator_id of the removed collaborator
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *       "deleted": 6
 *     }
 * 
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} collaboratorDoesNotExist The collaborator_id does not exist in the database
 *   @apiError {Object} invalidAlbumAccess You lack sufficient permissions with that album to perform that action
 *   @apiError {Object} unauthorized Not logged in, or not authorized to interact with that album
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Album Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "albumIdDoesNotExist": "album_id does not exist"
 *      }
 * 
 */
// #endregion
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