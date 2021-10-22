## Logging:
Five standard levels indicating severity of events: DEBUG, INFO, WARNING, ERROR, CRITICAL. By default, only logs messages with severity of WARNING or above. For output format, there are basic elements included in LogRecord that can be easily added such as process ID.

Commonly used parameters for basic config:
```
level         Root logger set to specified severity level.
filename      Specifies the file.
filemode      File opened in this mode (default is append).
format        Format of log message.
``

Commonly used parameters for logging:
- exc_info: Boolean, displays full stack traces for exception.

```python
import logging

logging.basicConfig(level=logging.DEBUG, filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s' - %(process)d)
logging.debug('This will get logged')
logging.warning('This will get logged to a file')

# root - DEBUG - This will get logged to a file - 12345
# root - ERROR - This will get logged to a file - 12356
```

## Classes and Functions:
Commonly used classes defined in logging module:
- Logger: Objects used directly in application code to call functions.
- LogRecord: Loggers automatically create LogRecord objects that have all information related to event being logged.
- Handler: Handlers send LogRecord to required output destination, like console or file. Have subclasses like HTTPHandler.
- Formatter: Where format of output is specified in string format.

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
