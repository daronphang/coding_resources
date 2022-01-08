### MVC Approach

- Models: Represent data logic in code i.e. save, fetch.
- Views: What the user sees.
- Controllers: Connects models and views.

### Controllers

```javascript
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/add-product'
  }
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {   // this is the callback function
    res.render('shop', {
    prods: products,
    pageTitle, 'Shop'
  })
  });
}

```

### Routes

```javascript
const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);

router.post(".add-product", productsController.postAddProduct);

module.exports = router;
```

### Models

```javascript
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {        // readFile is asynchronous! Need to pass callback function as arg
    if (err) {
      return callback([]);   // passes empty array as arg in callback function
    };

    callback(JSON.parse(fileContent));
  }
});
}


module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
```
