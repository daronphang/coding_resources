### Connection Pooling

Cache of database connections maintained so that the connections can be reused when future requests to database are required (method used to keep connections open). Opening database connection is an expensive operation as you have to open up network sessions, authenticate, have authorization checked, etc. Used to enhance the performance of executing commands on a database. Standard feature of many database driver libraries.

https://medium.com/@kyle_martin/mongodb-in-production-how-connection-pool-size-can-bottleneck-application-scale-439c6e5a8424

### MongoDB

Manages connection pooling whereby it will ensure it provides sufficient connections for multiple simultaneous interactions with database.

Collection methods: http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find  
Cursor methods: http://mongodb.github.io/node-mongodb-native/3.6/api/Cursor.html

```
npm install --save mongodb
```

```js
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb+srv://<username><password>@url here")
    .then((result) => {
      console.log("connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// app.js
const mongoConnect = require("util/database").mongoConnect;

mongoConnect(() => {
  console.log(client);
  app.listen(3000);
});

// product.js
const getDb = require("/util/database").getDb;

class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        // will create new one if doesn't exist
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
}
```

### Adding

```javascript
const product = new Product("hello", 12.5);
product.save().then().catch();
```

### Fetching

Method find() returns a cursor; can use toArray() to return all elements or pagination of working with big data. To fetch single item, pass an object into find() and use next(). MongoDB uses special ObjectId type.

```javascript
static findById(prodId) {
  const db = getDb();
  return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next().then().catch();
}

static fetchAll() {
  const db = getDb();
  return db.collection('products').find().toArray().then(products => {
    return products;
  }).catch();
}
```

### Deleting

```javascript
static deleteById(prodId) {
  const db = getDb();
  db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId}}).then().catch();
}
```

### Pagination

Use skip() and limit().
