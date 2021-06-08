## Logging:
Involves recording information about application's runtime behavior to a more persistent medium.
```python
from flask import Flask
from logging.config import fileConfig

app = Flask(__name_)

# logging.basicConfig(level=logging.DEBUG)  # default setting logs messages at warning level or higher

fileConfig('logging.cfg')

@app.route('/')
def hello_world():
    app.logger.info('Processing default request')
    return 'Hello World!'

if __name__ == '__main__':
    app.run()

```
```
# Python logging levels
DEBUG       Detialed information used for diagnosing problems
INFO        Confirmation things are working as expected
WARNING     Something unexpected happened or indicative of some problem in future
ERROR       App not able to perform some function
CRTIICAL    Serious error
```
## Example:
```python
import json
import requests
import logging
import os
from logging.config import dictConfig

# debug settings
debug = eval(os.environ.get("DEBUG", "False"))

from flask import Flask, make_response, request

# for sending error logs to slack
class HTTPSlackHandler(logging.Handler):
    def emit(self, record):
        log_entry = self.format(record)
        json_text = json.dumps({"text": log_entry})
        url = 'https://hooks.slack.com/services/<org_id>/<api_key>'
        return requests.post(url, json_text, headers={"Content-type": "application/json"}).content


dictConfig({
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "default": {
            "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
        },
        "access": {
            "format": "%(message)s",
        }
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "default",
            "stream": "ext://sys.stdout",
        },
        "email": {
            "class": "logging.handlers.SMTPHandler",
            "formatter": "default",
            "level": "ERROR",
            "mailhost": ("smtp.example.com", 587),
            "fromaddr": "devops@example.com",
            "toaddrs": ["receiver@example.com", "receiver2@example.com"],
            "subject": "Error Logs",
            "credentials": ("username", "password"),
        },
        "slack": {
            "class": "app.HTTPSlackHandler",
            "formatter": "default",
            "level": "ERROR",
        },
        "error_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "default",
            "filename": "/var/log/gunicorn.error.log",
            "maxBytes": 10000,
            "backupCount": 10,
            "delay": "True",
        },
        "access_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "access",
            "filename": "/var/log/gunicorn.access.log",
            "maxBytes": 10000,
            "backupCount": 10,
            "delay": "True",
        }
    },
    "loggers": {
        "gunicorn.error": {
            "handlers": ["console"] if debug else ["console", "slack", "error_file"],
            "level": "INFO",
            "propagate": False,
        },
        "gunicorn.access": {
            "handlers": ["console"] if debug else ["console", "access_file"],
            "level": "INFO",
            "propagate": False,
        }
    },
    "root": {
        "level": "DEBUG" if debug else "INFO",
        "handlers": ["console"] if debug else ["console", "slack"],
    }
})


app = Flask(__name__)


@app.route("/status", methods=["GET"])
def health_check():
    logging.debug("debug log")
    logging.info("info log")
    logging.warning("warning log")
    logging.error("error log")
    # logging.exception("exception log")
    
    return make_response("OK", 200)


if __name__ == "__main__":
    app.run(debug=debug, host="0.0.0.0", port="5000")
```
