## Encryption:
```
npm install --save bcryptjs
```

```javascript
const bcrypt = require('bcryptjs');

bcrypt.hash(password, 12).then().catch();
bcrypt.compare(password, user.password).then().catch();
```

## Protecting Routes:
Use middlwares to protect routes.

```javascript
module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('login');
  }
  next();
}

router.get('/homepage', isAuth, exampleController.getHomepage);
```

## CSRF:
Stores token in session by default. Can configure settings such as hash value. Protects POST requests that have ability to manipulate data. For submitting CSRF tokens for POST requests, can input with name as \_csrf. 
```javascript
const csrf = require('csurf');

const csrfProtection = csrf();   // can pass in objects for configuration

app.use(csrfProtection);

// to retrieve token
let csrfToken = req.csrfToken()
```

```html
<input type="hidden" name="_csrf" value="<%= csrfToken %>">
```

To enable CSRF protection on every page rendered, use middleware to tell expressjs that some data should be included in every rendered view.

```javascript
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

## Tokens:
```javascript
const crypto = require('crypto');

exports.postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
  });
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: {$gt: Date.now()}
  }).then().catch();
}
```

## JWT:
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
