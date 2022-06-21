### Dynamic Routes

```js
// routes
router.get("/products/:productId", shopController.getProduct);

// controller
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
};
```
