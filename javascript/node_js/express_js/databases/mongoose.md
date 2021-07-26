## Basics:
Object-Document Mapping Library for node.js which provides a schema-based solution to model data. Core concepts include Schemas (blueprint), Models, Instances and Queries.

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongoDB url').then(
  app.listen(3000);
).catch();

// product.js
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model(name='Product', schema=productSchema);
```

## Saving: 
Can use save() provided by Mongoose.
```javascript
product = new Product('hello', 12.50);
product.save().then().catch();  
```

## Querying:
For querying large data, should use cursor() and call next(); else, use find().
```javascript
Product.find().cursor().next()
```
