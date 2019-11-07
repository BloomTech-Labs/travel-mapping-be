define({ "api": [
  {
    "type": "post",
    "url": "/test",
    "title": "Create a new test",
    "name": "Create_Test",
    "group": "Test",
    "version": "0.1.0",
    "filename": "api/routes/test.js",
    "groupTitle": "Test"
  },
  {
    "type": "get",
    "url": "/test/:test_id",
    "title": "Get a specific test",
    "name": "Get_test_by_id",
    "group": "Test",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "test_id",
            "description": "<p>Unique test ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request:",
          "content": "https://piktorlog.herokuapp.com/test/0",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "test_id",
            "description": "<p>Unique test ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>A test name.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>A test title.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>A test description.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created_at",
            "description": "<p>The date and time the record was created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"test_id\": \"0\",\n  \"name\": \"John Doe\",\n  \"title\": \"John Doe's Test\",\n  \"description\": \"John Doe's test data API endpoint awesome\",\n  \"created_at\": \"2019-11-06 18:42:57\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TestNotFound",
            "description": "<p>The id of the Test was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Error:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"the test with the test_id of 0 was not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/test.js",
    "groupTitle": "Test"
  },
  {
    "type": "get",
    "url": "/test",
    "title": "Get a list of tests",
    "name": "Get_test_list",
    "group": "Test",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tests",
            "description": "<p>A List of test objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response:",
          "content": "HTTP/1.1 200 OK\n [{\n   \"test_id\": \"0\",\n   \"name\": \"John Doe\",\n   \"title\": \"John Doe's Test\",\n   \"description\": \"John Doe's test data API endpoint awesome\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n }, {\n   \"test_id\": \"1\",\n   \"name\": \"Jane Smith\",\n   \"title\": \"Jane Smith's Test\",\n   \"description\": \"Jane Smith's test data API endpoint awesome\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n }]",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/test.js",
    "groupTitle": "Test"
  }
] });
