### Logging Libraries

Winston and Morgan (HTTP request logger middleware).

## Winston

### Logging Levels

```
0 Error
1 Warn
2 Info
3 Verbose
4 Debug
5 Silly
```

### Transport Settings

```
level                 Level of messages to log
filename              File used to write log data to
handleExceptions      Catch and log unhandled exceptions
json                  Records log data in JSON format
maxsize               maxsize of log file in bytes
maxFiles              Limit number of files created when size of logfile is exceeded
colorize              Colorize output
```

```js
var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});
```

```js
// Two ways of logging
logger.log({
  level: "info",
  message: "Hello distributed log files!",
});

logger.info("Hello again distributed logs");
```

Info parameter provided must have at least level and message properties.

```js
const info = {
  level: 'info',                 // Level of the logging message
  message: 'Hey! Log something?' // Descriptive message being logged.
  ...meta                        // Other properties are considered as "meta"
};

logger.log('error', 'hello', {message: 'world'}); // any message property in meta object will auto concatenate to any msg provided
```

## Morgan

https://blog.logrocket.com/node-js-logging-best-practices/

### Predefined Tokens

```js
morgan(":method :url :status :res[content-length] - :response-time ms");

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

// Creating new token that returns a string value and is available as ":type"
morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});
```

```js
const morgan = require("morgan");
const config = require("./config");
const logger = require("./logger");

morgan.token("message", (req, res) => res.locals.errorMessage || "");

const getIpFormat = () =>
  config.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
```
