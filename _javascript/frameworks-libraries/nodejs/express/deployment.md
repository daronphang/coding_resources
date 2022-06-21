### Securing HTTP Response Headers

Use Helmet.

### Compressing Assets

Use Compression.

### Request Logging

Use Morgan.

```javascript
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
```

### Setting SSL Server

Use SSL/TLS encryption. Decryption works with public and private keys. Normally configured by hosting servers.

### How SSL/TLS Works

1. SSL certificate (created by certified authority) binds public key to identity and sends to client.
2. Client receives public key and uses it to encrypt data.
3. Server decrypts with private key.

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

```js
// creating SSL certificate manually (not recommended)
const https = require("https");

const privateKey = fs.readfileSync("server.key");
const certificate = fs.readFileSync("server.cert");

https.createServer({ key: privateKey, cert: certifcate }, app).listen(3000);
```
