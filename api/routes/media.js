const express     = require('express');
const router      = express.Router();
const errors      = require('../../modules/modules').errors;
const routes      = require('../../modules/modules').routes;
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const Sentry      = require('@sentry/node');
const sentryError = Sentry.Handlers.errorHandler();
const api         = { ...controllers, ...middleware };

// HTTP/1.1 201 CREATED
// #region
/**
 * 
 *  @api {post} /users/{user_id}/media/add Add media to albums
 *  @apiName Add-media
 *  @apiGroup Media
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
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
 *  @apiparam (Request Body) {Integer[]} albums A list of album IDs
 *  @apiParam (Request Body) {Object[]} media A list of media objects
 *  @apiParam (Request Body) {String{2-120}} media[title] A title for the media
 *  @apiparam (Request Body) {Text{0-300}} [media[caption]] A caption for the media
 *  @apiParam (Request Body) {String[]{2-120}} [media[keywords]] A list of keywords describing the media
 *  @apiParam (Request Body) {Object[]} [media[meta]] A list of meta data objects
 *  @apiParam (Request Body) {String{2-120}} meta[name] The name of the meta field
 *  @apiParam (Request Body) {String{2-300}} meta[value] The value of the meta field
 * 
 *  @apiParamExample {json} Example Request
 *      /users/6542/media/add
 *      {
 *          "albums": [0, 1, 2, 3],
 *          "media": [{
 *             "title": "A Photo Title",
 *             "caption": "A short caption for a photo",
 *             "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *             "meta": [{
 *                "name": "Location",
 *                "value": "Mexico"
 *             }]
 *          }, {
 *             "title": "A Photo Another Title",
 *             "caption": "Another short caption for a photo",
 *             "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *             "meta": [{
 *                "name": "People",
 *                "value": "Family"
 *             }, {
 *                "name": "Meta Name",
 *                "value": "Meta Value"
 *             }]
 *          }]
 *      }
 * 
 *  @apiSuccess {Object[]} media A list of uploaded media
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     [{
 *        "media_id": 0,
 *        "user_id": 6542,
 *        "albums": [0, 1, 2, 3],
 *        "title": "A Photo Title",
 *        "caption": "A short caption for a photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": {
 *            "Location": "Mexico",
 *        }
 *        "media_url": "http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg",
 *        "thumbnail_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *      }, {
 *        "media_id": 1,
 *        "user_id": 6542,
 *        "albums": [0, 1, 2, 3],
 *        "title": "A Photo Another Title",
 *        "caption": "A short caption for another photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": {
 *            "People": "Family",
 *            "Meta Name": "Meta Value"
 *        }
 *        "media_url": "http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg",
 *        "thumbnail_url: "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *     }]
 * 
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} albumIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} mediaTitleExists The media title already exists
 *   @apiError {Object} repeatedMetaName The meta object already contains the meta name
 *   @apiError {Object} invalidMediaTitle The media title is not valid
 *   @apiError {Object} invalidMediaDescription The media description is not valid
 *   @apiError {Object} invalidKeywords The keywords are not valid
 *   @apiError {Object} invalidMetaName The meta field name is not valid
 *   @apiError {Object} invalidMetaValue The meta field value is not valid
 *   @apiError {Object} missingAlbums Request body is missing the required albums property
 *   @apiError {Object} missingMedia Request body is missing the required media property
 *   @apiError {Object} missingTitle Request body is missing the required title property
 *   @apiError {Object} missingMetaName Request body is missing the required name property
 *   @apiError {Object} missingMetaValue Request body is missing the required value property
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Missing Property
 *      HTTP/1.1 400
 *      {
 *          "missingAlbums": "request is missing required albums property"
 *      }
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 */
// #endregion
router.post(routes.addAlbumsMedia(), api.auth.verifyToken, api.auth.verifyPermission, api.media.addAlbumsMedia, sentryError);

// HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /albums/{album_id}/media Get an albums media
 *  @apiName Get-albums-media
 *  @apiGroup Media
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
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
 *  @apiSuccess {Object[]} media A list of the albums media
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{
 *        "media_id": 0,
 *        "user_id": 6542,
 *        "albums": [0, 1, 2, 3],
 *        "title": "A Photo Title",
 *        "caption": "A short caption for a photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": {
 *            "Location": "Mexico",
 *        }
 *        "media_url": "http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg",
 *        "thumbnail_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *      }, {
 *        "media_id": 1,
 *        "user_id": 6542,
 *        "albums": [0, 1, 2, 3],
 *        "title": "A Photo Another Title",
 *        "caption": "A short caption for another photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": {
 *            "People": "Family",
 *            "Meta Name": "Meta Value"
 *        }
 *        "media_url": "http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg",
 *        "thumbnail_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *     }]
 * 
 *   @apiError {Object} albumIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 404
 *      {
 *          "albumIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 500
 *      {
 *          "serverError": "server error"
 *      }
 */
// #endregion
router.get(routes.getAlbumsMedia(), api.auth.verifyToken, api.auth.verifyPermission, api.media.getAlbumsMedia, sentryError);

// HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /users/{user_id}/media Get a users media
 *  @apiName Get-users-media
 *  @apiGroup Media
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
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{
 *        "media_id": 0,
 *        "user_id": 6542,
 *        "albums": [0, 1, 2, 3],
 *        "title": "A Photo Title",
 *        "caption": "A short caption for a photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": {
 *            "Location": "Mexico",
 *        }
 *        "media_url": "http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg",
 *        "thumbnail_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *      }, {
 *        "media_id": 1,
 *        "user_id": 6542,
 *        "albums": [0, 1, 2, 3],
 *        "title": "A Photo Another Title",
 *        "caption": "A short caption for another photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": {
 *            "People": "Family",
 *            "Meta Name": "Meta Value"
 *        }
 *        "media_url": "http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg",
 *        "thumbnail_url": "https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg",
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *     }]
 * 
 *   @apiError {Object} userIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 500
 *      {
 *          "serverError": "server error"
 *      }
 * 
 */
// #endregion
router.get(routes.getUsersMedia(), api.auth.verifyToken, api.auth.verifyPermission, api.media.getUsersMedia, sentryError);

// HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {put} /media/data/:media_id/edit Update a piece of media
 *  @apiName edit-media
 *  @apiGroup Media
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} media_id The media ID
 *  @apiParam (URL Parameters) {Integer} album_id The album ID
 * 
 *  @apiParam (Request Body) {String} title A new title for the media CURRENTLY DISABLED. WILL REQUIRE REDESIGN OF MEDIA SCHEMA TO WORK PROPERLY
 *  @apiparam (Request Body) {String} caption A new caption for the media
 *  @apiParam (Request Body) {String[]} [keywords] A new list of keywords describing the media. keywords undefined or falsy indicates no changes
 *  @apiParam (Request Body) {Object[]} [meta] A new list of meta data objects. meta undefined or falsy indicates no changes
 *  @apiParam (Request Body) {String} meta[name] The name of the meta field
 *  @apiParam (Request Body) {String} meta[value] The value of the meta field
 * 
 *  @apiParamExample {json} Example Request
 *      /albums/6542/media/3535/edit
 *      {
 *        "title": "A Photo Title",
 *        "caption": "A short caption for a photo",
 *        "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *        "meta": [{
 *          "name": "Location",
 *          "value": "Mexico"
 *        }]
 *      }
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     {
 *       "edited_id": 34532
 *     }
 * 
 *   @apiError {Object} userIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 500
 *      {
 *          "serverError": "server error"
 *      }
 * 
 */
// #endregion
router.put(routes.editMedia(), api.auth.verifyToken, api.auth.verifyPermission, api.media.editMedia, sentryError);

// HTTP/1.1 204 NO CONTENT
// #region
/**
 * 
 *  @api {delete} /albums/:album_id/media/:media_id/remove Remove a piece of media from an album
 *  @apiName remove-media
 *  @apiGroup Media
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} album_id The album ID
 *  @apiParam (URL Parameters) {Integer} media_id The media ID
 * 
 *  @apiParamExample {json} Example Request
 *      /albums/6542/media/23545/remove
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 204 NO CONTENT
 * 
 *   @apiError {Object} userIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 500
 *      {
 *          "serverError": "server error"
 *      }
 * 
 */
// #endregion
router.delete(routes.deleteMedia(), api.auth.verifyToken, api.auth.verifyPermission, api.media.deleteMedia, sentryError);


// HTTP/1.1 200 OK
// #region
/**
 * 
 *  @api {get} /media/data/:media_id/view get specifc media info
 *  @apiName get-individual-media
 *  @apiGroup Media
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin owner collaborator
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (URL Parameters) {Integer} media_id The media ID
 * 
 *  @apiParamExample {json} Example Request
 *      /media/data/23545/view
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 * 
 *   {
 *     "media_id": 99,
 *     "user_id": 222,
 *     "title": "photo",
 *     "caption": "a caption2",
 *     "type": "photo",
 *     "created_at": "2020-01-09 09:19:45",
 *     "updated_at": "2020-01-12 05:02:39",
 *     "keywords": ["keyword-one", "keyword-two", "keyword-three"],
 *     "meta": {
 *       "People": "Family",
 *       "Meta Name": "Meta Value"
 *     }
 *     "media_url": "http://localhost:4000/users/222/media/original/photo",
 *     "thumbnail_url": "http://localhost:4000/users/222/media/thumbnail/photo"
 *   }
 * 
 *   @apiError {Object} userIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 404
 *      {
 *          "userIdDoesNotExist": "album id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 500
 *      {
 *          "serverError": "server error"
 *      }
 * 
 */
// #endregion
router.get(routes.getMediaData(), api.auth.verifyToken, api.auth.verifyPermission, api.media.getMediaData, sentryError);

// Route for serving users media from Cloudinary.
router.get(routes.viewUsersMedia(), /* api.auth.verifyToken, api.auth.verifyPermission, */ api.media.viewUsersMedia, sentryError);

// Route for serving all other media from Cloudinary.
router.get(routes.viewMedia(), api.media.viewMedia, sentryError);

// Error handler.
router.use((err, req, res, next) => {

  switch (err.message) {
    case errors.albumIdDoesNotExist:
      res.status(404).json({ albumIdDoesNotExist: errors.albumIdDoesNotExist });
        break;
    case errors.missingAlbums:
      res.status(400).json({ missingAlbums: errors.missingAlbums });
        break;
    case errors.missingMedia:
        res.status(400).json({ missingMedia: errors.missingMedia });
          break;
    case errors.missingMediaTitle:
        res.status(400).json({ missingMediaTitle: errors.missingMediaTitle });
          break;
    case errors.invalidMediaTitle:
      res.status(400).json({ invalidMediaTitle: errors.invalidMediaTitle });
        break;
    case errors.invalidMediaCaption:
      res.status(400).json({ invalidMediaCaption: errors.invalidMediaCaption });
        break;
    case errors.invalidKeywords:
      res.status(400).json({ invalidKeywords: errors.invalidKeywords });
        break;
    case errors.invalidMetaName:
      res.status(400).json({ invalidMetaName: errors.invalidMetaName });
        break;
    case errors.invalidMetaValue:
      res.status(400).json({ invalidMetaValue: errors.invalidMetaValue });
        break;
    case errors.missingMetaName:
      res.status(400).json({ missingMetaName: errors.missingMetaName });
        break;
    case errors.missingMetaValue:
      res.status(400).json({ missingMetaValue: errors.missingMetaValue });
        break;
    case errors.noPropsFound:
      res.status(400).json({ noPropsFound: errors.noPropsFound });
        break;
    case errors.invalidProps:
      res.status(400).json({ invalidProps: errors.invalidProps });
        break;
    case errors.userIdDoesNotExist:
      res.status(404).json({ userIdDoesNotExist: errors.userIdDoesNotExist });
        break;
    case errors.mediaTitleExists:
      res.status(400).json({ mediaTitleExists: errors.mediaTitleExists });
        break;
    case errors.metaFieldExists:
      res.status(400).json({ metaFieldExists: errors.metaFieldExists });
        break;
    case errors.repeatedMetaName:
      res.status(400).json({ repeatedMetaName: errors.repeatedMetaName });
        break;
    case errors.unauthorized:
      res.status(401).json({ unauthorized: errors.unauthorized });
        break;
    case errors.mediaAlbumDoesNotExist:
      res.status(404).json({ mediaAlbumDoesNotExist: errors.mediaAlbumDoesNotExist });
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