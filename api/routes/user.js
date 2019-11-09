const express     = require('express');
const router      = express.Router();
const api         = require('../middleware/middleware');
const Sentry      = require('@sentry/node');
const sentryError = Sentry.Handlers.errorHandler(); // Sentry error handler.

// POST HTTP/1.1 201 CREATED
// #region
/**
 *  @api {post} /users/register Register a new user
 *  @apiName Register-new-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiParam (Request Body) {String} display_name The users display name
 *  @apiParam (Request Body) {String} email The users email address
 * 
 *  @apiParamExample {json} Example Request
 *      {
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com"
 *      }
 * 
 *  @apiSuccess {Integer} user_id The registered users ID
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "user_id": 0
 *     }
 * 
 *   @apiError {Object} EmailAlreadyExists The email already exists in the database
 *   @apiError {Object} InvalidDisplayName The display name is invalid
 *   @apiError {Object} InvalidEmail The email is invalid
 * 
 *   @apiErrorExample EmailAlreadyExists
 *      HTTP/1.1 400
 *      {
 *          "error": "email already exists"
 *      }
 * 
 *   @apiErrorExample InvalidDisplayName
 *      HTTP/1.1 400
 *      {
 *          "error": "display name is not valid"
 *      }
 * 
 *   @apiErrorExample InvalidEmail
 *      HTTP/1.1 400
 *      {
 *          "error": "email is not valid"
 *      }
 */
// #endregion
router.post('/users/register', (req, res, next) => {
  res.status(201);
  res.send('hello world');
}, sentryError);


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

module.exports = router;