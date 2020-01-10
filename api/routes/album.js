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
 *  @api {get} /users/:user_id/albums Get a users albums
 *  @apiName Get-users-albums
 *  @apiGroup Albums
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission any
 * 
  *  @apiHeader (Headers) {String} [Authorization] JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 * 
 *  @apiSuccess {Object[]} albums A list of the users albums
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "public",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57",
 *        "meta": {
 *            "location": "Mexico",
 *            "people": "Friends"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }, {
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "title": "Wedding Photos",
 *        "description": "The everyone was fun at the wedding over there awesome",
 *        "access": "private",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57",
 *        "meta": {
 *            "location": "Over There",
 *            "people": "Family"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }]
 * 
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
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
router.get(routes.getUsersAlbums(), api.auth.verifyToken, api.auth.verifyPermission, api.album.getUsersAlbums, sentryError);

// POST HTTP/1.1 201 CREATED
// #region
/**
 *  @api {post} /users/{user_id}/albums/create Create a new album
 *  @apiName Create-new-album
 *  @apiGroup Albums
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (Request Body) {String{0-120}} title The title of the album
 *  @apiparam (Request Body) {Text{0-300}} [description] A description of the album
 *  @apiParam (Request Body) {String="public", "private"} [access="public"] Access type of the album
 *  
 *  @apiParamExample {json} Example Request
 *      /users/6534/albums/create
 *      {
 *          "title": "Vacation Photos",
 *          "description": "Awesome fun vacation time in the Mexico with all the friends",
 *          "access": "public"
 *      }
 * 
 *  @apiParamExample {json} Example Request
 *      /users/6534/albums/create
 *      {
 *          "title": "Wedding Photos",
 *          "description": "The everyone was fun at the wedding over there awesome",
 *          "access": "private"
 *      }
 * 
 *  @apiSuccess {Integer} album_id The created album ID
 *  @apiSuccess {Integer} user_id The ID of the user who owns the album
 *  @apiSuccess {String} title The title of the album
 *  @apiSuccess {String} description The description of the album
 *  @apiSuccess {String} access The album access type
 *  @apiSuccess {String} created_at The date and time the album was created
 *  @apiSuccess {String} updated_at The date and time the album was updated
 *  @apiSuccess {Object} meta An empty placeholder object for album meta data
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "album_id": 0,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "public",
 *        "created_at": "2019-11-17 03:02:35",
 *        "updated_at": "2019-11-17 03:02:35",
 *        "meta": {},
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "album_id": 0,
 *        "user_id": 6534,
 *        "title": "Wedding Photos",
 *        "description": "The everyone was fun at the wedding over there awesome",
 *        "access": "private",
 *        "created_at": "2019-11-17 03:02:35",
 *        "updated_at": "2019-11-17 03:02:35",
 *        "meta": {},
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} userIdDoesNotExist The user ID does not exist in the database
 *   @apiError {Object} albumTitleExists There is already an album with that title
 *   @apiError {Object} invalidAlbumTitle The album title is not valid
 *   @apiError {Object} invalidAlbumDescription The album description is not valid
 *   @apiError {Object} invalidAlbumAccess The album access type is not valid
 *   @apiError {Object} missingAlbumTitle Request body is missing the required title property
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
 *      HTTP/1.1 400
 *      {
 *          "missingDescription": "request body is missing the required description property"
 *      }
 */
// #endregion
router.post(routes.createAlbum(), api.auth.verifyToken, api.auth.verifyPermission, api.album.createAlbum, sentryError);

// POST HTTP/1.1 201 CREATED
// #region
/**
 *  @api {post} /albums/{album_id}/meta/add Add album meta data
 *  @apiName Add-meta-data
 *  @apiGroup Albums
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The albums ID
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (Request Body) {Object[]} metaData A list of meta data objects
 *  @apiParam (Request Body) {String{1-120}} metaData[name] The name of the meta field
 *  @apiParam (Request Body) {String{1-300}} metaData[value] The value of the meta field
 *  
 *  @apiParamExample {json} Example Request
 *      /albums/642/meta/add
 *      [{
 *          "name": "Location",
 *          "value": "Mexico"
 *      }]
 * 
 *  @apiParamExample {json} Example Request
 *      /albums/642/meta/add
 *      [{
 *           "name": "Location",
 *           "value": "Over there"
 *      }, {
 *           "name": "People",
 *           "value": "Family"
 *      }]
 * 
 *  @apiSuccess {Integer} album_id The album ID
 *  @apiSuccess {Integer} user_id The ID of the user who owns the album
 *  @apiSuccess {String} title The title of the album
 *  @apiSuccess {String} description The description of the album
 *  @apiSuccess {String} access The access type of the album
 *  @apiSuccess {String} created_at The date and time the album was created
 *  @apiSuccess {String} updated_at The date and time the album was updated
 *  @apiSuccess {Object} meta The albums custom meta data
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "album_id": 642,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "public",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:47:02",
 *        "meta": {
 *            "Location": "Mexico"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "album_id": 642,
 *        "user_id": 6534,
 *        "title": "Wedding Photos",
 *        "description": "The everyone was fun at the wedding over there awesome",
 *        "access": "private",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:47:02",
 *        "meta": {
 *            "Location": "Over There",
 *            "People": "Family"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} metaFieldExists A meta field with that name already exists
 *   @apiError {Object} invalidMetaName The meta field name is not valid
 *   @apiError {Object} invalidMetaValue The meta description is not valid
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Already Exists
 *      HTTP/1.1 400
 *      {
 *          "metaFieldExists": "a meta field with that name already exists"
 *      }
 * 
 *   @apiErrorExample Invalid Description
 *      HTTP/1.1 400
 *      {
 *          "invalidMetaDescription": "meta description is not valid"
 *      }
 */
// #endregion
router.post(routes.addAlbumMetaData(), api.auth.verifyToken, api.auth.verifyPermission, api.album.addAlbumMetaData, sentryError);

// PUT HTTP/1.1 200 OK
// #region
/**
 *  @api {put} /albums/{album_id}/edit Edit an album
 *  @apiName Edit-an-album
 *  @apiGroup Albums
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
 * 
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The albums ID
 * 
 *  @apiParam (Request Body) {String{0-120}} [title] The title of the album
 *  @apiparam (Request Body) {Text{0-300}} [description] A description of the album
 *  @apiParam (Request Body) {String="public", "private"} [access="public"] Access type of the album
 * 
 *  @apiParamExample {json} Example Request
 *      /albums/642/edit
 *      {
 *          "access": "private"
 *      }
 * 
 *  @apiParamExample {json} Example Request
 *      /albums/642/edit
 *      {
 *          "title": "Vacation Photos",
 *          "description": "Awesome fun vacation time in the Mexico with all the friends"
 *      }
 * 
 *  @apiSuccess {Integer} album_id The album ID
 *  @apiSuccess {Integer} user_id The ID of the user who owns the album
 *  @apiSuccess {String} title The title of the album
 *  @apiSuccess {String} description The description of the album
 *  @apiSuccess {String} access The access type of the album
 *  @apiSuccess {String} created_at The date and time the album was created
 *  @apiSuccess {String} updated_at The date and time the album was updated
 *  @apiSuccess {Object} meta The albums custom meta data
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *        "album_id": 642,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "private",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:47:02",
 *        "meta": {
 *            "Location": "Mexico"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *        "album_id": 642,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "private",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:47:02",
 *        "meta": {
 *            "Location": "Over There",
 *            "People": "Family"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} tooManyProps The request body contains too many properties
 *   @apiError {Object} albumTitleExists There is already an album with that title
 *   @apiError {Object} invalidAlbumTitle The album title is not valid
 *   @apiError {Object} invalidAlbumDescription The album description is not valid
 *   @apiError {Object} invalidAlbumAccess The album access type is not valid
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "albumIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Invalid Description
 *      HTTP/1.1 400
 *      {
 *          "invalidMetaDescription": "meta description is not valid"
 *      }
 * 
 */
// #endregion
router.put(routes.editAlbum(), api.auth.verifyToken, api.auth.verifyPermission, api.album.editAlbum);

// DELETE HTTP/1.1 200 OK
// #region
/**
 *  @api {delete} /albums/{album_id}/remove Remove an album
 *  @apiName Remove-an-album
 *  @apiGroup Albums
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The albums ID
 * 
 *  @apiSuccess {Integer} album_id The album ID
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *        "album_id": 642
 *     }
 * 
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
  *   @apiErrorExample Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "albumIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Unauthorized
 *      HTTP/1.1 400
 *      {
 *          "unauthorized": "you are not authorized to make the request"
 *      }
 */
// #endregion
router.delete(routes.removeAlbum(), api.auth.verifyToken, api.auth.verifyPermission, api.album.removeAlbum);

// GET HTTP/1.1 200 OK
// #region
/**
 *  @api {get} /albums/:album_id Get a specific album
 *  @apiName Get-specific-album
 *  @apiGroup Albums
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
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 *  @apiParam (URL Parameters) {Integer} album_id The albums ID
 * 
 *  @apiSuccess {Object} album the album matching the specified id
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "public",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57",
 *        "meta": {
 *            "location": "Mexico",
 *            "people": "Friends"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
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
router.get(routes.getAlbum(), api.auth.verifyToken, api.auth.verifyPermission, api.album.getAlbum);


// Put HTTP/1.1 200 OK
// #region
/**
 *  @api {put} /albums/:album_id/meta/edit Add/remove album metadata
 *  @apiName Edit-Album-MetaData
 *  @apiGroup Albums
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
 *  @apiParam (URL Parameters) {Integer} album_id The albums ID
 * 
 *  @apiParamExample {json} Example Request
 *      /albums/7/edit
 *      {
 *          "add": [
 *            { "name": "meta2", "value": "value2" }
 *          ]
 *          "remove": [
 *            "meta1",
 *            "meta2"
 *          ]
 *      }
 * 
 * 
 *  @apiSuccess {Integer} album_id The album ID
 *  @apiSuccess {Integer} user_id The ID of the user who owns the album
 *  @apiSuccess {String} title The title of the album
 *  @apiSuccess {String} description The description of the album
 *  @apiSuccess {String} access The access type of the album
 *  @apiSuccess {String} created_at The date and time the album was created
 *  @apiSuccess {String} updated_at The date and time the album was updated
 *  @apiSuccess {Object} meta The albums custom meta data
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *        "album_id": 4356,
 *        "user_id": 6534,
 *        "title": "Vacation Photos",
 *        "description": "Awesome fun vacation time in the Mexico with all the friends",
 *        "access": "public",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57",
 *        "meta": {
 *            "location": "Mexico",
 *            "people": "Friends"
 *        },
 *        "cover_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg"
 *     }
 * 
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} albumIdDoesNotExist The album_id does not exist in the database
 *   @apiError {Object} serverError Internal server error
 *   @apiError {Object} metaFieldExists A meta field with that name already exists
 *   @apiError {Object} invalidMetaName The meta field name is not valid
 *   @apiError {Object} invalidMetaValue The meta description is not valid
 * 
 *   @apiErrorExample User Does Not Exist
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 */
// #endregion
router.put(routes.editAlbumMeta(), api.auth.verifyToken, api.auth.verifyPermission, api.album.editAlbumMeta)

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
    case errors.albumTitleExists:
      res.status(400).json({ albumTitleExists: errors.albumTitleExists });
      break;
    case errors.invalidAlbumDescription:
      res.status(400).json({ invalidAlbumDescription: errors.invalidAlbumDescription });
      break;
    case errors.invalidAlbumTitle:
      res.status(400).json({ invalidAlbumTitle: errors.invalidAlbumTitle });
      break;
    case errors.invalidAlbumAccess:
      res.status(400).json({ invalidAlbumAccess: errors.invalidAlbumAccess });
      break;
    case errors.missingAlbumTitle:
      res.status(400).json({ missingAlbumTitle: errors.missingAlbumTitle });
      break;
    case errors.albumIdDoesNotExist:
      res.status(404).json({ albumIdDoesNotExist: errors.albumIdDoesNotExist });
      break;
    case errors.invalidMetaName:
      res.status(400).json({ invalidMetaName: errors.invalidMetaName });
      break;
    case errors.invalidMetaValue:
      res.status(400).json({ invalidMetaValue: errors.invalidMetaValue });
      break;
    case errors.metaFieldExists:
      res.status(400).json({ metaFieldExists: errors.metaFieldExists });
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