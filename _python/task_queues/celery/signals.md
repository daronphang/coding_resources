### Signals

Event trigger signals that can be connected to perform actions as they trigger.

```
before_task_publish
after_task_publish
task_prerun
task_postrun
task_retry
task_success
task_failure
task_internal_error
task_received
task_revoked
task_unknown
task_rejected
```

```py
from celery.signals import after_task_publish

@after_task_publish.connect
def task_sent_handler(sender=None, headers=None, body=None, **kwargs):
    # information about task are located in headers for task messages
    # using the task protocol version 2.
    info = headers if 'task' in headers else body
    print('after_task_publish for task id {info[id]}'.format(
        info=info,
    ))
```
