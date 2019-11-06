const express = require('express');
const router  = express.Router();
const api = require('../controllers/controllers');

router.get('/test', api.test.greeting);

module.exports = router;

/***********************************/
/** Test API Endpoint Documention **/
/***********************************/

// GET HTTP/1.1 200
/**
 *  @api {get} /test Request a list of tests
 *  @apiName Get Test
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

 // POST HTTP/1.1
 /**
 *  @api {post} /test Create a new test
 *  @apiName Create Test
 *  @apiGroup Test
 *  @apiVersion 0.1.0
 */