### Basics

Functions that have access to request object, response object and next function in application's request-response cycle. If current middleware does not end request-response cycle, it must call next() to pass control to next middleware function. Pluggable nature of expressJS. Middleware functions are executed sequentially and hence, order is important.

### Body Parser

Parse incoming request bodies before handlers. All middlewares will populate the req.body property with parsed body when Content-Type request header matches the type option.

```javascript
// API
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false));

// parse application/json
app.use(bodyParser.json())    // can take in optional options object
```

### Express Functions

Defined by const app = express().

#### use()

A route will match any path that follows its path immediately with a '/'.

```javascript
express = require('express');
app = express();

app.use([path], callback, [callback...]);

app.use('/apple', ...)    // will match '/apple', '/apple/images', '/apple/images/news'
```
