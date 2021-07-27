## Express Validator:
```
npm install --save express-validator
```
```
check()                   Goes through body and headers to find input with name equal to specified arg
ValidationResult()        Gather all errors prior validation middleware 
```

```javascript
const { check } = require('express-validator/check');

// add validator middleware
router.post('/signup', check('email').isEmail().withMessage('Please enter an email'), authController.postSignup);


// auth.js
const { ValidationResult } = require('express-validator/check');

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('/signup', {
      path: '/signup',
      errorMsg: errors.array()[0]
    });
  }
}


```
