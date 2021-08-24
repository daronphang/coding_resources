## Basics:
An authentication protocol used to authenticate users in an application by using another service provider. Industry-standard protocol for authorization. OAuth2 benefits:
- Users don't need to remember their credentials (only need to authorize the app to access their info for selected OAuth provider).
- Prevents security holes as user doesn't provide passwords for sign in/sign up.
- Able to handle non-web clients.

### Parties in OAuth Mechanism:
1) Resource Owner: User who is trying to log in.
2) Consumer/Client: Application the user wants to log into.
3) Express Server: Client backend server.
4) Resource Server: Hosts the protected resources such as user's profile.
5) Authorization Server: Responsible for authenticating user and providing access token to clients.

### OAuth2 Workflow:
1) User requests authorization from Authorization Server through their gateway URL and enters credentials.
2) Authorization Server asks permission from user who thereby grants access for app to access the user's data. 
4) Authorization Server authorizes user and redirects to Consumer's redirect URL with request token.
5) Consumer sends GET/POST request to Authorization Server with request token to exchange for access token.
6) Access token is used to authenticate future requests sent to Resource Server.
7) Authorization Server sends response with access token.
8) Client uses access token to request user's profile from Resource Server.
9) Client validates user's existence in its database and redirects to application's page.

### OAuth2 Workflow:
1) User authenticates with Facebook account.
2) Facebook Server sends back access token to frontend.
3) Frontend sends request token to Express Server.
4) Express Server sends request token to Facebook Server to exchange for access token.
5) If valid, Facebook Server sends user details to Express Server who then validates user in its database.
6) Express Server sends JWT Token back to frontend.

Need to regsiter application with OAuth provider first. 

https://www.loginradius.com/blog/async/google-authentication-with-nodejs-and-passportjs/
https://morioh.com/p/e37dfcf12462  
https://medium.com/authpack/facebook-auth-with-node-js-c4bb90d03fc0  
https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#login  

## NodeJS Example:
Client ID is the identity of Consumer who is accessing the OAuth service (registered through their portal). Client secret will also be issued and is used together with request token to obtain access token (get information about the user). 

Below example passes access token to user; however, should create session token that is sent to user as cookie. Server will maintain a mapping of Session Tokens: Access Tokens in database. 

```
OAuth URL                 "https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:8080/oauth/redirect"
SP with request token     "http://localhost:8080/oauth/redirect?code=code123requesttoken"
POST request to SP        "https://github.com/login/oauth/access_token"
```

```html
<!DOCTYPE html>
<html>
  <body>
    <a
      href="https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:8080/oauth/redirect"
    >
      Login with github
    </a>
  </body>
</html>
```

```js
const express = require("express");
const axios = require('axios');
const app = express();

const clientID = "<your client id>";
const clientSecret = "<your client secret>";

app.get("/oauth/redirect", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "get",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    // example response is {"access_token": {access-token}, "token_type": {type},"expires_in": {seconds-til-expiration}}
    const accessToken = response.data.access_token;
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
});

app.use(express.static(__dirname + "/public"));
app.listen(8080);
```

## Using Passport JS:
Authentication middleware for express.js. Supports various login types including token, basic, OAuth, OAuth2, etc. Also used to connect external auth services to choose to login with selected Strategies.

```js
// passport setup for Google auth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';

let userProfile;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
  }
));

export userProfile;
```
```js
// app.js
const express = require('express');
const app = express();
const passport = require('passport');

app.use(passport.initialize());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });
  
const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));
```
```html
<body>
<div class="container">
    <div class="jumbotron text-center text-primary">
        <h1><span class="fa fa-lock"></span> Social Authentication</h1>
        <p>Login or Register with:</p>
        <a href="/auth/google" class="btn btn-danger"><span class="fa fa-google"></span> SignIn with Google</a>
    </div>
</div>
</body>
```

## Authorization Server:
Can use Okta to secure data, a cloud service that allows developers to CRUD user accounts and user account data.
