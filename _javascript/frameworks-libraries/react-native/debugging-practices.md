### Type Checking with Flow

Flow is a JS library for static type checking.

```console
$ npm install -g flow-bin
$ flow check
```

```json
{
  "ignore": ".*/node_modules/.*"
}
```

### Unittesting with Jest

Not need for production build but for development.

```console
$ npm install jest-cli --save-dev
```

```json
{
  "scripts": {
    "test": "jest"
  }
}
```
