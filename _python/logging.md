### Setup

Both logger and handlers have levels, need to set them to INFO. To configure logging across different modules, need to remove '__name__' in logger object as this will configure logger at module and not root.

```py
if __name__ == '__main__':
    import logging
    from logging.handlers import RotatingFileHandler

    # both logger and handlers have levels
    logger = logging.getLogger()    # omit __name__ for configuring root logger
    logger.setLevel(logging.INFO)

    logging.getLogger().handlers.clear()
    fh = logging.FileHandler(os.path.join('PRODUCTION.log'))
    fh.setLevel(logging.INFO)
    formatter = logging.Formatter(
        '[%(asctime)s]' '%(levelname)s in %(module)s: %(message)s'
    )
    fh.setFormatter(formatter)
    logger.addHandler(fh)
    
    logger.info('starting SPC comparison script...')
    logger.info('script completed')
```

### Logging Procedure (Commonly-used Classes)

```
Logger        Provides primary interface that logs events from app
Handler       Sends log messages to configured destinations
Formatter     Converts LogRecord to readable string (default is %(message)s
Filter        Used to filter log records based on some parameters other than log-level
```

### Configuration

Logging can be configured in three ways:
1. Creating loggers, handlers and formatters explicitly in Python that calls the config methods.
2. Creating a logging config file and reading it using fileConfig().
3. Creating a dictionary of configuration information and passing it to dictConfig().

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

```conf
[loggers]
keys=root,simpleExample

[handlers]
keys=consoleHandler

[formatters]
keys=simpleFormatter

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_simpleExample]
level=DEBUG
handlers=consoleHandler
qualname=simpleExample
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)

[formatter_simpleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
```

```py
import logging
from logging.config import dictConfig

LOGGING_CONFIG = {
    'version': 1,
    'loggers': {
        '': {  # root logger
            'level': 'NOTSET',
            'handlers': ['debug_console_handler', 'info_rotating_file_handler', 'error_file_handler', 'critical_mail_handler'],
        },
        'my.package': { 
            'level': 'WARNING',
            'propagate': False,
            'handlers': ['info_rotating_file_handler', 'error_file_handler' ],
        },
    },
    'handlers': {
        'debug_console_handler': {
            'level': 'DEBUG',
            'formatter': 'info',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stdout',
        },
        'info_rotating_file_handler': {
            'level': 'INFO',
            'formatter': 'info',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'info.log',
            'mode': 'a',
            'maxBytes': 1048576,
            'backupCount': 10
        },
        'error_file_handler': {
            'level': 'WARNING',
            'formatter': 'error',
            'class': 'logging.FileHandler',
            'filename': 'error.log',
            'mode': 'a',
        },
        'critical_mail_handler': {
            'level': 'CRITICAL',
            'formatter': 'error',
            'class': 'logging.handlers.SMTPHandler',
            'mailhost' : 'localhost',
            'fromaddr': 'monitoring@domain.com',
            'toaddrs': ['dev@domain.com', 'qa@domain.com'],
            'subject': 'Critical error with application name'
        }
    },
    'formatters': {
        'info': {
            'format': '%(asctime)s-%(levelname)s-%(name)s::%(module)s|%(lineno)s:: %(message)s'
        },
        'error': {
            'format': '%(asctime)s-%(levelname)s-%(name)s-%(process)d::%(module)s|%(lineno)s:: %(message)s'
        },
    },

}

dictConfig(LOGGING_CONFIG)
```

### LogRecord

Entry-level to logging system. Events recorded by Logger are called log records. Each record has a severity level. By default, only logs messages with severity of WARNING or above. For output format, there are basic elements included in LogRecord that can be easily added such as process ID.

Logs are stored in files with .log extension. If want to display logs in console, remove the filename attribute in configuration.

To edit formatter, can create custom class that takes record as argument.

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

```py
import logging

class RequestFormatter(logging.Formatter):
    def format(self, record):
        record.context = g.context
        record.username = g.username if hasattr(g, 'username') else request.remote_addr  # noqa
        return super().format(record)

app.logger.removeHandler(default_handler)
app.logger.setLevel(logging.INFO)
formatter = RequestFormatter(
    '[%(asctime)s] %(username)s payload %(context)s '
    '%(levelname)s in %(module)s: %(message)s'
)
logfile_handler = logging.FileHandler(
    os.path.join(cls.BASEDIR, f'{cls.PROJECT_NAME}-TEST.log')
)
logfile_handler.setFormatter(formatter)
logfile_handler.setLevel(logging.INFO)
app.logger.addHandler(logfile_handler)
```

### Logging Handlers

```
StreamHandler   Logging to screen
FileHandler     Logging to file
NullHandler
SockerHandler
SysLogHandler   Logging to log management service such as Papertrail
SMTPHandler
MemomryHandler
HTTPHandler
QueueHandler
```

```py
import logging

logger = logging.getLogger()
formatter = logging.Formatter('[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s [%(lineno)d]')

# StreamHandler
sh = logging.StreamHandler()
sh.setFormatter(formatter)
logger.addHandler(sh)

# FileHandler
fh = logging.FileHandler('logs.log')
fh.setFormatter(formatter)
logger.addHandler(fh)

# SysLogHandler
slh = logging.handlers.SysLogHandler(address=('logsN.papertrailapp.com', '...'))
slh.setFormatter(formatter)
logger.addHandler(slh)
```

### Capturing Stack Traces

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

### Example

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
