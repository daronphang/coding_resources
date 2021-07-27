## RESTFUL:

```javascript
// routes.js
const express = require('express');
const controller = require('../controller');

const router = express.Router();
router.get('/posts', controller.getPosts);

module.exports = router;

// app.js
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());   // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/home', routes);
app.listen(3000);

// controller.js
exports.getPosts = (req, res, next) => {
  res.status(200).json({title: 'hello world'});   // sends JSON response
}
```