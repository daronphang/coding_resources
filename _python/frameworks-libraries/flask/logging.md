### Logging

If creating a new handler for logging in Flask, need to import app or current_app instance in order for logs to be registered in Flask context. Using logging directly does not work. Take note of circular imports i.e. no logging in endpoint directory as blueprint is imported.

```py
from flask import Flask
import logging

app = Flask(__name__)

logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

@app.route('/blogs')
def blog():
    app.logger.info('Info level log')   # or current_app.logger.info()
    app.logger.warning('Warning level log')
    return f"Welcome to the Blog"

app.run(host='localhost', debug=True)


# alternative
from flask import g, request
from logging.config import dictConfig
from pythonjsonlogger import jsonlogger


class CustomJSONFormatter(jsonlogger.JsonFormatter):
    def add_fields(self, log_record, record, message_dict):
        super(CustomJSONFormatter, self).add_fields(log_record, record, message_dict)
        log_record['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_record['payload'] = g.context
        log_record['username'] = g.username if hasattr(g, 'username') else request.remote_addr  # noqa
        log_record['correlation_id'] = request.headers.get('X-Correlation-ID')
        log_record['method'] = request.method
        log_record['path'] = request.path


class RequestFormatter(logging.Formatter):
    def format(self, record):
        record.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        record.context = g.context
        record.username = g.username if hasattr(g, 'username') else request.remote_addr  # noqa
        return super().format(record)


def setup_logger(environ, custom_formatter, path):
    if environ == 'TESTING':
        handlers = ['wsgi', 'default_fh']
    elif environ == 'PRODUCTION':
        handlers = ['rotating_fh_info', 'rotating_fh_err']
    else:
        handlers = ['default_fh']
    
    logging_config = {
        'version': 1,
        "disable_existing_loggers": True,
        'formatters': {
            'default': {
                'format': '%(asctime)s | %(levelname)s | %(module)s| %(message)s'
            },
            'json': {
                '()': CustomJSONFormatter,  # or '()' as key, 'myassistant.config.CustomJSONFormatter'
                'format': '%(timestamp)s %(username)s %(levelname)s %(module)s %(correlation_id)s %(path)s %(method)s %(message)s %(payload)s'
            },
            'request': {
                '()': RequestFormatter,
                'format': '%(timestamp)s | %(username)s | %(latency)ss | %(method)s | %(url)s | %(status_code)s | %(levelname)s in %(module)s | %(message)s | %(context)s'
            },
        },
        'root': {
            'level': 'INFO',
            'propagate': False,
            'handlers': handlers
        },
        'handlers': {
            'wsgi': {
                'class': 'logging.StreamHandler',
                'formatter': 'default',
                'stream': 'ext://flask.logging.wsgi_errors_stream',
            },
            'rotating_fh_info': {
                'level': 'INFO',
                'formatter': 'json',
                'class': 'logging.handlers.RotatingFileHandler',
                'filename': f'{path}-PROD-INFO.log',
                'mode': 'a',
                'maxBytes': 1024000,
                'backupCount': 10,
                'encoding': 'utf-8'
            },
            'rotating_fh_err': {
                'level': 'ERROR',
                'formatter': 'json',
                'class': 'logging.handlers.RotatingFileHandler',
                'filename': f'{path}-PROD-ERROR.log',
                'mode': 'a',
                'maxBytes': 1024000,
                'backupCount': 10,
                'encoding': 'utf-8'
            },
            'default_fh': {
                'level': 'INFO',
                'formatter': 'json',
                'class': 'logging.FileHandler',
                'filename': f'{path}-TESTING.log'
            },
        },
    }
    dictConfig(logging_config)

app = Flask(__name__)

```
