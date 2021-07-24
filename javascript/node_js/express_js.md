## Basics:
Backend web application framework for node.js. Designed for building web applications and APIs. Key concept is middleware whereby an incoming request is automatically funneled through a series of functions by expressjs. Offers pluggable nature. 

For incoming requests, need to parse them first with third-party packages before you can use req.body.

For limiting middleware execution, app.use() for POST/GET/PUT/DELETE, app.post() for POST, app.get() for GET requests.

```
npm install --save express (not --save dev as this is production dependency)
npm install --save body-parser (should be added automatically by express)
```

## Helpers:
```javascript
// util/path.js
const path = require('path');

// dont have to add '..' when specifying absolute paths 
module.exports = path.dirname(process.mainModule.filename);
```

## External CSS Static Files:
```html
<link rel="stylesheet" href="/css/main.css">
```

```css
/*public/css/main.css*/

/* put css code here */
```

```javascript
// app.js

app.use(express.static(path.join(__dirname, 'public')));
```

## Example:

```javascript
// routes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

router.use((req, res, next) => {   // add middleware function, executed for every incoming request
  console.log('in the middleware');
  next();   // allows reuqest to continue to next middleware 
});    

router.use('/add-product', (req, res, next) => { 
  console.log('in second middleware');
  res.send('<h1>hello world</h1>');   // automatically sends content type header
}); 

router.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
}); 

router.use('/', (req, res, next) => { 
  console.log('in third middleware');
  // res.send('<h1>hello world</h1>');   // automatically sends content type header
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));   // need pass absolute path
  
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});    

module.exports = Router;


// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

// parsing incoming requests
app.use(bodyParser.urlencoded());

app.use('/admin', routes);      // can filter paths by adding first arg
app.use('/shop', shopRoutes);   // order matters!
app.use((req, rs, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);   // combines createServer and listens
```
