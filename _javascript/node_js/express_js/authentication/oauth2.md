### OAuth2

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
const axios = require("axios");
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

### Using Passport JS

Authentication middleware for express.js. Supports various login types including token, basic, OAuth, OAuth2, etc. Also used to connect external auth services to choose to login with selected Strategies.

https://www.freecodecamp.org/news/a-quick-introduction-to-oauth-using-passport-js-65ea5b621a/  
https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4  
http://www.passportjs.org/packages/passport-google-oauth2/

```
Google      https://console.developers.google.com/apis/credentials
```

```
npm install passport
npm install passport-google-oauth
npm install passport-http-bearer
```

```js
// app.js
const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: "SOME_SECRET_COOKIE_KEY",
  })
);

app.use(passport.initialize());
app.use(passport.session()); // used for persistent login sessions

// PASSPORT STRATEGY FOR GOOGLE AUTH
const GOOGLE_CLIENT_ID = "our-google-client-id";
const GOOGLE_CLIENT_SECRET = "our-google-client-secret";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    // verify callback function that parses credentials as arguments
    (accessToken, refreshToken, profile, done) => {
      const { email, first_name, last_name } = profile;
      // find or create user in separate Mongodb collection as there is no password field
      // store profile.id, profile.first_name, profile.email, accessToken, refreshToken
      // ...
      done(null, profile); // tells passport to proceed with auth flow; passes the profile data to serializeUser
    }
  )
);

// FOR SESSIONS ONLY
// Passport generates some identifying token and stuff it inside a cookie
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((id, done) => {
  // Check in database if user id exists
  done(null, user);
});

// ROUTES
app.get("/auth/google/success", (req, res) => res.send("success"));
app.get("/auth/google/error", (req, res) => res.send("error logging in"));

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // prevent auto-sign in with PassportJS or implement request that revokes token
  })
);

// middleware receives data from Google and runs the function on strategy config
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/error",
    successRedirect: "/auth/google/success",
    session: false, // default for done() is to pass data to session
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));
```

```html
<body>
  <div class="container">
    <div class="jumbotron text-center text-primary">
      <h1><span class="fa fa-lock"></span> Social Authentication</h1>
      <p>Login or Register with:</p>
      <a href="/auth/google" class="btn btn-danger"
        ><span class="fa fa-google"></span> SignIn with Google</a
      >
    </div>
  </div>
</body>
```

```
// profile response
provider
id
name
displayName
birthday
relationship
isPerson
isPlusUser
placesLived
language
emails
gender
picture
coverPhoto
```

#### Custom Callback

```js
exports.getGoogleOAuthCallback = function (req, res, next) {
  return passport.authenticate("google", function (err, profile) {
    if (err) {
      return res.redirect(`http://127.0.0.1:3000/404?msg=${err}`);
    }
    if (!profile) {
      return res.redirect(
        404,
        "http://127.0.0.1:3000/404?msg=no-profile-available"
      );
    }
    generateTokens(_id, "LOGIN")
      .then((tokens) => {
        res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
        res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
        return res.redirect("http://127.0.0.1:3000");
      })
      .catch((err) => {
        return res.redirect(`http://127.0.0.1:3000/404?msg=${err}`);
      });
  })(req, res, next);
};
```

### Verifying Oauth Access Tokens for Subsequent API Calls to Provider

To verify the integrity of access token, best is to use Google API client library or a general-purpose JWT library. For debugging only, can use validation endpoint.

https://developers.google.com/identity/sign-in/web/backend-auth

```
npm install google-auth-library --save

// validation endpoint (do not use in production)
GET https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123
```

```js
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  // verifyIdToken verifies JWT signature, aud/exp/iss claim
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);
```

### Authorization Server

Can use Okta to secure data, a cloud service that allows developers to CRUD user accounts and user account data.
