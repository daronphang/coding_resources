### Express Validator

```
check()                   Goes through body, params, cookies and headers to find input with name equal to specified arg
ValidationResult()        Gather all errors prior validation middleware

// Sanitizers
trim()
normalizeEmail()
```

```js
const { check, body } = require("express-validator/check");

// add validator middleware
router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter an email"),
    body("password", "some default error msg")
      .isLength({ min: 5, max: 10 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);

// auth.js
const { ValidationResult } = require("express-validator/check");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("/signup", {
      path: "/signup",
      errorMsg: errors.array()[0],
    });
  }
};
```

### Custom Validators

```javascript
router.post('/signup', check('email').isEmail().custom((value, {req} => {
  if (value == 'example@gmail.com') {
    throw new Error('Invalid email');
  }
  return true;
}), authController.postSignup);
```

### Async Validation

Return Promise.reject('some error msg') and Express Validation will catch that error.

```javascript
router.post('/signup', check('email').isEmail().custom((value, {req} => {
  return User.findOne({email: 'hello'}).then(user => {
    if (user) {
      return Promise.reject('some error msg');
    }
  })
}), authController.postSignup);
```
