### Basics

An object-relational mapping library (for flask is SQLAlchemy). Allows to define models to interact with the database. Also allows relations/associations to be setup easily.

```
INSERT INTO users VALUES ('Max', 28)                  Not needed
const user = User.create({name: 'Max', age: 28})      Create js object

npm install --save sequelize
```

### Instantiation

{force: true} in sync() overwrites table.

```javascript
// database.js
const Sequelize = require('sequelize');

// setup connection to db
const sequelize = new Sequelize(database='db', username='user', password='123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;


// product.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// defining new model
const Product = sequelize.define(modelName='product', attributes={
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

module.exports = Product;


// app.js
const sequelize = require('../util/database');

// sync models to database, looks through all sequelize.define (Models you defined)
sequelize.sync().then(result => {
  app.listen(3000);
}),catch(err => {
  console.log(err);
})
```

### Adding

```javascript
Product.create({
  // alternative to build() which has to save manually
  title: "hello",
  price: 4.5,
})
  .then((result) => {
    console.log("created product");
  })
  .catch((err) => console.log(err));
```

### Retrieving

Can use findAll() which returns an array or findByPk().

```javascript
Product.findAll({
  where: { id: 123 },
})
  .then((products) => {
    res.render("shop/index", {
      prods: products,
    });
  })
  .catch((err) => {
    console.log(err);
  });
```

### Updating

```javascript
Product.findByPk(pk)
  .then((product) => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    return product.save(); // save updated product to database
  })
  .then((result) => console.log("updated product")) // handles result from product.save()
  .catch((err) => console.log(err)); // catches errors from both promises
```

### Deleting

Can findByPk() followed by destroy().

```javascript
Product.findByPk(pk).then(product => {
  return product.destroy();
}).then(result => console.log('deleted product').catch(err => console.log(err));
```

### Relations

Sequelize will automatically create FK. For belongs to/has many relationship, can use createProduct(). Don't have to define the PK explicitly.

```
User        Has Many products, has One cart, has Many orders
Product     Belongs to Many carts, belongs to Many orders
Cart        Belongs to Many products  (Many-to-Many)
Order
```

```javascript
req.user.createProduct({
  title: "hello",
  price: 12.5,
});
```

```javascript
// models/user.js
const User = sequelize.define(modelName='user', attributes={
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
  }
});

module.exports = User;


// app.js
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);    // optional as first is defined

Cart.belongsToMany(Product, {through: CartItem});   // CartItem is the intermediate table that stores Cart and Product IDs
Product.belongsToMany(Cart, {through: CartItem});

sequelize.sync({).then(result => {
  app.listen(3000);
}),catch(err => {
  console.log(err);
})
```
