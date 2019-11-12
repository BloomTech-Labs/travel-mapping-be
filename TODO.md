// FIXME Access Google's API (optional?)

- Once a user successfully authenticates, Google will include an Access Token in the user profile it returns to Auth0. You can use this token to call Google's API.

- To get the Google Access Token, you must retrieve the full user's profile using the Auth0 Management API and extract the Access Token from the response. For detailed steps, see Call an Identity Provider's API.

- Using the token, you can call Google's API following Google's documentation.

- Optional: Get a Refresh Token from Google to refresh your Access Token once it expires. To ensure your application is secure, pay close attention to the restrictions on using Refresh Tokens.

- https://auth0.com/docs/connections/social/google#access-google-s-api-

- https://auth0.com/docs/connections/calling-an-external-idp-api

// TODO [done] npm install express cors express-jwt jwks-rsa body-parser express-jwt-authz --save

// TODO [done] create auth0 branch

// TODO [done] move files in src to api

// TODO [done] change env domain and id to actual domain/id

// TODO [done] Create the middleware function to validate the Access Token.

// TODO [done, not our concern at the moment] Enable the use of the middleware in our routes.

// TODO [done] Enable the use of request body parsing middleware

// FIXME add todo headers open, pending, review,

```txt
In order to test the working scenario as well we need to:

Get an Access Token. For details on how to do so refer to: Get an Access Token.
Invoke the API while adding an Authorization header to our request with the value Bearer ACCESS_TOKEN (where ACCESS_TOKEN is the value of the token we retrieved in the first step).
```

// TODO build out test endpoint
