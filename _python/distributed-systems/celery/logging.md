### Celery Logging

Underlying Python logging system does not support all different concurrency configurations in Celery including eventlets, greenlets, prefork (subprocessing), and threads. Hence, Celery provides a special get_task_logger() that expoeses task_id and task_name parameters. Celery recommends as best practice to create common logger for all tasks.

Celery provides after_setup_logger for customizing global logger (Worker, Main Process). Takes in logger object which can be conveniently add custom loggers to.

To customize celery.task log format, can use after_setup_task_logger signal that gets triggered as soon as Celery worker has setup the celery.task logger. However, in order to access to task_id and task_name, need to use celery.app.log.TaskFormatter instead of logging.Formatter. TaskFormatter is an extension of logging.Formatter.

https://www.distributedpython.com/2018/11/06/celery-task-logger-format/  
https://www.distributedpython.com/2018/08/28/celery-logging/  
https://docs.celeryproject.org/en/latest/userguide/signals.html#setup-logging

```python
import os
from celery import Celery
from celery.utils.log import get_task_logger
from celery.app.log import TaskFormatter
from celery.signals import after_setup_logger, after_setup_task_logger
from worker import app

basedir = os.path.abspath(os.path.dirname(__file__))

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
app.app_context().push()

def setup_file_handler_logger(logger, formatter):
    logfile_handler = logging.FileHandler(
            os.path.join(basedir, f'MyAssistant-Orchestrator-CELERY_TEST.log')
        )
    logfile_handler.setFormatter(formatter)
    logfile_handler.setLevel(logging.INFO)
    logger.addHandler(logfile_handler)

# For celery global logger
@after_setup_logger.connect
def setup_global_logger(logger, *args, **kwargs):
    formatter = logging.Formatter(
        '[%(asctime)s: global %(levelname)s in %(module)s] %(message)s'
    )
    setup_file_handler_logger(logger, formatter)


# For customizing celery task_logger
@after_setup_task_logger.connect
def setup_task_logger(logger, *args, **kwargs):
    formatter = TaskFormatter(
        '[%(asctime)s: %(task_name)s %(levelname)s in %(module)s][%(task_id)s] %(message)s'
    )
    setup_file_handler_logger(logger, formatter)

@app.task()
def add(x, y):
    result = x + y
    logger.info(f'Add: {x} + {y} = {result}')
    return result
```

To disable Celery logging configuration, use setup_logging signal.

```py
import celery

@celery.signals.setup_logging.connect
def on_setup_logging(**kwargs):
    pass
```

### Getting Task_id With Standard Logger

For lower-level code, should not pollute it with Celery-specific logger implementation. If a function is called from within a Celery task, can log it with Celery task_id through TaskFormatter; if it is called from within Flask, no task_id is returned. TaskFormatter retrieves task_name and task_id by calling celery.\_state.get_current_task. If it is executed outside Celery task, it returns None and prints ???.

```py
import logging
from celery.app.log import TaskFormatter

logger = logging.getLogger()
sh = logging.StreamHandler()
taskFormatter = TaskFormatter('%(asctime)s - %(task_id)s - %(task_name)s - %(name)s - %(levelname)s - %(message)s')
sh.setFormatter(taskFormatter)
logger.setLevel(logging.INFO)
logger.addHandler(sh)
```
