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
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Mexico\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
          "type": "json"
        },
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Wedding Photos\",\n   \"description\": \"The everyone was fun at the wedding over there awesome\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Over There\",\n       \"People\": \"Family\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
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
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 0,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-17 03:02:35\",\n   \"updated_at\": \"2019-11-17 03:02:35\",\n   \"meta\": {},\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
          "type": "json"
        },
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"album_id\": 0,\n   \"user_id\": 6534,\n   \"title\": \"Wedding Photos\",\n   \"description\": \"The everyone was fun at the wedding over there awesome\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-17 03:02:35\",\n   \"updated_at\": \"2019-11-17 03:02:35\",\n   \"meta\": {},\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
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
    "url": "/albums/:album_id/meta/edit",
    "title": "Add/remove album metadata",
    "name": "Edit_Album_MetaData",
    "group": "Albums",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
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
            "field": "album_id",
            "description": "<p>The albums ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/albums/7/edit\n{\n    \"add\": [\n      { \"name\": \"meta2\", \"value\": \"value2\" }\n    ]\n    \"remove\": [\n      \"meta1\",\n      \"meta2\"\n    ]\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\",\n   \"meta\": {\n       \"location\": \"Mexico\",\n       \"people\": \"Friends\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "serverError",
            "description": "<p>Internal server error</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Mexico\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
          "type": "json"
        },
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 642,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:47:02\",\n   \"meta\": {\n       \"Location\": \"Over There\",\n       \"People\": \"Family\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
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
    "url": "/albums/:album_id",
    "title": "Get a specific album",
    "name": "Get_specific_album",
    "group": "Albums",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
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
          },
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
            "type": "Object",
            "optional": false,
            "field": "album",
            "description": "<p>the album matching the specified id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\",\n   \"meta\": {\n       \"location\": \"Mexico\",\n       \"people\": \"Friends\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}",
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
            "field": "albumIdDoesNotExist",
            "description": "<p>The album_id does not exist in the database</p>"
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
          "content": "HTTP/1.1 200 OK\n[{\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"title\": \"Vacation Photos\",\n   \"description\": \"Awesome fun vacation time in the Mexico with all the friends\",\n   \"access\": \"public\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\",\n   \"meta\": {\n       \"location\": \"Mexico\",\n       \"people\": \"Friends\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}, {\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"title\": \"Wedding Photos\",\n   \"description\": \"The everyone was fun at the wedding over there awesome\",\n   \"access\": \"private\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\",\n   \"meta\": {\n       \"location\": \"Over There\",\n       \"people\": \"Family\"\n   },\n   \"cover_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/placeholder.jpg\"\n}]",
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
    "type": "get",
    "url": "/albums/:album_id/collaborators",
    "title": "Get all collaborators belonging to an album",
    "name": "Get_collaborators",
    "group": "Collaborators",
    "version": "0.1.0",
    "permission": [
      {
        "name": "owner"
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
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
            "field": "collaborators",
            "description": "<p>A list of the album's collaborators</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{\n   \"collaborator_id\": 8,\n   \"user_id\": 2,\n   \"album_id\": 1,\n   \"permissions\": \"view\",\n   \"expires_on\": null,\n   \"created_at\": \"2020-01-08 13:45:02\",\n   \"display_name\": \"test2\",\n   \"email\": \"test2@test.com\"\n }]",
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
            "field": "collaboratorDoesNotExist",
            "description": "<p>The collaborator_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumAccess",
            "description": "<p>You lack sufficient permissions with that album to perform that action</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "unauthorized",
            "description": "<p>Not logged in, or not authorized to interact with that album</p>"
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
          "title": "Album Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"albumIdDoesNotExist\": \"album_id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/collaborator.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "delete",
    "url": "/albums/:album_id/collaborators/:collaborator_id/remove",
    "title": "Remove this collaborator's association with the album",
    "name": "Remove_collaborator",
    "group": "Collaborators",
    "version": "0.1.0",
    "permission": [
      {
        "name": "owner"
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
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
            "field": "deleted",
            "description": "<p>The collaborator_id of the removed collaborator</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"deleted\": 6\n}",
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
            "field": "collaboratorDoesNotExist",
            "description": "<p>The collaborator_id does not exist in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidAlbumAccess",
            "description": "<p>You lack sufficient permissions with that album to perform that action</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "unauthorized",
            "description": "<p>Not logged in, or not authorized to interact with that album</p>"
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
          "title": "Album Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"albumIdDoesNotExist\": \"album_id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/collaborator.js",
    "groupTitle": "Collaborators"
  },
  {
    "type": "post",
    "url": "/albums/:album_id/invites/create",
    "title": "Invite a user to collaborate on an album",
    "name": "Create_invitation",
    "group": "Invitations",
    "version": "0.1.0",
    "permission": [
      {
        "name": "album owner"
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "invited_email",
            "description": "<p>the email of user to be invited</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/albums/4563/invites/create\n{\n    \"invited_email\": \"test@gmail.com\"\n}",
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
            "field": "invitation",
            "description": "<p>the invitation object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{  \n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": \"2343\",\n   \"created_at\": \"2019-11-06 18:42:57\"\n}",
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
            "field": "selfInvitation",
            "description": "<p>The user_id and the invited_user_id match</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "invalidProps",
            "description": "<p>missing required keys in the body</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "inviteeIdDoesNotExist",
            "description": "<p>The invited_user_id does not exist in the database</p>"
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/invitation.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "get",
    "url": "/albums/:album_id/invites",
    "title": "get all pending invitations for an album",
    "name": "Get_album_invitations",
    "group": "Invitations",
    "version": "0.1.0",
    "permission": [
      {
        "name": "album owner"
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
            "field": "album_id",
            "description": "<p>The album ID</p>"
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
            "field": "invitation",
            "description": "<p>the invitation object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{  \n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": 2343,\n   \"invited_user_name\": \"test\",\n   \"invited_user_email\": \"test@test.com\",\n   \"created_at\": \"2019-11-06 18:42:57\"\n}, {\n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": 2343,\n   \"invited_user_name\": \"test2\",\n   \"invited_user_email\": \"test2@test.com\",\n   \"created_at\": \"2019-11-06 18:42:57\"\n}]",
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/invitation.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "get",
    "url": "/invites/:invite_id/accept",
    "title": "accept the invitation",
    "name": "accept_invite",
    "group": "Invitations",
    "version": "0.1.0",
    "permission": [
      {
        "name": "invited_user"
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
            "field": "invite_id",
            "description": "<p>The user ID</p>"
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
            "field": "collaborator_id",
            "description": "<p>the id of the collaborator relationship</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "album_id",
            "description": "<p>the album they've joined</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>the user added as a collaborator to the album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 201 CREATED\n{  \n  \"collaborator_id\": 3,\n  \"album_id\": 1,\n  \"user_id\": 1\n}",
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
            "field": "invitationDoesNotExist",
            "description": "<p>invite_id does not match any existing invitation</p>"
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"invitationDoesNotExist\": \"invite id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/invitation.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "get",
    "url": "/users/:user_id/invites/from",
    "title": "get all pending invitations created by a user",
    "name": "get_invites_from_user",
    "group": "Invitations",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
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
            "description": "<p>The user ID</p>"
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
            "field": "invitation",
            "description": "<p>the invitation object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{  \n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": 2343,\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"invited_user_email\": \"test2@test.com\",\n   \"invited_user_name\": \"test2\"\n}, {\n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": 2343,\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"invited_user_email\": \"test3@test.com\",\n   \"invited_user_name\": \"test3\"\n}]",
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
            "field": "missingUserId",
            "description": "<p>the user_id was missing or not parsed correctly</p>"
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/invitation.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "get",
    "url": "/users/:user_id/invites/to",
    "title": "get all pending invitations sent to a user",
    "name": "get_invites_to_user",
    "group": "Invitations",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user"
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
            "description": "<p>The user ID</p>"
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
            "field": "invitation",
            "description": "<p>the invitation object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{  \n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": 2343,\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"user_email\": \"test2@test.com\",\n   \"user_name\": \"test2\",\n   \"title\": \"a title\",\n   \"description\": \"a description\",\n   \"cover_url\": \"htts://photos.com/yourphoto\"\n}, {\n   \"invitation_id\": 2345\n   \"album_id\": 4356,\n   \"user_id\": 6534,\n   \"invited_user_id\": 2343,\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"user_email\": \"test3@test.com\",\n   \"user_name\": \"test3\",\n   \"title\": \"a title\",\n   \"description\": \"a description\",\n   \"cover_url\": \"htts://photos.com/yourphoto\"\n}]",
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
            "field": "missingUserId",
            "description": "<p>the user_id was missing or not parsed correctly</p>"
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"user id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/invitation.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "delete",
    "url": "/invites/:invite_id/remove",
    "title": "delete the specified invitation",
    "name": "remove_invite",
    "group": "Invitations",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user invited_user"
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
            "field": "invite_id",
            "description": "<p>The user ID</p>"
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
            "field": "invite_id",
            "description": "<p>the removed invite</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{  \n   \"invitation_id\": 2345\n}",
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
            "field": "invitationDoesNotExist",
            "description": "<p>invite_id does not match any existing invitation</p>"
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
          "title": "User Does Not Exist",
          "content": "HTTP/1.1 404\n{\n    \"invitationDoesNotExist\": \"invite id does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/invitation.js",
    "groupTitle": "Invitations"
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
          "content": "HTTP/1.1 201 CREATED\n[{\n   \"media_id\": 0,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Title\",\n   \"caption\": \"A short caption for a photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"Location\": \"Mexico\",\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg\",\n   \"thumbnail_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n }, {\n   \"media_id\": 1,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Another Title\",\n   \"caption\": \"A short caption for another photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"People\": \"Family\",\n       \"Meta Name\": \"Meta Value\"\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg\",\n   \"thumbnail_url: \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n}]",
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
    "url": "/albums/{album_id}/media",
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
          "content": "HTTP/1.1 200 OK\n[{\n   \"media_id\": 0,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Title\",\n   \"caption\": \"A short caption for a photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"Location\": \"Mexico\",\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg\",\n   \"thumbnail_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n }, {\n   \"media_id\": 1,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Another Title\",\n   \"caption\": \"A short caption for another photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"People\": \"Family\",\n       \"Meta Name\": \"Meta Value\"\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg\",\n   \"thumbnail_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n}]",
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
    "type": "get",
    "url": "/users/{user_id}/media",
    "title": "Get a users media",
    "name": "Get_users_media",
    "group": "Media",
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
            "field": "user_id",
            "description": "<p>The users ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n[{\n   \"media_id\": 0,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Title\",\n   \"caption\": \"A short caption for a photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"Location\": \"Mexico\",\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg\",\n   \"thumbnail_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n }, {\n   \"media_id\": 1,\n   \"user_id\": 6542,\n   \"albums\": [0, 1, 2, 3],\n   \"title\": \"A Photo Another Title\",\n   \"caption\": \"A short caption for another photo\",\n   \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n   \"meta\": {\n       \"People\": \"Family\",\n       \"Meta Name\": \"Meta Value\"\n   }\n   \"media_url\": \"http://res.cloudinary.com/dinezno0n/image/upload/6542/A%20Photo%20Title.jpg\",\n   \"thumbnail_url\": \"https://res.cloudinary.com/dinezno0n/image/upload/w_400,h_400,c_thumb/0/A%20Photo%20Title.jpg\",\n   \"created_at\": \"2019-11-06 18:42:57\",\n   \"updated_at\": \"2019-11-06 18:42:57\"\n}]",
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
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"album id does not exist\"\n}",
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
    "type": "put",
    "url": "/media/data/:media_id/edit",
    "title": "Update a piece of media",
    "name": "edit_media",
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
            "field": "media_id",
            "description": "<p>The media ID</p>"
          },
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "album_id",
            "description": "<p>The album ID</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>A new title for the media CURRENTLY DISABLED. WILL REQUIRE REDESIGN OF MEDIA SCHEMA TO WORK PROPERLY</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "caption",
            "description": "<p>A new caption for the media</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": true,
            "field": "keywords",
            "description": "<p>A new list of keywords describing the media. keywords undefined or falsy indicates no changes</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": true,
            "field": "meta",
            "description": "<p>A new list of meta data objects. meta undefined or falsy indicates no changes</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "meta[name]",
            "description": "<p>The name of the meta field</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "meta[value]",
            "description": "<p>The value of the meta field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/albums/6542/media/3535/edit\n{\n  \"title\": \"A Photo Title\",\n  \"caption\": \"A short caption for a photo\",\n  \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n  \"meta\": [{\n    \"name\": \"Location\",\n    \"value\": \"Mexico\"\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"edited_id\": 34532\n}",
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
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"album id does not exist\"\n}",
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
    "type": "get",
    "url": "/media/data/:media_id/view",
    "title": "get specifc media info",
    "name": "get_individual_media",
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
            "field": "media_id",
            "description": "<p>The media ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/media/data/23545/view",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Example Response",
          "content": "  HTTP/1.1 200 OK\n\n{\n  \"media_id\": 99,\n  \"user_id\": 222,\n  \"title\": \"photo\",\n  \"caption\": \"a caption2\",\n  \"type\": \"photo\",\n  \"created_at\": \"2020-01-09 09:19:45\",\n  \"updated_at\": \"2020-01-12 05:02:39\",\n  \"keywords\": [\"keyword-one\", \"keyword-two\", \"keyword-three\"],\n  \"meta\": {\n    \"People\": \"Family\",\n    \"Meta Name\": \"Meta Value\"\n  }\n  \"media_url\": \"http://localhost:4000/users/222/media/original/photo\",\n  \"thumbnail_url\": \"http://localhost:4000/users/222/media/thumbnail/photo\"\n}",
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
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"album id does not exist\"\n}",
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
    "type": "delete",
    "url": "/albums/:album_id/media/:media_id/remove",
    "title": "Remove a piece of media from an album",
    "name": "remove_media",
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
            "description": "<p>The album ID</p>"
          },
          {
            "group": "URL Parameters",
            "type": "Integer",
            "optional": false,
            "field": "media_id",
            "description": "<p>The media ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Request",
          "content": "/albums/6542/media/23545/remove",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 204 NO CONTENT",
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
          "content": "HTTP/1.1 404\n{\n    \"userIdDoesNotExist\": \"album id does not exist\"\n}",
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
