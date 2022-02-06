### Basics

Object-Document Mapping Library for node.js which provides a schema-based solution to model data. Core concepts include Schemas (blueprint), Models, Instances and Queries. When working with NoSQL database, you are not constrained to rigid data model; however, being too flexible can be a challenge. ODM like Mongoose force us into a semi-rigi schema. Main advantages are that it provides abstraction over pure MongoDB but may have unintended conseqeuences in the future, and provides validation of data.

### Disadvantages

- Models have to align with the defined schema; changing the schema will slow down projects in rapid development.
- Schema and model only exists within Node.js application as MongoDB database is not aware of the relationship (no validation).
- Though using ODM can make development feel familiar, forcing into rigid design can be anti-pattern when using NoSQL.

### Connections

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongoDB url', options).then(
  app.listen(3000);
).catch();
```

### Schemas/Models

Each schema maps to MongoDB collection and defines the shape of documents within that collection. Automatically adds an \_id property to schemas. Models are constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from underlying MongoDB database.

```javascript
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
```

### Saving

Can use save() provided by Mongoose.

```javascript
product = new Product("hello", 12.5);
product.save().then().catch();
```

### Querying

Mongoose queries are not promises; don't mix callbacks and promises with queries as may end up with duplicate operations. For specifying document fields to include/exclude, use select() or populate().

```javascript
Product.find().select("title price -_id"); // _id is excluded
```

### Streaming

To stream data (applicable for large data), call cursor() to return an instance of QueryCursor. Cursors are subject to cursor timeouts with default of 10mins. Iterating through Mongoose query using async iterators also creates a cursor.

```javascript
Product.find().cursor().next();

for await (const doc of Product.find()) {
  console.log(doc); // prints one doc at a time
}
```
