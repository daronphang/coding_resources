## Basics:
An object-relational mapping library (for flask is SQLAlchemy). Offers models to work with database.
```
INSERT INTO users VALUES ('Max', 28)                  Not needed
const user = User.create({name: 'Max', age: 28})      Create js object

npm install --save sequelize
```

## Example:
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
