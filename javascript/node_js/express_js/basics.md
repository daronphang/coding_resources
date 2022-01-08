### Node Express

Backend web application framework for node.js. Designed for building web applications and APIs. Relies heavily on middleware functions whereby an incoming request is automatically funneled through them. Highly extensible and other packages can be plugged into it. For incoming requests, need to parse them first with third-party packages before you can use req.body. For limiting middleware execution, app.use() for POST/GET/PUT/DELETE, app.post() for POST, app.get() for GET requests.

```
$npm install --save express (not --save dev as this is production dependency)
$npm install --save-dev nodemon

$npm init

// Need add "start": "nodemon app,js" under scripts in package.json
```

### Example

```js
// app.js
const express = require("express");

const shoppingRoutes = require("./routes/shopping");

const app = express();

app.use(express.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT,PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(shoppingRoutes);

app.listen(8080);
```

```javascript
// routes/shopping.js
const express = require("express");
const shoppingController = require("../controllers/shopping");

const router = express.Router();

router.get("/shopping-items", shoppingController.getShoppingItems);

module.exports = router;
```

```javascript
// controller/shopping.js
exports.getShoppingItems = (req, res, next) => {
  res.status(200).json({ title: "hello world!!!" });
};
```

### Helpers

```javascript
// util/path.js
const path = require("path");

// dont have to add '..' when specifying absolute paths
module.exports = path.dirname(process.mainModule.filename);
```

### External CSS Static Files

```html
<link rel="stylesheet" href="/css/main.css" />
```

```css
/*public/css/main.css*/

/* put css code here */
```

```js
// app.js

app.use(express.static(path.join(__dirname, "public")));
```

### Example

```javascript
// routes.js
const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

router.use((req, res, next) => {
  // add middleware function, executed for every incoming request
  console.log("in the middleware");
  next(); // allows reuqest to continue to next middleware
});

router.use("/add-product", (req, res, next) => {
  console.log("in second middleware");
  res.send("<h1>hello world</h1>"); // automatically sends content type header
});

router.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

router.use("/", (req, res, next) => {
  console.log("in third middleware");
  // res.send('<h1>hello world</h1>');   // automatically sends content type header
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));   // need pass absolute path

  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = Router;

// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();

// parsing incoming requests
app.use(bodyParser.urlencoded());

app.use("/admin", routes); // can filter paths by adding first arg
app.use("/shop", shopRoutes); // order matters!
app.use((req, rs, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000); // combines createServer and listens
```

### Sending Emails

Using third-party mail server service such as AWS and SendMail.

```
npm install --save nodemailer nodemailer-sendgrid-transport
```

```javascript
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user: "user",
      api_key: "123",
    },
  })
);

// sending email
transporter
  .sendMail({
    to: "hello@gmail.com",
    from: "world@gmail.com",
    subject: "signup success",
    html: "<h1>Success</h1>",
  })
  .then()
  .catch();
```

## Error Handling:

For error-handling middlewares, pass error argument and calling next(error). To avoid inifite loop in then-catch block, call next(new Error(err)) in catch block.

```javascript
// auth.js
const error = new Error(err);
return next(error);

// app.js
app.use((req, res, next) => {
  User.findById(id).then(user => {
    throw new Error('dummy');
  }).catch(err => {
    next(new Error(err));
  })
  }
});

app.use({error, req, res, next} => {
  res.render('500');    // res.redirect('/500')
});
```
