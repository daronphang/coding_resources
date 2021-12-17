### Celery Logging
Underlying Python logging system does not support all different concurrency configurations in Celery including eventlets, greenlets, prefork (subprocessing), and threads. Hence, Celery provides a special get_task_logger() that expoeses task_id and task_name parameters. Celery recommends as best practice to create common logger for all tasks.

To customize celery.task log format, can use after_setup_task_logger signal that gets triggered as soon as Celery worker has setup the celery.task logger. However, in order to access to task_id and task_name, need to use celery.app.log.TaskFormatter instead of logging.Formatter. TaskFormatter is an extension of logging.Formatter.

https://www.distributedpython.com/2018/11/06/celery-task-logger-format/
https://www.distributedpython.com/2018/08/28/celery-logging/

```python
import os
from celery import Celery
from celery.utils.log import get_task_logger
from celery.app.log import TaskFormatter
from worker import app

logger = get_task_logger(__name__)

@after_setup_task_logger.connect
def setup_task_logger(logger, *args, **kwargs):
    formatter = TaskFormatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    for handler in logger.handlers:
        handler.setFormatter(formatter)

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

### Augmenting Celery Logger
Celery provides after_setup_logger signal that is triggered after Celery has setup the logger. Takes in logger object which can be conveniently add custom loggers to.

```py
import os
import logging
from celery import Celery
from celery.signals import after_setup_logger

logger = logging.getLogger(__name__)

@after_setup_logger.connect
def setup_logger(logger, *args, **kwargs):
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    # File handler
    fh = logging.FileHandler('celery_logs.log')
    fh.setFormatter(formatter)
    logger.addHandler(fh)

@app.task
def add(x,y):
    result = x + y
    logger.info('some logs')
    return result
```

### Getting Task_id With Standard Logger
For lower-level code, should not pollute it with Celery-specific logger implementation. If a function is called from within a Celery task, can log it with Celery task_id through TaskFormatter; if it is called from within Flask, no task_id is returned. TaskFormatter retrieves task_name and task_id by calling celery.\_state.get\_current\_task. If it is executed outside Celery task, it returns None and prints ???.

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
