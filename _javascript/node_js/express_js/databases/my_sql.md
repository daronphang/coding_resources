### Setup

Install MySQL Workbench and MySQL Community Server.

### My SQL

```javascript
// util/database.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "123",
});

module.exports = pool.promise();

// app.js
const db = require("./util/database");

db.execute("some SQL code")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

db.execute(
  "INSERT INTO products (title, price, url, description) VALUES (?, ?, ?, ?)",
  [this.title, this.price, this.url, this.description]
);

db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
```
