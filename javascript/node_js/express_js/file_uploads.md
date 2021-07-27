## Basics:
Multipart form submission request informs browser that data will contain mixture of text and binary. Can use third-party library such as multer. 

```html
<form enctype="multipart/form-data">
  <input name="image">
</form>
```

```javascript
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

app.use(multer({storage: fileStorage}).single('image'));
```
