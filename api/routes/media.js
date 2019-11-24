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
 *        "created_at": "2019-11-06 18:42:57",
 *        "updated_at": "2019-11-06 18:42:57"
 *     }]
 * 
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} albumIdDoesNotExist The album ID does not exist in the database
 *   @apiError {Object} mediaTitleExists The media title already exists
 *   @apiError {Object} metaNameExists A meta field with that name already exists
 *   @apiError {Object} invalidMediaTitle The media title is not valid
 *   @apiError {Object} invalidMediaDescription The media description is not valid
 *   @apiError {Object} invalidKeywords The keywords are not valid
 *   @apiError {Object} invalidMetaName The meta field name is not valid
 *   @apiError {Object} invalidMetaValue The meta field value is not valid
 *   @apiError {Object} missingAlbums Request body is missing the required albums property
 *   @apiError {Object} missingMedia Request body is missing the required media property
 *   @apiError {Object} missingTitle Request body is missing the required title property
 *   @apiError {Object} missingName Request body is missing the required name property
 *   @apiError {Object} missingValue Request body is missing the required value property
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 */
// #endregion
router.post(routes.addAlbumsMedia(), api.media.addAlbumsMedia, sentryError);

// Error handler.
router.use((err, req, res, next) => {

  switch (err.message) {

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