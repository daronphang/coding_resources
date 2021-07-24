## Basics:
```javascript
// util/database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: '123'
});

module.exports = pool.promise();


// app.js
const db = require('./util/database');

db.execute('some SQL code')
.then(result => {
  console.log(result);
})
.catch(err => {
  console.log(err);
});
```
