## MVC:
- Models: Represent data logic in code i.e. save, fetch.
- Views: What the user sees.
- Controllers: Connects models and views.

## Controllers:
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

## Routes:
```javascript
const productsController = require('../controllers/products');

router.get('/add-product', productsController.getAddProduct);

router.post('.add-product', productsController.postAddProduct);

module.exports = router;
```

## Models:
```
const fs = require('fs');
const path = reuqire('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json);

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  
  save() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent); 
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
      
    });
  }
  
  static fetchAll(callback) {       
    fs.readFile(p, (err, fileContent) => {    // readFile is asynchronous! Need to pass callback function as arg
      if (err) {
        callback([]);   // passes empty array as arg in callback function
      callback(JSON.parse(fileContent));
      }
    }
  }
}
```
