const express = require('express');
const router  = express.Router();
const api     = require('../controllers/controllers');

// GET HTTP/1.1 Get a list of tests
// #region
/**
 *  @api {get} /test Get a list of tests
 *  @apiName Get-test-list
 *  @apiGroup Test
 *  @apiVersion 0.1.0
 * 
 *  @apiSuccess {Object[]} tests A List of test objects.
 * 
 *  @apiSuccessExample {json} Example Response:
 *     HTTP/1.1 200 OK
 *      [{
 *        "test_id": "0",
 *        "name": "John Doe",
 *        "title": "John Doe's Test",
 *        "description": "John Doe's test data API endpoint awesome",
 *        "created_at": "2019-11-06 18:42:57",
 *      }, {
 *        "test_id": "1",
 *        "name": "Jane Smith",
 *        "title": "Jane Smith's Test",
 *        "description": "Jane Smith's test data API endpoint awesome",
 *        "created_at": "2019-11-06 18:42:57",
 *      }]
 */
// #endregion
router.get('/test', api.test.greeting);

// GET HTTP/1.1 Get a specific test
// #region 
/**
 *  @api {get} /test/:test_id Get a specific test
 *  @apiName Get-test-by-id
 *  @apiGroup Test
 *  @apiVersion 0.1.0
 * 
 *  @apiParam (URL Parameters) {Integer} test_id Unique test ID.
 * 
 *  @apiParamExample {json} Example Request:
 *      https://piktorlog.herokuapp.com/test/0
 * 
 *  @apiSuccess {Integer} test_id Unique test ID.
 *  @apiSuccess {string}  name A test name.
 *  @apiSuccess {string}  title A test title.
 *  @apiSuccess {string}  description A test description.
 *  @apiSuccess {string}  created_at The date and time the record was created.
 * 
 *  @apiSuccessExample {json} Example Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "test_id": "0",
 *       "name": "John Doe",
 *       "title": "John Doe's Test",
 *       "description": "John Doe's test data API endpoint awesome",
 *       "created_at": "2019-11-06 18:42:57",
 *     }
 * 
 *  @apiError TestNotFound The id of the Test was not found.
 * 
 *  @apiErrorExample Example Error:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "the test with the test_id of 0 was not found"
 *     }
 */
// #endregion
 router.get('/test/:test_id', api.test.greeting);

 // POST HTTP/1.1
 // #region
 /**
 *  @api {post} /test Create a new test
 *  @apiName Create Test
 *  @apiGroup Test
 *  @apiVersion 0.1.0
 */
// #endregion

module.exports = router;