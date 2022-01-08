### JWT Access Token

```js
const jwt = require("jsonwebtoken");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loggedUser;

  return getDb()
    .collection("users")
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email does not exist. Please check again.");
        error.statusCode = 401;
        throw error;
      }
      loggedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordValid) => {
      if (!passwordValid) {
        const error = new Error("Password is invalid.");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loggedUser.email,
          name: loggedUser.name,
        },
        "SECRET_KEY_SHOP_SPREE",
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: "Login success!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
```

### Refresh Token

Once access token expires, server automatically generates a new access token with refresh token to continue granting user access without having to re-authenticate. Requires greater security when it is stored as third-parties could use it to obtain access tokens and access protected resources. Server needs to implement a system to invalidate refresh token besides setting an expiry date.

Refresh token can be self-contained:

- Benefit is that it does not require access to database to extract necessary information of user.
- However, not possible to validate if token is blacklisted or overridden by admin.

### Procedure

1. If access token expires, middleware will route to /token resource and passes the refresh token and username as request payload.
2. Store UID in refresh token.
3. Server will also keep a store of refresh tokens issued (Redis).
4. Refresh token resource will verify validity of refresh token and username.
5. If success, will generate a new access token.

### Example

```js
app.post('/token', (req, res, next) => {
  const username = req.body.username;
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
    const newToken = jwt.sign(username, 'SECRET', { expiresIn: 500 });
    res.json({ token: newToken });
  }
  else {
    res.send(401);
  }
});

// to disable refresh token if it was stolen/lost (admin execution)
app.post('/token/reject', (req, res, next) => {
  const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken];
  }
  res.send(204);
});
```
