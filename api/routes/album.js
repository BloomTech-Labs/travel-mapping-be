const express     = require('express');
const router      = express.Router();
const errors      = require('../../modules/modules').errors;
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const Sentry      = require('@sentry/node');
const sentryError = Sentry.Handlers.errorHandler();
const api         = { ...controllers, ...middleware };

// POST HTTP/1.1 201 CREATED
// #region
/**
 *  @api {post} /albums/create Create a new album
 *  @apiName Create-new-album
 *  @apiGroup Albums
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiParam (Request Body) {Integer} user_id The ID of the user that owns the album (Required)
 *  @apiParam (Request Body) {String} title The title of the album (Required)
 *  @apiparam (Request Body) {Text} description A description of the album
 *  @apiParam (Request Body) {Enum} access Access type of the album (public | private)
 *  
 *  @apiParamExample {json} Example Request
 *      /users/albums/create
 *      {
 *          "user_id": 6534,
 *          "title": "Vacation Photos",
 *          "description": "Awesome fun vacation time in the Mexico with all the friends",
 *          "access": "public"
 *      }
 * 
 *  @apiParamExample {json} Example Request
 *      /users/albums/create
 *      {
 *          "user_id": 6534,
 *          "title": "Wedding Photos",
 *          "description": "The everyone was fun at the wedding over there awesome",
 *          "access": "private"
 *      }
 * 
 *  @apiSuccess {Integer} album_id The created album ID
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "album_id": 6534,
 *     }
 * 
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} titleExists There is already an album with that title
 *   @apiError {Object} invalidTitle The album title is not valid
 *   @apiError {Object} invalidDescription The album description is not valid
 *   @apiError {Object} invalidAccessType The album access type is not valid
 *   @apiError {Object} missingUserId Request body is missing the required user_id property
 *   @apiError {Object} missingTitle Request body is missing the required title property
 *   @apiError {Object} missingDescription Request body is missing the required description property
 *   @apiError {Object} missingAccess Request body is missing the required access property
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Title Exists
 *      HTTP/1.1 400
 *      {
 *          "titleExists": "there is already an album with that title"
 *      }
 * 
 *   @apiErrorExample Missing Description
 *      HTTP/1.1 404
 *      {
 *          "missingDescription": "request body is missing the required description property"
 *      }
 */
// #endregion
router.post('/albums/create', /* api.auth.verifyUserAuth, */ api.album.createAlbum, sentryError);

// Error handler
router.use((err, req, res, next) => {

  switch (err.message) {
    case errors.unauthorized:
        res.status(401).json({ unauthorized: errors.unauthorized });
        break;
    case errors.userIdDoesNotExist:
        res.status(404).json({ userIdDoesNotExist: errors.userIdDoesNotExist });
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