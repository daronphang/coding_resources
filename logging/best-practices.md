## Using JSON Logging

Logging in JSON transforms logs from raw text lines to a database of structured fields that you can search, filter and analyze. Moreover, we can have a richer picture of information about errors. can be easily indexed and searchable by logging infrastructure including ELK, EFK, AWS Cloudwatch, GCP Stackdriver, etc.

For Python, consider using python-json-logger.

## Rolling Log Files

For long running services, may be a good idea to split up log files generated into either appropriate time-based files or based on file-size limit.

For Python, can make use of RotatingFileHandler or TimedRotatingFileHandler.

## Use of Appropriate Log Levels

WARNING/ERRORS and above logs to be captured by a different log handler to reduce the need to filter all INFO from normal log statements.

```py
import logging
import logging.handlers as handlers
import time

logger = logging.getLogger('my_app')
logger.setLevel(logging.INFO)

## Here we define our formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logHandler = handlers.TimedRotatingFileHandler('normal.log', when='M', interval=1, backupCount=0)
logHandler.setLevel(logging.INFO)
logHandler.setFormatter(formatter)

errorLogHandler = handlers.RotatingFileHandler('error.log', maxBytes=5000, backupCount=0)
errorLogHandler.setLevel(logging.ERROR)
errorLogHandler.setFormatter(formatter)

logger.addHandler(logHandler)
logger.addHandler(errorLogHandler)

def main():
    while True:
        time.sleep(1)
        logger.info("A Sample Log Statement")
        logger.error("An error log statement")

main()
```
