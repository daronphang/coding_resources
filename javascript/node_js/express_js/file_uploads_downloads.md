### Basics

Multipart form submission request informs browser that data will contain mixture of text and binary. Can use third-party library such as multer. To serve image, can serve statically.

```html
<form enctype="multipart/form-data">
  <input name="image" />
</form>
```

```javascript
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mime === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// serve images statically
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);
```

### Downloading Files

For downloading as attachments, change content disposition to attachment.

```javascript
exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  const invoiceName = "invoice-" + orderId + ".pdf";
  const invoicePath = path.join("data", "invoices", invoiceName);

  // streaming response to browser
  const file = fs.createReadStream(invoicePath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'inline; filename="' + invoiceName + '"'
  );
  file.pipe(res);

  // pre-loading entire file (not good practice for large files)
  fs.readFile(invoicePath, (err, data) => {
    if (err) {
      return next(err);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + invoiceName + '"'
    );
    res.send(data);
  });
};
```

### Deleting Files

```javascript
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};
```

### Generating PDF

Can use PDFKit.

```javascript
const PDFDocument = require("pdfkit");

res.setHeader("Content-Type", "application/pdf");
res.setHeader("Content-Disposition", 'inline; filename="' + invoiceName + '"');

const PDFDoc = new PDFDocument(); // readable stream and can use pipe()
pdfDoc.pipe(fs.createWriteStream(invoicePath));
pdfDoc.pipe(res); // pipe output into response

pdfDoc.fontSize(26).text("Invoice", { underline: true });
pdfDoc.text("hello world");
pdfDoc.end();
```
