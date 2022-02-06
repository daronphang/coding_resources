### Custom Validators

```js
const { body } = require('express-validator');

app.post(
  '/user',
  body('email').custom(value => {
    return User.findUserByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Handle the request
  },
);


// error response
{
  "errors": [
    {
      "location": "body",
      "msg": "Invalid value",
      "param": "username"
    }
  ]
}
```

```js
const { body } = require("express-validator");

app.post(
  "/user",
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Handle the request
  }
);
```

### Sanitizers

Documentation: https://github.com/validatorjs/validator.js#sanitizers
