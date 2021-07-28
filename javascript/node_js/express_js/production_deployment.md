## Securing HTTP Response Headers:
Use Helmet. 

## Compressing Assets:
Use Compression.

## Request Logging:
Use Morgan.

```javascript
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
```

## Setting SSL Server:
Use SSL/TLS encryption. Decryption works with public and private keys. SSL certificate (created by certified authority) binds public key to identity and sends to client, 
