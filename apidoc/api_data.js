define({ "api": [
  {
    "type": "post",
    "url": "/albums/{album_id}/meta/add",
    "title": "Add album meta data",
    "name": "Add_meta_data",
    "group": "Albums",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin owner collaborator"
      }
    ],
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "album_id",
            "description": "<p>The albums ID</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": false,
            "field": "metaData",
            "description": "<p>A list of meta data objects</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "size": "1-120",
            "optional": false,
            "field": "metaData[name]",
            "description": "<p>The name of the meta field</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "size": "1-300",
            "optional": false,
            "field": "metaData[value]",
            "description": "<p>The value of the meta field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/albums/642/meta/add\n[{\n    \"name\": \"Location\",\n    \"value\": \"Mexico\"\n}]",
          "type": "json"
        },
        {
          "title": "Example Request",
          "content": "/albums/642/meta/add\n[{\n     \"name\": \"Location\",\n     \"value\": \"Over there\"\n}, {\n     \"name\": \"People\",\n     \"value\": \"Family\"\n}]",
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
            "description": "<p>JWT for user auth</p>"
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user who owns the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access",
            "description": "<p>The access type of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>The date and time the album was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>The date and time the album was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>The albums custom meta data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Mexico\"\n   }\n}",
          "type": "json"
        },
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Wedding Photos\",\n   \"description\": \"The everyone was fun at the wedding over there awesome\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Over There\",\n       \"People\": \"Family\"\n   }\n}",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "metaFieldExists",
            "description": "<p>A meta field with that name already exists</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidMetaName",
            "description": "<p>The meta field name is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidMetaValue",
            "description": "<p>The meta description is not valid</p>"
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
          "title": "Already Exists",
          "content": "HTTP/1.1 400\n{\n    \"metaFieldExists\": \"a meta field with that name already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid Description",
          "content": "HTTP/1.1 400\n{\n    \"invalidMetaDescription\": \"meta description is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/album.js",
    "groupTitle": "Albums"
  },
  {
    "type": "post",
    "url": "/users/{user_id}/albums/create",
    "title": "Create a new album",
    "name": "Create_new_album",
    "group": "Albums",
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
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "size": "0-120",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the album</p>"
          },
          {
            "group": "Request Body",
            "type": "Text",
            "size": "0-300",
            "optional": true,
            "field": "description",
            "description": "<p>A description of the album</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "allowedValues": [
              "\"public\"",
              "\"private\""
            ],
            "optional": true,
            "field": "access",
            "defaultValue": "public",
            "description": "<p>Access type of the album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/users/6534/albums/create\n{\n    \"title\": \"Vacation Photos\",\n    \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n    \"access\": \"public\"\n}",
          "type": "json"
        },
        {
          "title": "Example Request",
          "content": "/users/6534/albums/create\n{\n    \"title\": \"Wedding Photos\",\n    \"description\": \"The everyone was fun at the wedding over there awesome\",\n    \"access\": \"private\"\n}",
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
            "description": "<p>JWT for user auth</p>"
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
            "field": "album_id",
            "description": "<p>The created album ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user who owns the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access",
            "description": "<p>The album access type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>The date and time the album was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>The date and time the album was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>An empty placeholder object for album meta data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 0,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-17 03:02:35\",\n   \"updated_at\": \"2019-11-17 03:02:35\",\n   \"meta\": {}\n}",
          "type": "json"
        },
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 0,\n   \"user_id\": 6534,\n   \"title\": \"Wedding Photos\",\n   \"description\": \"The everyone was fun at the wedding over there awesome\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-17 03:02:35\",\n   \"updated_at\": \"2019-11-17 03:02:35\",\n   \"meta\": {}\n}",
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
            "description": "<p>The user ID does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "albumTitleExists",
            "description": "<p>There is already an album with that title</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumTitle",
            "description": "<p>The album title is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumDescription",
            "description": "<p>The album description is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumAccess",
            "description": "<p>The album access type is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingAlbumTitle",
            "description": "<p>Request body is missing the required title property</p>"
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
          "title": "Title Exists",
          "content": "HTTP/1.1 400\n{\n    \"titleExists\": \"there is already an album with that title\"\n}",
          "type": "json"
        },
        {
          "title": "Missing Description",
          "content": "HTTP/1.1 400\n{\n    \"missingDescription\": \"request body is missing the required description property\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/album.js",
    "groupTitle": "Albums"
  },
  {
    "type": "put",
    "url": "/albums/{album_id}/edit",
    "title": "Edit an album",
    "name": "Edit_an_album",
    "group": "Albums",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin owner collaborator"
      }
    ],
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT for user auth</p>"
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
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "album_id",
            "description": "<p>The albums ID</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "size": "0-120",
            "optional": true,
            "field": "title",
            "description": "<p>The title of the album</p>"
          },
          {
            "group": "Request Body",
            "type": "Text",
            "size": "0-300",
            "optional": true,
            "field": "description",
            "description": "<p>A description of the album</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "allowedValues": [
              "\"public\"",
              "\"private\""
            ],
            "optional": true,
            "field": "access",
            "defaultValue": "public",
            "description": "<p>Access type of the album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/albums/642/edit\n{\n    \"access\": \"private\"\n}",
          "type": "json"
        },
        {
          "title": "Example Request",
          "content": "/albums/642/edit\n{\n    \"title\": \"Vacation Photos\",\n    \"description\": \"Awesome fun vacation time in the Mexico with all the friends\"\n}",
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user who owns the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access",
            "description": "<p>The access type of the album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>The date and time the album was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>The date and time the album was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>The albums custom meta data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Mexico\"\n   }\n}",
          "type": "json"
        },
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Over There\",\n       \"People\": \"Family\"\n   }\n}",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album_id does not exist in the database</p>"
          },
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
            "field": "tooManyProps",
            "description": "<p>The request body contains too many properties</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "albumTitleExists",
            "description": "<p>There is already an album with that title</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumTitle",
            "description": "<p>The album title is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumDescription",
            "description": "<p>The album description is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumAccess",
            "description": "<p>The album access type is not valid</p>"
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
          "title": "Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"albumIdDoesNotExist\": \"album id does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid Description",
          "content": "HTTP/1.1 400\n{\n    \"invalidMetaDescription\": \"meta description is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/album.js",
    "groupTitle": "Albums"
  },
  {
    "type": "get",
    "url": "/users/:user_id/albums",
    "title": "Get a users albums",
    "name": "Get_users_albums",
    "group": "Albums",
    "version": "0.1.0",
    "permission": [
      {
        "name": "any"
      }
    ],
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": "<p>JWT for user auth</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "albums",
            "description": "<p>A list of the users albums</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\",\n   \"meta\": {\n       \"location\": \"Mexico\",\n       \"people\": \"Friends\"\n   }\n}, {\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"title\": \"Wedding Photos\",\n   \"description\": \"The everyone was fun at the wedding over there awesome\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\",\n   \"meta\": {\n       \"location\": \"Over There\",\n       \"people\": \"Family\"\n   }\n}]",
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/album.js",
    "groupTitle": "Albums"
  },
  {
    "type": "delete",
    "url": "/albums/{album_id}/remove",
    "title": "Remove an album",
    "name": "Remove_an_album",
    "group": "Albums",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin owner"
      }
    ],
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT for user auth</p>"
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
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "album_id",
            "description": "<p>The albums ID</p>"
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 642\n}",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album_id does not exist in the database</p>"
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
          "title": "Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"albumIdDoesNotExist\": \"album id does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 400\n{\n    \"unauthorized\": \"you are not authorized to make the request\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/album.js",
    "groupTitle": "Albums"
  },
  {
    "type": "post",
    "url": "/users/{user_id}/media/add",
    "title": "Add media to albums",
    "name": "Add_media",
    "group": "Media",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin owner collaborator"
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
            "type": "Integer[]",
            "optional": false,
            "field": "albums",
            "description": "<p>A list of album IDs</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": false,
            "field": "media",
            "description": "<p>A list of media objects</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "size": "2-120",
            "optional": false,
            "field": "media[title]",
            "description": "<p>A title for the media</p>"
          },
          {
            "group": "Request Body",
            "type": "Text",
            "size": "0-300",
            "optional": true,
            "field": "media[caption]",
            "description": "<p>A caption for the media</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "size": "2-120",
            "optional": true,
            "field": "media[keywords]",
            "description": "<p>A list of keywords describing the media</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": true,
            "field": "media[meta]",
            "description": "<p>A list of meta data objects</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "size": "2-120",
            "optional": false,
            "field": "meta[name]",
            "description": "<p>The name of the meta field</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "size": "2-300",
            "optional": false,
            "field": "meta[value]",
            "description": "<p>The value of the meta field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/users/6542/media/add\n{\n    \"albums\": [0, 1, 2, 3],\n    \"media\": [{\n       \"title\": \"A Photo Title\",\n       \"caption\": \"A short caption for a photo\",\n       \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n       \"meta\": [{\n          \"name\": \"Location\",\n          \"value\": \"Mexico\"\n       }]\n    }, {\n       \"title\": \"A Photo Another Title\",\n       \"caption\": \"Another short caption for a photo\",\n       \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n       \"meta\": [{\n          \"name\": \"People\",\n          \"value\": \"Family\"\n       }, {\n          \"name\": \"Meta Name\",\n          \"value\": \"Meta Value\"\n       }]\n    }]\n}",
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
            "description": "<p>JWT for user auth</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "media",
            "description": "<p>A list of uploaded media</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n[{\n   \"media_id\": 0,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Title\",\n   \"caption\": \"A short caption for a photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"Location\": \"Mexico\",\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n }, {\n   \"media_id\": 1,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Another Title\",\n   \"caption\": \"A short caption for another photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"People\": \"Family\",\n       \"Meta Name\": \"Meta Value\"\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/Another%20Photo%20Title\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n}]",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album ID does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "mediaTitleExists",
            "description": "<p>The media title already exists</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "repeatedMetaName",
            "description": "<p>The meta object already contains the meta name</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidMediaTitle",
            "description": "<p>The media title is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidMediaDescription",
            "description": "<p>The media description is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidKeywords",
            "description": "<p>The keywords are not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidMetaName",
            "description": "<p>The meta field name is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidMetaValue",
            "description": "<p>The meta field value is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingAlbums",
            "description": "<p>Request body is missing the required albums property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingMedia",
            "description": "<p>Request body is missing the required media property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingTitle",
            "description": "<p>Request body is missing the required title property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingMetaName",
            "description": "<p>Request body is missing the required name property</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "missingMetaValue",
            "description": "<p>Request body is missing the required value property</p>"
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
          "title": "Missing Property",
          "content": "HTTP/1.1 400\n{\n    \"missingAlbums\": \"request is missing required albums property\"\n}",
          "type": "json"
        },
        {
          "title": "Does Not Exists",
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/media.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/users/{user_id}/media/add",
    "title": "Get an albums media",
    "name": "Get_albums_media",
    "group": "Media",
    "version": "0.1.0",
    "permission": [
      {
        "name": "admin owner collaborator"
      }
    ],
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT for user auth</p>"
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
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "album_id",
            "description": "<p>The albums ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "media",
            "description": "<p>A list of the albums media</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{\n   \"media_id\": 0,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Title\",\n   \"caption\": \"A short caption for a photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"Location\": \"Mexico\",\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n }, {\n   \"media_id\": 1,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Another Title\",\n   \"caption\": \"A short caption for another photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"People\": \"Family\",\n       \"Meta Name\": \"Meta Value\"\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/Another%20Photo%20Title\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n}]",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album ID does not exist in the database</p>"
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
          "content": "HTTP/1.1 404\n{\n    \"albumIdDoesNotExist\": \"album id does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "HTTP/1.1 500\n{\n    \"serverError\": \"server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/media.js",
    "groupTitle": "Media"
  },
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
            "optional": true,
            "field": "display_name",
            "description": "<p>The users display name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>The users email address</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>The users password</p>"
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
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>The date and time the user was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>The date and time the user was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": " HTTP/1.1 200 OK\n {\n   \"user_id\": 6534,\n   \"display_name\": \"jdoe25\",\n   \"email\": \"john.doe@mail.com\",\n   \"is_admin\": \"false\",\n   \"created_at\": \"2019-11-17 03:41:51\",\n   \"updated_at\": \"2019-11-17 03:41:51\"\n}",
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
    "title": "Get a single user",
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
          "content": "HTTP/1.1 201 CREATED\n{\n   \"user_id\": 6534,\n   \"display_name\": \"jdoe25\",\n   \"email\": \"john.doe@mail.com\",\n   \"is_admin\": false,\n   \"created_at\": \"2019-11-17 03:41:51\",\n   \"updated_at\": \"2019-11-17 03:41:51\",\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw\"\n}",
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
            "description": "<p>The type of user registration. Options: email, google, facebook, twitter</p>"
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
          "content": "HTTP/1.1 201 CREATED\n{\n   \"user_id\": 6534,\n   \"display_name\": \"jdoe25\",\n   \"email\": \"john.doe@mail.com\",\n   \"is_admin\": \"false\",\n   \"created_at\": \"2019-11-17 03:41:51\",\n   \"updated_at\": \"2019-11-17 03:41:51\",\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOeU5hbWUiLCJlbWFpbCI6Im15TmFtZUBtYWlsLmNvbSIsImlhdCI6MTMzQ0ODQ3OH0.XcgH1HUKKxcB80xVUWrLBELvO1D5RQ4azF6ibBw\"\n}",
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
