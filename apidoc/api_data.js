define({ "api": [
  {
    "type": "post",
    "url": "/test",
    "title": "Create a new test",
    "name": "Create_Test",
    "group": "Tests",
    "version": "0.1.0",
    "filename": "api/routes/test.js",
    "groupTitle": "Tests"
  },
  {
    "type": "get",
    "url": "/test/:test_id",
    "title": "Get a specific test",
    "name": "Get_test_by_id",
    "group": "Tests",
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
            "description": "<p>The test was not found.</p>"
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
    "groupTitle": "Tests"
  },
  {
    "type": "get",
    "url": "/test",
    "title": "Get a list of tests",
    "name": "Get_test_list",
    "group": "Tests",
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
          "content": "HTTP/1.1 200 OK\n[{\n  \"test_id\": \"0\",\n  \"name\": \"John Doe\",\n  \"title\": \"John Doe's Test\",\n  \"description\": \"John Doe's test data API endpoint awesome\",\n  \"created_at\": \"2019-11-06 18:42:57\",\n}, {\n  \"test_id\": \"1\",\n  \"name\": \"Jane Smith\",\n  \"title\": \"Jane Smith's Test\",\n  \"description\": \"Jane Smith's test data API endpoint awesome\",\n  \"created_at\": \"2019-11-06 18:42:57\",\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/test.js",
    "groupTitle": "Tests"
  },
  {
    "type": "put",
    "url": "/users/{user_id}/edit",
    "title": "Edit a user",
    "name": "Edit_user",
    "group": "Users",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin"
      },
      {
        "name": "owner"
      }
    ],
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The users ID</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "display_name",
            "description": "<p>The users display name (Optional)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address (Optional)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The users password (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request (all)",
          "content": "/users/6534/edit\n{\n    \"display_name\": \"jdoe25\",\n    \"email\": \"john.doe@mail.com\",\n    \"password\": \"gh43##5A!SG$u77*ke\"\n}",
          "type": "json"
        },
        {
          "title": "Example Request (display name)",
          "content": "/users/6534/edit\n{\n    \"display_name\": \"jdoe25\"\n}",
          "type": "json"
        },
        {
          "title": "Example Request (password)",
          "content": "/users/6534/edit\n{\n    \"password\": \"jgt5^kY3%%@^&*\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT for user auth (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header Example",
          "content": "{\n     \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw\"\n}",
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
            "field": "user_id",
            "description": "<p>The registered users ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"user_id\": 6534,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "noPropsFound",
            "description": "<p>No properties were sent with the request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidProps",
            "description": "<p>The properties on the request body are not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "userIdDoesNotExist",
            "description": "<p>The user_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "displayNameExists",
            "description": "<p>Display name already exists in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "emailExists",
            "description": "<p>Email already exists in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidDisplayName",
            "description": "<p>Display name is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidEmail",
            "description": "<p>Email is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidPassword",
            "description": "<p>Password is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "unauthorized",
            "description": "<p>You are not authorized to make the request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "serverError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Does Not Exists",
          "content": "HTTP/1.1 400\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Already Exists",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"emailExists\": \"email already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "HTTP/1.1 400\n{\n    \"serverError\": \"server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/{user_id}",
    "title": "Get a specific user",
    "name": "Get_specific_user",
    "group": "Users",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The users ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The registered users ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "display_name",
            "description": "<p>The users display name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_admin",
            "description": "<p>Determines if the user is an administrator</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>The date/time the user was created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n    \"user_id\": 6534,\n    \"display_name\": \"jdoe25\",\n    \"email\": \"john.doe@mail.com\",\n    \"is_admin\": \"false\",\n    \"created_at\": \"2019-11-06 18:42:57\",\n    \"updated_at\": \"2019-11-06 18:42:57\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "userIdDoesNotExist",
            "description": "<p>The user_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "serverError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Does Not Exists",
          "content": "HTTP/1.1 400\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "HTTP/1.1 400\n{\n    \"serverError\": \"server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get a list of users",
    "name": "Get_user_list",
    "group": "Users",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>A List of user objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{\n  \"user_id\": \"0\",\n  \"display_name\": \"jdoe25\",\n  \"email\": \"john.doe@mail.com\",\n  \"is_admin\": \"false\",\n  \"created_at\": \"2019-11-06 18:42:57\",\n  \"updated_at\": \"2019-11-12 23:24:24\"\n}, {\n  \"test_id\": \"1\",\n  \"display_name\": \"jsmith25\",\n  \"email\": \"jane.smith@mail.com\",\n  \"is_admin\": \"true\",\n  \"created_at\": \"2019-11-06 18:42:57\",\n  \"updated_at\": \"2019-11-12 23:24:24\"\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/login/{type}",
    "title": "Login as a user",
    "name": "Login_user",
    "group": "Users",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of user login. Options: email, google, facebook, twitter</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address (Required)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The users password (Required when logging in with email)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request (email)",
          "content": "/users/login/email\n{\n    \"email\": \"john.doe@mail.com\",\n    \"password\": \"gh43##5A!SG$u77*ke\"\n}",
          "type": "json"
        },
        {
          "title": "Example Request (google)",
          "content": "/users/login/google\n{\n    \"email\": \"john.doe@mail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "incorrectPassword",
            "description": "<p>Password is not correct</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "emailDoesNotExist",
            "description": "<p>Email does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "tooManyProps",
            "description": "<p>Request body has too many properties</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingEmail",
            "description": "<p>Request body is missing the required email property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingPassword",
            "description": "<p>Request body is missing the required password property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "passwordNotAssociated",
            "description": "<p>A password is not associated with that account</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "serverError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Incorrect Password",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"incorrectPassword\": \"password is not correct\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid Email",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"emailDoesNotExist\": \"email does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Missing Data",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"missingEmail\": \"user object is missing required email property\"\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "HTTP/1.1 400\n{\n    \"serverError\": \"server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/register/{type}",
    "title": "Register a new user",
    "name": "Register_new_user",
    "group": "Users",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Required. The type of user registration. Options: email, google, facebook, twitter</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "display_name",
            "description": "<p>The users display name (Required)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address (Required)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The users password (Required when registering with email)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request (email)",
          "content": "/users/register/email\n{\n    \"display_name\": \"jdoe25\",\n    \"email\": \"john.doe@mail.com\",\n    \"password\": \"gh43##5A!SG$u77*ke\"\n}",
          "type": "json"
        },
        {
          "title": "Example Request (google)",
          "content": "/users/register/google\n{\n    \"display_name\": \"jdoe25\",\n    \"email\": \"john.doe@mail.com\"\n}",
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
            "field": "user_id",
            "description": "<p>The registered users ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT for user auth</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"user_id\": 0,\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "displayNameExists",
            "description": "<p>Display name already exists in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "emailExists",
            "description": "<p>Email already exists in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidDisplayName",
            "description": "<p>Display name is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidEmail",
            "description": "<p>Email is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidPassword",
            "description": "<p>Password is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "tooManyProps",
            "description": "<p>Request body has too many properties</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingDisplayName",
            "description": "<p>Request body is missing the required display_name property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingEmail",
            "description": "<p>Request body is missing the required email property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingPassword",
            "description": "<p>Request body is missing the required password property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "serverError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Already Exists",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"emailExists\": \"email already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid Data",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"invalidDisplayName\": \"display name is not valid\"\n}",
          "type": "json"
        },
        {
          "title": "Missing Data",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"missingEmail\": \"user object is missing required email property\"\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "HTTP/1.1 400\n{\n    \"serverError\": \"server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/{user_id}/remove",
    "title": "Remove a user",
    "name": "Remove_user",
    "group": "Users",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin"
      },
      {
        "name": "owner"
      }
    ],
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The users ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/users/6534/remove",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT for user auth (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header Example",
          "content": "{\n     \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw\"\n}",
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
            "field": "user_id",
            "description": "<p>The registered users ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"user_id\": 6534,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "userIdDoesNotExist",
            "description": "<p>The user_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "unauthorized",
            "description": "<p>You are not authorized to make the request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "serverError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Does Not Exists",
          "content": "HTTP/1.1 400\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "HTTP/1.1 400\n{\n    \"serverError\": \"server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/user.js",
    "groupTitle": "Users"
  }
] });
