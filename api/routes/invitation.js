const express     = require('express');
const router      = express.Router();
const errors      = require('../../modules/modules').errors;
const routes      = require('../../modules/modules').routes;
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const api         = { ...controllers, ...middleware };


// POST HTTP/1.1 201 CREATED
// #region
/**
 * 
 *  @api {post} /albums/:album_id/invites/create Invite a user to collaborate on an album
 *  @apiName Create-invitation
 *  @apiGroup Invitations
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission album owner
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The album ID
 *  @apiparam (Request Body) {String} invited_email the email of user to be invited
 *  
 *  @apiParamExample {json} Example Request
 *      /albums/4563/invites/create
 *      {
 *          "invited_email": "test@gmail.com"
 *      }
 * 
 *  @apiSuccess {Object[]} invitation the invitation object
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {  
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": "2343",
 *        "created_at": "2019-11-06 18:42:57"
 *     }
 *  
 *   @apiError {Object} selfInvitation The user_id and the invited_user_id match
 *   @apiError {Object} invalidProps missing required keys in the body
 *   @apiError {Object} inviteeIdDoesNotExist The invited_user_id does not exist in the database
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 */
// #endregion
router.post(routes.createInvitation(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.createInvitation);


// GET HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /albums/:album_id/invites get all pending invitations for an album
 *  @apiName Get-album-invitations
 *  @apiGroup Invitations
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission album owner
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
 *  @apiSuccess {Object[]} invitation the invitation object
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{  
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": 2343,
 *        "invited_user_name": "test",
 *        "invited_user_email": "test@test.com",
 *        "created_at": "2019-11-06 18:42:57"
 *     }, {
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": 2343,
 *        "invited_user_name": "test2",
 *        "invited_user_email": "test2@test.com",
 *        "created_at": "2019-11-06 18:42:57"
 *     }]
 *  
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 */
// #endregion
router.get(routes.getInvitesByAlbum(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.getInvitesByAlbum);

// GET HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /users/:user_id/invites/from get all pending invitations created by a user
 *  @apiName get-invites-from-user
 *  @apiGroup Invitations
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The user ID
 *
 *  @apiSuccess {Object[]} invitation the invitation object
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{  
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": 2343,
 *        "created_at": "2019-11-06 18:42:57",
 *        "invited_user_email": "test2@test.com",
 *        "invited_user_name": "test2"
 *     }, {
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": 2343,
 *        "created_at": "2019-11-06 18:42:57",
 *        "invited_user_email": "test3@test.com",
 *        "invited_user_name": "test3"
 *     }]
 *  
 *   @apiError {Object} missingUserId the user_id was missing or not parsed correctly
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 */
// #endregion
router.get(routes.getInvitesByUser(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.getInvitesByUser);

// GET HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /users/:user_id/invites/to get all pending invitations sent to a user
 *  @apiName get-invites-to-user
 *  @apiGroup Invitations
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The user ID
 *
 *  @apiSuccess {Object[]} invitation the invitation object
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{  
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": 2343,
 *        "created_at": "2019-11-06 18:42:57",
 *        "user_email": "test2@test.com",
 *        "user_name": "test2",
 *        "title": "a title",
 *        "description": "a description",
 *        "cover_url": "htts://photos.com/yourphoto"
 *     }, {
 *        "invitation_id": 2345
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "invited_user_id": 2343,
 *        "created_at": "2019-11-06 18:42:57",
 *        "user_email": "test3@test.com",
 *        "user_name": "test3",
 *        "title": "a title",
 *        "description": "a description",
 *        "cover_url": "htts://photos.com/yourphoto"
 *     }]
 *  
 *   @apiError {Object} missingUserId the user_id was missing or not parsed correctly
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 */
// #endregion
router.get(routes.getInvitesForUser(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.getInvitesForUser);

// DELETE HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {delete} /invites/:invite_id/remove delete the specified invitation
 *  @apiName remove-invite
 *  @apiGroup Invitations
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user invited_user
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} invite_id The user ID
 *
 *  @apiSuccess {Integer} invite_id the removed invite
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {  
 *        "invitation_id": 2345
 *     }
 *  
 *   @apiError {Object} invitationDoesNotExist invite_id does not match any existing invitation
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "invitationDoesNotExist": "invite id does not exist"
 *      }
 * 
 */
// #endregion
router.delete(routes.removeInvitation(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.removeInvite);

// GET HTTP/1.1 201 CREATED
// #region
/**
 * 
 *  @api {get} /invites/:invite_id/accept accept the invitation
 *  @apiName accept-invite
 *  @apiGroup Invitations
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission invited_user
 * 
 *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} invite_id The user ID
 *
 *  @apiSuccess {Integer} collaborator_id the id of the collaborator relationship
 *  @apiSuccess {Integer} album_id the album they've joined
 *  @apiSuccess {Integer} user_id the user added as a collaborator to the album
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {  
 *       "collaborator_id": 3,
 *       "album_id": 1,
 *       "user_id": 1
 *     }
 *  
 *   @apiError {Object} invitationDoesNotExist invite_id does not match any existing invitation
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "invitationDoesNotExist": "invite id does not exist"
 *      }
 * 
 */
// #endregion
router.get(routes.acceptInvitation(), api.auth.verifyToken, api.auth.verifyPermission, api.invitation.acceptInvite);

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
    case errors.invitationDoesNotExist:
      res.status(404).json({ invitationDoesNotExist: errors.invitationDoesNotExist });
      break;
    case errors.alreadyCollaborator:
      res.status(400).json({ alreadyCollaborator: errors.alreadyCollaborator });
      break;
    case errors.emailDoesNotExist:
      res.status(404).json({ emailDoesNotExist: errors.emailDoesNotExist });
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