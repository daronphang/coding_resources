### RESTFUL

```javascript
// routes.js
const express = require("express");
const controller = require("../controller");

const router = express.Router();
router.get("/posts", controller.getPosts);

module.exports = router;

// app.js
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/home", routes);
app.listen(3000);

// controller.js
exports.getPosts = (req, res, next) => {
  res.status(200).json({ title: "hello world" }); // sends JSON response
};
```

### JWT

```javascript
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const token = jwt.sign(
    {
      username: "user",
    },
    "secret key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ token: token, userID: userID });
};

// verifying JWT
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("no header");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1]; // Bearer 12345
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "secret key");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
```
