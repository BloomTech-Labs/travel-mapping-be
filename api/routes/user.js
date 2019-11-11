const express     = require('express');
const router      = express.Router();
const controllers = require('../controllers/controllers');
const middleware  = require('../middleware/middleware');
const Sentry      = require('@sentry/node');
const sentryError = Sentry.Handlers.errorHandler(); // Sentry error handler.
const api         = { ...controllers, ...middleware };

// POST HTTP/1.1 201 CREATED
// #region
/**
 *  @api {post} /users/register/?type={type} Register a new user
 *  @apiName Register-new-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiParam (Query Parameters) {String} type Required. The type of user registration. Options: email, google
 * 
 *  @apiParam (Request Body) {String} display_name The users display name (Required)
 *  @apiParam (Request Body) {String} email The users email address (Required)
 *  @apiParam (Request Body) {String} password The users password (Required when registering with email)
 * 
 *  @apiParamExample {json} Example Request (email)
 *      /users/register/?type=email
 *      {
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com",
 *          "password": "gh43##5A!SG$u77*ke"
 *      }
 * 
 *  @apiParamExample {json} Example Request (google)
 *      /users/register/?type=google
 *      {
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com"
 *      }
 * 
 *  @apiSuccess {Integer} user_id The registered users ID
 *  @apiSuccess {String} token JWT for auth. Used with email registration.
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "user_id": 0,
 *        "token": "eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *   @apiError {Object} DisplayNameAlreadyExists Display name already exists in the database
 *   @apiError {Object} EmailAlreadyExists Email already exists in the database
 *   @apiError {Object} InvalidDisplayName Display name is invalid
 *   @apiError {Object} InvalidEmail Email is invalid
 *   @apiError {Object} InvalidPassword Password is invalid
 *   @apiError {Object} TooManyProps Request body has too many properties
 *   @apiError {Object} MissingDisplayName Request body is missing the required display_name property
 *   @apiError {Object} MissingEmail Request body is missing the required email property
 *   @apiError {Object} MissingPassword Request body is missing the required password property
 * 
 *   @apiErrorExample Already Exists
 *      HTTP/1.1 400
 *      {
 *          "error": "email already exists"
 *      }
 * 
 *   @apiErrorExample Invalid Data
 *      HTTP/1.1 400
 *      {
 *          "error": "display name is not valid"
 *      }
 * 
 *   @apiErrorExample Missing Data
 *      HTTP/1.1 400
 *      {
 *          "error": "user object is missing required property: email"
 *      }
 */
// #endregion
router.post('/users/register', api.user.registerUser, sentryError);

// GET HTTP/1.1 200 OK
// #region
/**
 *  @api {get} /users Get a list of users
 *  @apiName Get-user-list
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiSuccess {Object[]} users A List of user objects.
 * 
 *  @apiSuccessExample {json} Example Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "user_id": "0",
 *       "display_name": "jdoe25",
 *       "email": "john.doe@mail.com",
 *       "is_admin": "false",
 *       "created_at": "2019-11-06 18:42:57",
 *     }, {
 *       "test_id": "1",
 *       "display_name": "jsmith25",
 *       "email": "jane.smith@mail.com",
 *       "is_admin": "true",
 *       "created_at": "2019-11-06 18:42:57",
 *     }]
 */
// #endregion
router.get('/users', (req, res, next) => {
  res.json([{ test: 'test' }]);
}, sentryError);

// Error handler
router.use((err, req, res, next) => {

  if (err.message === 'server error') res.status(500).json({ error: err.message });
  else {
    res.status(400).json({ error: err.message });
  }
  console.log(err);
  res.status(500).json({ error: err.message });

});

module.exports = router;