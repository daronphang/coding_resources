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
from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

app = Flask(__name__)

```
