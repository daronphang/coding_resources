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
