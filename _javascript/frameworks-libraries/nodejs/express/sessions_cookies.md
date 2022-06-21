### Cookies

Cookies are in the form of key value pairs. Can set configuration properties to cookies.

```js
exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; Secure");
};
```

```
;secure         Cookies to only be transmitted over HTTPS
;HttpOnly       Inaccessible to JS Document.cookie API i.e sent only to server and mitigate cross-site scriping attacks
;Domain=        Specifies which hosts are allowed to receive the cookie and always includes subdomains
;path=          Indicates a URL path must exist in requested URL in order to send cookie header
;max-age=       In seconds
;expires=       Date in GMT string format
;samesite=      Prevents browser from sending cookie along with cross-site requests (CSRF attacks); Strict, Lax or None
```

### Sessions

Data stored in server for the same user which requires a session ID. Can use session cookies to store hashed session ID for identifying user. Sessions can be stored in memory or in database. Can configure cookie settings in session. Useful for storing private data that belongs to user that doesn't get lost after every response sent.

```
$npm install --save express-session
```

```js
const session = require('express-session');

app.use(session({       // express automatically sets a cookie
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));


// setting session (storing in memory)
export.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
}
```

#### Deleting Sessions

```js
req.session.destroy((err) => {
  console.log(err);
  req.redirect("/");
});
```

### Storing in Database

```js
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

const store = new MongoDbStore({
  uri: "some uri",
  collection: "sessions",
});

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
```
