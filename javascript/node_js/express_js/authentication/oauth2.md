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
```
npm install passport
npm install passport-google-oauth
npm install passport-http-bearer
```

```js
// passport setup for Google auth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
));
```
```js
// app.js
const express = require('express');
const app = express();
const passport = require('passport');

app.use(passport.initialize());

app.get('/auth/google/success', (req, res) => res.send(userProfile));
app.get('/auth/google/error', (req, res) => res.send("error logging in"));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/error'
}));
  
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
