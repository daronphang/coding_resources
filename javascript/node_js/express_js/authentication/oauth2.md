## Basics:
An authentication protocol used to authenticate users in an application by using another service provider. Industry-standard protocol for authorization. OAuth2 benefits:
- Users don't need to remember their credentials (only need to authorize the app to access their info for selected OAuth provider).
- Prevents security holes as user doesn't provide passwords for sign in/sign up.
- Able to handle non-web clients.

### Three parties in any OAuth mechanism:
1) Resource Owner: User who is trying to log in.
2) Consumer/Client: Application the client wants to log into.
3) Service Provider: External application that authenticates user's identity through their Oauth2 API.

### Overiew:
1) Client/application requests authorization from Service Provider through their gateway URL.
2) Service Provider asks permission from user who thereby grants access for app to access the user's data. 
4) Service Provider authorizes client and redirects to Consumer's redirect URL with request token.
5) Consumer sends POST request to Service Provider using request token to obtain access token.
6) Access token represents the authenticity of client's identity.
7) Service Provider redirects to Consumer's application page with access token and client is authorized.

### OAuth2 Workflow:
1) User authenticates with Facebook account.
2) Facebook Server sends back access token to frontend.
3) Frontend sends access token to Express Server.
4) Express Server sends access token to Facebook Server to verify identity.
5) If valid, Facebook Server sends user details to Express Server who then validates user in its database.
6) Express Server sends JWT Token back to frontend.

Need to regsiter application with OAuth provider first. 

https://morioh.com/p/e37dfcf12462

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
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
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
// passport.js

const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy; 
// GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"here use the clientID given by google",
        clientSecret:"here use the client secret given by google",
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));
```

```js
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const app = express();

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(port, () => console.log("server running on port" + port))
```

## Authorization Server:
Can use Okta to secure data, a cloud service that allows developers to CRUD user accounts and user account data.
