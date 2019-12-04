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
 *  @api {get} /users Get a list of users
 *  @apiName Get-user-list
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiSuccess {Object[]} users A List of user objects
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 200 OK
 *     [{
 *       "user_id": "0",
 *       "display_name": "jdoe25",
 *       "email": "john.doe@mail.com",
 *       "is_admin": "false",
 *       "created_at": "2019-11-06 18:42:57",
 *       "updated_at": "2019-11-12 23:24:24"
 *     }, {
 *       "test_id": "1",
 *       "display_name": "jsmith25",
 *       "email": "jane.smith@mail.com",
 *       "is_admin": "true",
 *       "created_at": "2019-11-06 18:42:57",
 *       "updated_at": "2019-11-12 23:24:24"
 *     }]
 */
// #endregion
router.get(routes.getUsers(), api.user.getUserList, sentryError);

// GET HTTP/1.1 200 OK
// #region
/**
 *  @api {post} /users/{user_id} Get a single user
 *  @apiName Get-specific-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 * 
 *  @apiSuccess {Integer} user_id The registered users ID
 *  @apiSuccess {String} display_name The users display name
 *  @apiSuccess {String} email The users email address
 *  @apiSuccess {Boolean} is_admin Determines if the user is an administrator
 *  @apiSuccess {String} created_at The date/time the user was created
 * 
 *  @apiSuccessExample {json} Example Response
 *      HTTP/1.1 201 CREATED
 *      {
 *          "user_id": 6534,
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com",
 *          "is_admin": "false",
 *          "created_at": "2019-11-06 18:42:57",
 *          "updated_at": "2019-11-06 18:42:57"
 *      }
 * 
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 400
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 400
 *      {
 *          "serverError": "server error"
 *      }
 *  
 */
// #endregion
router.get(routes.getUserById(), api.user.getUserById, sentryError);

// PUT HTTP/1.1 200 OK
// #region
/**
 *  @api {put} /users/{user_id}/edit Edit a user
 *  @apiName Edit-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin
 *  @apiPermission owner
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth (Required)
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParam (Request Body) {String} [display_name] The users display name
 *  @apiParam (Request Body) {String} [email] The users email address
 *  @apiParam (Request Body) {String} [password] The users password
 * 
 *  @apiParamExample {json} Example Request (all)
 *      /users/6534/edit
 *      {
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com",
 *          "password": "gh43##5A!SG$u77*ke"
 *      }
 * 
 *  @apiParamExample {json} Example Request (display name)
 *      /users/6534/edit
 *      {
 *          "display_name": "jdoe25"
 *      }
 * 
 *  @apiParamExample {json} Example Request (password)
 *      /users/6534/edit
 *      {
 *          "password": "jgt5^kY3%%@^&*"
 *      }
 * 
 *  @apiSuccess {Integer} user_id The registered users ID
 *  @apiSuccess {String} display_name The users display name
 *  @apiSuccess {String} email The users email address
 *  @apiSuccess {String} created_at The date and time the user was created
 *  @apiSuccess {String} updated_at The date and time the user was updated
 * 
 *  @apiSuccessExample {json} Example Response
 *      HTTP/1.1 200 OK
 *      {
 *        "user_id": 6534,
 *        "display_name": "jdoe25",
 *        "email": "john.doe@mail.com",
 *        "is_admin": "false",
 *        "created_at": "2019-11-17 03:41:51",
 *        "updated_at": "2019-11-17 03:41:51"
 *     }
 * 
 *   @apiError {Object} noPropsFound No properties were sent with the request
 *   @apiError {Object} invalidProps The properties on the request body are not valid
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} displayNameExists Display name already exists in the database
 *   @apiError {Object} emailExists Email already exists in the database
 *   @apiError {Object} invalidDisplayName Display name is invalid
 *   @apiError {Object} invalidEmail Email is invalid
 *   @apiError {Object} invalidPassword Password is invalid
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 400
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 *   @apiErrorExample Already Exists
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "emailExists": "email already exists"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 400
 *      {
 *          "serverError": "server error"
 *      }
 * 
 */
// #endregion
router.put(routes.editUser(), api.auth.verifyToken, api.auth.verifyPermission, api.user.editUser, sentryError);

// DELETE HTTP/1.1 200 OK
// #region
/**
 *  @api {delete} /users/{user_id}/remove Remove a user
 *  @apiName Remove-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission admin
 *  @apiPermission owner
 * 
 *  @apiParam (URL Parameters) {Integer} user_id The users ID
 * 
 *  @apiHeader (Headers) {String} Authorization JWT for user auth (Required)
 * 
 *  @apiHeaderExample {json} Header Example
 *     {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *  @apiParamExample {json} Example Request
 *      /users/6534/remove
 *      
 *  @apiSuccess {Integer} user_id The registered users ID
 * 
 *  @apiSuccessExample {json} Example Response
 *      HTTP/1.1 200 OK
 *      {
 *          "user_id": 6534,
 *      }
 * 
 *   @apiError {Object} userIdDoesNotExist The user_id does not exist in the database
 *   @apiError {Object} unauthorized You are not authorized to make the request
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Does Not Exists
 *      HTTP/1.1 400
 *      {
 *          "userIdDoesNotExist": "user id does not exist"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 400
 *      {
 *          "serverError": "server error"
 *      }
 */
// #endregion
router.delete(routes.removeUser(), api.auth.verifyToken, api.auth.verifyPermission, api.user.removeUser, sentryError);

// POST HTTP/1.1 201 CREATED
// #region
/**
 *  @api {post} /users/register/{type} Register a new user
 *  @apiName Register-new-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiParam (URL Parameters) {String} type The type of user registration. Options: email, google, facebook, twitter
 * 
 *  @apiParam (Request Body) {String} display_name The users display name (Required)
 *  @apiParam (Request Body) {String} email The users email address (Required)
 *  @apiParam (Request Body) {String} password The users password (Required when registering with email)
 * 
 *  @apiParamExample {json} Example Request (email)
 *      /users/register/email
 *      {
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com",
 *          "password": "gh43##5A!SG$u77*ke"
 *      }
 * 
 *  @apiParamExample {json} Example Request (google)
 *      /users/register/google
 *      {
 *          "display_name": "jdoe25",
 *          "email": "john.doe@mail.com"
 *      }
 * 
 *  @apiSuccess {Integer} user_id The registered users ID
 *  @apiSuccess {String} token JWT for user auth
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "user_id": 6534,
 *        "display_name": "jdoe25",
 *        "email": "john.doe@mail.com",
 *        "is_admin": "false",
 *        "created_at": "2019-11-17 03:41:51",
 *        "updated_at": "2019-11-17 03:41:51",
 *        "token": "eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *   @apiError {Object} displayNameExists Display name already exists in the database
 *   @apiError {Object} emailExists Email already exists in the database
 *   @apiError {Object} invalidDisplayName Display name is invalid
 *   @apiError {Object} invalidEmail Email is invalid
 *   @apiError {Object} invalidPassword Password is invalid
 *   @apiError {Object} tooManyProps Request body has too many properties
 *   @apiError {Object} missingDisplayName Request body is missing the required display_name property
 *   @apiError {Object} missingEmail Request body is missing the required email property
 *   @apiError {Object} missingPassword Request body is missing the required password property
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Already Exists
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "emailExists": "email already exists"
 *      }
 * 
 *   @apiErrorExample Invalid Data
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "invalidDisplayName": "display name is not valid"
 *      }
 * 
 *   @apiErrorExample Missing Data
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "missingEmail": "user object is missing required email property"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 400
 *      {
 *          "serverError": "server error"
 *      }
 */
// #endregion
router.post(routes.registerUser(), api.user.registerUser, sentryError);

// POST HTTP/1.1 200 OK
// #region
/**
 *  @api {post} /users/login/{type} Login as a user
 *  @apiName Login-user
 *  @apiGroup Users
 *  @apiVersion 0.1.0
 * 
 *  @apiPermission user
 * 
 *  @apiParam (URL Parameters) {String} type The type of user login. Options: email, google, facebook, twitter
 * 
 *  @apiParam (Request Body) {String} email The users email address (Required)
 *  @apiParam (Request Body) {String} password The users password (Required when logging in with email)
 * 
 *  @apiParamExample {json} Example Request (email)
 *      /users/login/email
 *      {
 *          "email": "john.doe@mail.com",
 *          "password": "gh43##5A!SG$u77*ke"
 *      }
 * 
 *  @apiParamExample {json} Example Request (google)
 *      /users/login/google
 *      {
 *          "email": "john.doe@mail.com"
 *      }
 * 
 *  @apiSuccess {Integer} user_id The registered users ID
 *  @apiSuccess {String} token JWT for user auth
 * 
 *  @apiSuccessExample {json} Example Response
 *     HTTP/1.1 201 CREATED
 *     {
 *        "user_id": 6534,
 *        "display_name": "jdoe25",
 *        "email": "john.doe@mail.com",
 *        "is_admin": false,
 *        "created_at": "2019-11-17 03:41:51",
 *        "updated_at": "2019-11-17 03:41:51",
 *        "token": "eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw"
 *     }
 * 
 *   @apiError {Object} incorrectPassword Password is not correct
 *   @apiError {Object} emailDoesNotExist Email does not exist in the database
 *   @apiError {Object} tooManyProps Request body has too many properties
 *   @apiError {Object} missingEmail Request body is missing the required email property
 *   @apiError {Object} missingPassword Request body is missing the required password property
 *   @apiError {Object} passwordNotAssociated A password is not associated with that account
 *   @apiError {Object} serverError Internal server error
 * 
 *   @apiErrorExample Incorrect Password
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "incorrectPassword": "password is not correct"
 *      }
 * 
 *   @apiErrorExample Invalid Email
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "emailDoesNotExist": "email does not exist"
 *      }
 * 
 *   @apiErrorExample Missing Data
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "missingEmail": "user object is missing required email property"
 *      }
 * 
 *   @apiErrorExample Server Error
 *      HTTP/1.1 400
 *      {
 *          "serverError": "server error"
 *      }
 * 
 */
// #endregion
router.post(routes.loginUser(), api.user.loginUser, sentryError);

// Error handler
router.use((err, req, res, next) => {

  switch (err.message) {
    case errors.unauthorized:
      res.status(401).json({ unauthorized: errors.unauthorized });
        break;
    case errors.userIdDoesNotExist:
      res.status(404).json({ userIdDoesNotExist: errors.userIdDoesNotExist });
        break;
    case errors.displayNameExists:
      res.status(400).json({ displayNameExists: errors.displayNameExists });
        break;
    case errors.emailExists:
      res.status(400).json({ emailExists: errors.emailExists });
      break;
    case errors.invalidDisplayName:
      res.status(400).json({ invalidDisplayName: errors.invalidDisplayName });
      break;
    case errors.invalidEmail:
      res.status(400).json({ invalidEmail: errors.invalidEmail });
        break;
    case errors.invalidPassword:
      res.status(400).json({ invalidPassword: errors.invalidPassword });
        break;
    case errors.tooManyProps:
      res.status(400).json({ tooManyProps: errors.tooManyProps });
        break;
    case errors.missingDisplayName:
      res.status(400).json({ missingDisplayName: errors.missingDisplayName });
        break;
    case errors.missingEmail:
      res.status(400).json({ missingEmail: errors.missingEmail });
        break;
    case errors.missingPassword:
      res.status(400).json({ missingPassword: errors.missingPassword });
        break;
    case errors.incorrectPassword:
      res.status(400).json({ incorrectPassword: errors.incorrectPassword });
        break;
    case errors.emailDoesNotExist:
      res.status(404).json({ emailDoesNotExist: errors.emailDoesNotExist });
        break;
    case errors.passwordNotAssociated:
      res.status(400).json({ passwordNotAssociated: errors.passwordNotAssociated });
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