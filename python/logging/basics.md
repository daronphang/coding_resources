## Logging Procedure (Commonly-used Classes):
1. Logger: Provides primary interface that logs events from app.
2. Handler: Sends log messages to configured destinations.
3. Formatter: Used to specify layout of log record.
4. Filter: Used to filter log records based on some parameters other than log-level.

## Configuration:
```
# Instance config
level         Root logger set to specified severity level
filename      Specifies the file; if none, will log to console
filemode      File opened in this mode (default is append)
format        Format of log message

# Logging
exc_info      Boolean, displays full stack traces for exception
```

```python
import logging

logging.basicConfig(level=logging.DEBUG, filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s' - %(process)d)
logging.debug('This will get logged')
logging.warning('This will get logged to a file')

# root - DEBUG - This will get logged to a file - 12345
# root - ERROR - This will get logged to a file - 12356
```

## LogRecord:
Entry-level to logging system. Events recorded by Logger are called log records. Each record has a severity level. By default, only logs messages with severity of WARNING or above. For output format, there are basic elements included in LogRecord that can be easily added such as process ID. 

Logs are stored in files with .log extension. If want to display logs in console, remove the filename attribute in configuration.

https://docs.python.org/3/library/logging.html

```
# LogRecord attributes
asctime         %(asctime)s  
created         %(created)f
exc_info
filename        %(filename)s
funcName        %(funcName)s
levelname       %(levelname)s
message         %(message)s
module          %(module)s
name            %(name)s
pathname        %(pathname)s
stack_info
threadName      %(threadName)s
```

```
DEBUG       10
INFO        20
WARNING     30
ERROR       40
CRITICAL    50
```

## Logging Handlers:
```
StreamHandler
FileHandler
NullHandler
SockerHandler
SysLogHandler
SMTPHandler
MemomryHandler
HTTPHandler
QueueHandler
```


## Capturing Stack Traces:
Need set exc_info to True. Best is to call logging.exception() which logs a message with level ERROR.
```py
import logging

a = 5
b = 0

try:
  c = a / b
except Exception as e:
  # logging.error("Exception occurred", exc_info=True)
  logging.exception('exception occurred')
```


## Example: 
```python
import logging

# Create a custom logger
logger = logging.getLogger(__name__)

# Create handlers
c_handler = logging.StreamHandler()   # takes info from LogRecord and print to console
f_handler = logging.FileHandler('file.log')
c_handler.setLevel(logging.WARNING)
f_handler.setLevel(logging.ERROR)

# Create formatters and add it to handlers
c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c_handler.setFormatter(c_format)
f_handler.setFormatter(f_format)

# Add handlers to the logger
logger.addHandler(c_handler)
logger.addHandler(f_handler)

logger.warning('This is a warning')
logger.error('This is an error')

# __main__ - WARNING - This is a warning
# __main__ - ERROR - This is an error

# f_handler writes to specified file 'file.log' at logger.error()
# 2018-08-03 16:12:21,723 - __main__ - ERROR - This is an error
```


