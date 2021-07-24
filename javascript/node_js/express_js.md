## Basics:
All about Middleware whereby an incoming reuqest is automatically funneled through a series of functions by expressjs. Offers pluggable nature. 

```
npm install --save express (not --save dev as this is production dependency)
```

## Example:

```javascript
const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {   // add middleware function, executed for every incoming request
  console.log('in the middleware');
  next();   // allows reuqest to continue to next middleware 
});    

app.use('/add-product', (req, res, next) => { 
  console.log('in second middleware');
  res.send('<h1>hello world</h1>');   // automatically sends content type header
}); 

app.use('/', (req, res, next) => { 
  console.log('in third middleware');
  res.send('<h1>hello world</h1>');   // automatically sends content type header
});    

app.listen(3000);   // combines createServer and listens
```
