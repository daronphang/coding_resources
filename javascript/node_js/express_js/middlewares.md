## Basics:
Functions that have access to request object, resposne object and next function in application's request-response cycle. If current middleware does not end request-response cycle, it must call next() to pass control to next middleware function. 

## Body Parser:
Parse incoming request bodies before handlers. All middlewares will populate the req.body property with parsed body when Content-Type request header matches the type option.

```javascript
// API
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false));

// parse application/json
app.use(bodyParser.json())    // can take in optional options object 
```
