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
    return db.collection('products').insertOne(this).then(result => {     // will create new one if doesn't exist
      console.log(result);
    }).catch(err => console.log(err))
  }
}
```

## Adding:
```javascript
const product = new Product('hello', 12.50);
product.save().then().catch();
```

## Fetching:
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

## Updating:
Can use updateOne() or updateMany(). Use $set to describe the update operation. 
```javascript
db.collection('products').updateOne({_id: new mongodb.ObjectId(some_id)}, {$set: this});
```

## Deleting:
```javascript
static deleteById(prodId) {
  const db = getDb();
  db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId}}).then().catch();
}
```

