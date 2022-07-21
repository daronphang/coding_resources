## Starting Celery and Configurations

Need two terminals, one to start Flask and other to start Celery worker. If running Redis locally, can use Docker. To trigger celery worker, need to activate virtualenv first and ensure directory in which celery cli is called is one level higher.

```console
$ docker run -d -p 6379:6379 celery
$ celery -A myassistant.app.celery worker -l INFO
$ celery -A myassistant.celery_worker.celery worker -l INFO --concurrency 1 -P solo

// latest, need to explicitly point to the celery object 
// Celery 4x does not support Windows, need configure concurrency pool
$ celery -A enter_app_name.celery_worker.celery worker --loglevel=info -P solo
```

```py
# separate module to create app in base directory where config file resides
# celery_worker.py

import os
from myassistant.app import celery, create_app

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
app.app_context().push()
```

### Running on Wndows

Strategy to make Celery 4x run on Windows is to configure concurrency pool. the concurrency pool implementation determines how Celery worker executes tasks in parallel. Celery defaults to the prefork implementation which spawns processes.

https://www.distributedpython.com/2018/08/21/celery-4-windows/

```
prefork
eventlet
gevent
solo
```

## Integration with Flask

When creating Flask using application factories, should create extensions and app factories so that the extension object does not initially get bound to the application:

1. Write a function taking both extension and app instances to perform some desired initialization.
2. Instantiate the extension in a separate file.
3. Make an instance of celery app and import it in the factory module to call the initializing function implemented at first step.

https://medium.com/@frassetto.stefano/flask-celery-howto-d106958a15fe

```py
from celery import Celery

cors = CORS()
ma = Marshmallow()
db = SQLAlchemy()
celery = Celery(
    __name__,
    backend=CeleryConfig.backend_result,
    broker=CeleryConfig.broker_url
)


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    cors.init_app(app, resources={r"/*": {"origins": "*"}})
    ma.init_app(app)
    db.init_app(app)
    update_celery(celery, app)

    from myassistant.app.api.v1 import api_v1 as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/MO/api/v1')
    return app

# Able to freely import celery instance into other modules
def init_celery(celery, app):
    celery.conf.update(app.config)  # add additional config to Celery
    class ContextTask(TaskBase):
        def __call__(self, *args, **kwargs):
            with app.app.context():
                return self.run(*args, **kwargs)
    celery.Task = ContextTask


# importing from other modules
from app import celery
@celery.task(bind=True)
def some_task(self):
    return 'hello world!'
```
