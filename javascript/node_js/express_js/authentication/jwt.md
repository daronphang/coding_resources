## JWT Access Token:
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

## Refresh Token:
Once access token expires, server automatically generates a new access token with refresh token to continue granting user access without having to re-authenticate.
