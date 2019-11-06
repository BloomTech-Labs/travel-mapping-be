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
    "url": "/test",
    "title": "Request a list of tests",
    "name": "Get_Test",
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
          "content": "HTTP/1.1 200 OK\n [{\n   \"test_id\": \"0\",\n   \"name\": \"John Doe\",\n   \"title\": \"John Doe's Test\",\n   \"description\": \"John Doe's test data API endpoint awesome\",\n   \"created_at\": \"123421651243\",\n }, {\n   \"test_id\": \"1\",\n   \"name\": \"Jane Smith\",\n   \"title\": \"Jane Smith's Test\",\n   \"description\": \"Jane Smith's test data API endpoint awesome\",\n   \"created_at\": \"123421651243\",\n }]",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/test.js",
    "groupTitle": "Test"
  }
] });
