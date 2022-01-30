### Exception Handling

In Celery, simply raise an exception and let Celery configuration deal with it i.e. let Celery handle exception. If an exception is handled inside task, Celery will still overwrite custom meta data and return status as SUCCESS. To prevent this, raise an additional celery.exceptions.Ignore().

```py
from celery import states
from celery.exceptions import Ignore


class CeleryFailure(Exception):
    pass


@celery.task(bind=True)
def task(self):
    try:
        raise CeleryFailure('hello world')
    except Exception as e:
        self.update_state(state=states.FAILURE, meta={'custom': 'hi'})
```

Can make use of Celery Handlers to trigger a callback function when an error occurs.

### Error Logging

```py
import logging
from celery import Task
from celery.worker.request import Request

logger = logging.getLogger('my.package')

class MyRequest(Request):
    'A minimal custom request to log failures and hard time limits.'

    def on_timeout(self, soft, timeout):
        super(MyRequest, self).on_timeout(soft, timeout)
        if not soft:
           logger.warning(
               'A hard timeout was enforced for task %s',
               self.task.name
           )

    def on_failure(self, exc_info, send_failed_event=True, return_ok=False):
        super().on_failure(
            exc_info,
            send_failed_event=send_failed_event,
            return_ok=return_ok
        )
        logger.warning(
            'Failure detected for task %s',
            self.task.name
        )

class MyTask(Task):
    Request = MyRequest  # you can use a FQN 'my.package:MyRequest'

@app.task(base=MyTask)
def some_longrunning_task():
    # use your imagination
```
