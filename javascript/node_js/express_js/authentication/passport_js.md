### Basics

Authentication middleware for Node. As each application has unique authentication requirements, applications can choose which strategies/authentication mechanisms (packaged as individual modules) to employ without creating unnecessary dependencies. If authentication fails, Passport will respond with 401 status by default.

### Configuration

1. Authentication strategies.
2. Application middleware.
3. Sessions (optional).

### Strategies

Requires verify callback function that finds the user that possesses a set of credentials. When Passport authenticates a request, it parses the credentials in request and then invokes the verify callback with those credentials as arguments. If credentials are valid, the verify callback invokes done() to supply Passport with the user that authenticated.

### Basic Auth Example

```js
// passport.js for configuration purposes

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Users = mongoose.model("Users");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      } // connection to server/database failure
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user); // successful authentication
    });
  })
);
```

```js
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); // needed to initialize Passport

// if application uses persistent login sessions
// app.use(session({ secret: "cats" }));
// app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    session: false, // Passport establishes persistent login session by default; however, API do not use sessions
  })
);
```

### OAuth2 Example

Two routes are required; first route redirects user to Service Provider while second is URL to which user will be redirected after authenticating with provider.

```js
// passport.js

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));
```

```js
// first route that redirects to OAuth2 provider
app.get("/auth/provider", passport.authenticate("provider"));

// after authentication, provider redirects user back to application at second route
// finishes auth process by attempting to obtain access token
app.get(
  "/auth/provider/callback",
  passport.authenticate("provider", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
```
