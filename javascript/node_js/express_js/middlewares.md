## Body Parser:
Parse incoming request bodies before handlers. All middlewares will populate the req.body property with parsed body when Content-Type request header matches the type option.

```javascript
// API
const bodyParser = require('body-parser');

```
