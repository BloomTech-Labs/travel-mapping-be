[![Build Status](https://travis-ci.org/Lambda-School-Labs/travel-mapping-be.svg?branch=master)](https://travis-ci.org/Lambda-School-Labs/travel-mapping-be) [![Uptime Robot ratio (7 days)](https://img.shields.io/uptimerobot/ratio/7/m783768889-993418b1cb12f5cddc0afb4c)](https://stats.uptimerobot.com/B8JgKu7poJ)

# API Documentation

#### Backend deployed at [piktorlog.herokuapp.com](https://piktorlog.herokuapp.com/) <br>

## Getting started

To get the server running locally:

Clone this repository and move into the project directory
```
git clone "https://github.com/Lambda-School-Labs/travel-mapping-be.git"
cd travel-mapping-be
```
 Install dependencies
```
npm install
```
Set up the database
```
npm run migrate
npm run seed
```
Start the development server
```
npm run dev
```

You can access the server at http://localhost:4000/

### Backend framework goes here

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access controll, and descriptioin to match your project

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizatoins/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/current`        | all users           | Returns info for the logged in user.               |
| GET    | `/users/org/:userId`    | owners, supervisors | Returns all users for an organization.             |
| GET    | `/users/:userId`        | owners, supervisors | Returns info for a single user.                    |
| POST   | `/users/register/owner` | none                | Creates a new user as owner of a new organization. |
| PUT    | `/users/:userId`        | owners, supervisors |                                                    |
| DELETE | `/users/:userId`        | owners, supervisors |                                                    |

# Data Models

View the [Entity Relationship Diagram (ERD)](https://dbdiagram.io/d/5dc051d6edf08a25543d7ebf) for a more detailed representation.

#### USERS

---

```
{
  user_id: BIGINT
  display_name: VARCHAR
  email: VARCHAR
  password: VARCHAR
  is_admin: BOOLEAN
  is_superuser: BOOLEAN
  created_at: DATETIME
  updated_at: DATETIME
}
```

#### INVITATIONS

---

```
{
  invitation_id: BIGINT
  user_id: BIGINT
  invited_user_id: BIGINT
  album_id: BIGINT
  created_at: DATETIME
}
```

#### COLLABORATORS

---

```
{
  collaborator_id: BIGINT
  user_id: BIGINT
  album_id: BIGINT
  permissions: ENUM
  expires_on: DATETIME
  created_at: DATETIME
}
```

#### ALBUMS

---

```
{
  album_id: BIGINT
  user_id: BIGINT
  title: VARCHAR
  description: TEXT
  access: ENUM
  created_at: DATETIME
}
```

#### ALBUMSMETA

---

```
{
  albumMeta_id: BIGINT
  album_id: BIGINT
  name: VARCHAR
  value: VARCHAR
}
```

#### MEDIA

---

```
{
  media_id: BIGINT
  user_id: BIGINT
  title: VARCHAR
  caption: TEXT
  type: ENUM
  media_url: VARCHAR
  created_at: DATETIME
  updated_at: DATETIME
}
```

#### MEDIAMETA

---

```
{
  mediaMeta_id: BIGINT
  media_id: BIGINT
  name: VARCHAR
  value: VARCHAR
}
```

#### KEYWORDS

---

```
{
  keyword_id: BIGINT
  name: VARCHAR
  created_at: DATETIME
}
```

#### COMMENTS

---

```
{
  comment_id: BIGINT
  user_id: BIGINT
  media_id: BIGINT
  album_id: BIGINT
  parent_id: BIGINT
  text: TEXT
  created_at: DATETIME
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
