## Mongo DB:
```
npm install --save mongodb
```

```javascript
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://<username><password>@url here')
  .then(result => {
    console.log('connected');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw(err);
  });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'no database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


// app.js
const mongoConnect = require('util/database').mongoConnect;

mongoConnect(() => {
  console.log(client);
  app.listen(3000);
});


// product.js
const getDb = require('/util/database').getDb;

class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  
  save() {
    const db = getDb();
    db.collection('products').insertOne(this)   // will create new one if doesn't exist
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err))
  }
}
```
