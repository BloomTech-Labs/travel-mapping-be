// FIXME Access Google's API (optional?)

- Once a user successfully authenticates, Google will include an Access Token in the user profile it returns to Auth0. You can use this token to call Google's API.

- To get the Google Access Token, you must retrieve the full user's profile using the Auth0 Management API and extract the Access Token from the response. For detailed steps, see Call an Identity Provider's API.

- Using the token, you can call Google's API following Google's documentation.

- Optional: Get a Refresh Token from Google to refresh your Access Token once it expires. To ensure your application is secure, pay close attention to the restrictions on using Refresh Tokens.

- https://auth0.com/docs/connections/social/google#access-google-s-api-

- https://auth0.com/docs/connections/calling-an-external-idp-api

// TODO Define the API endpoints

// TODO npm install express cors express-jwt jwks-rsa body-parser express-jwt-authz --save
